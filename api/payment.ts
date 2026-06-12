// api/payment.ts
export interface VercelRequest {
  method?: string;
  body: {
    order_id?: string;
    total_amount?: number;
    customer_details?: {
      first_name: string;
      email: string;
      phone: string;
    };
    items?: {
      id: string;
      price: number;
      quantity: number;
      name: string;
    }[];
  };
}

export interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: object) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { order_id, total_amount, customer_details, items } = req.body;

    if (!order_id || !total_amount) {
      return res.status(400).json({ message: 'Missing order_id or total_amount' });
    }

    const serverKey = process.env.VITE_MIDTRANS_SERVER_KEY || process.env.MIDTRANS_SERVER_KEY;
    
    if (!serverKey) {
      return res.status(500).json({ message: 'Midtrans Server Key is not configured' });
    }

    // Midtrans API expects base64 encoded server key with a colon appended
    const authString = Buffer.from(`${serverKey}:`).toString('base64');

    const payload = {
      transaction_details: {
        order_id: order_id,
        gross_amount: total_amount
      },
      customer_details: customer_details,
      item_details: items,
      // Optional: you can add custom fields or callback URLs here
    };

    const isProduction = process.env.NODE_ENV === 'production' && !serverKey.includes('SB-Mid');
    const apiUrl = isProduction 
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error('Midtrans Error:', errData);
      return res.status(response.status).json({ message: 'Midtrans API error', details: errData });
    }

    const data = await response.json();
    return res.status(200).json({ token: data.token, redirect_url: data.redirect_url });

  } catch (err) {
    const error = err as Error;
    console.error('Payment API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
