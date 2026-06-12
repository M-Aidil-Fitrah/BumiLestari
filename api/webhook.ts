// api/webhook.ts
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export interface VercelRequest {
  method?: string;
  body: {
    order_id: string;
    transaction_status: string;
    fraud_status: string;
    signature_key: string;
    status_code: string;
    gross_amount: string;
  };
}

export interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: object) => void;
  send: (body: string) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    const serverKey = process.env.VITE_MIDTRANS_SERVER_KEY || process.env.MIDTRANS_SERVER_KEY || '';

    if (!serverKey) {
      return res.status(500).json({ message: 'Server key missing' });
    }

    // Verify signature
    const hash = crypto.createHash('sha512').update(`${data.order_id}${data.status_code}${data.gross_amount}${serverKey}`).digest('hex');
    
    if (data.signature_key !== hash) {
      return res.status(403).json({ message: 'Invalid signature' });
    }

    const transactionStatus = data.transaction_status;
    const fraudStatus = data.fraud_status;
    
    let orderStatus: 'pending' | 'success' | 'failed' | 'expired' = 'pending';

    if (transactionStatus === 'capture') {
      if (fraudStatus === 'challenge') {
        orderStatus = 'pending';
      } else if (fraudStatus === 'accept') {
        orderStatus = 'success';
      }
    } else if (transactionStatus === 'settlement') {
      orderStatus = 'success';
    } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire') {
      orderStatus = 'failed';
    } else if (transactionStatus === 'pending') {
      orderStatus = 'pending';
    }

    // Update Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''; // Needs service role key to bypass RLS, fallback to anon
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase
      .from('orders')
      .update({ status: orderStatus, updated_at: new Date().toISOString() })
      .eq('id', data.order_id);

    if (error) {
      console.error('Webhook Supabase Error:', error);
      return res.status(500).json({ message: 'Database update failed' });
    }

    return res.status(200).json({ message: 'OK' });
  } catch (err) {
    const error = err as Error;
    console.error('Webhook Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
