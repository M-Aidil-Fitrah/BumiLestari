// src/lib/orders.ts
import { supabase } from './supabase';
import type { Order, OrderItem } from './supabase';

export interface CheckoutItem {
  product_id: string;
  quantity: number;
  price: number;
  name: string;
}

export const orderService = {
  async getMyOrders(): Promise<Order[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('You must be logged in to view orders');

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  async getAllOrders(): Promise<Order[]> {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    if (!orders || orders.length === 0) return [];

    // Fetch profiles manually to avoid foreign key join errors since orders.user_id points to auth.users
    const userIds = [...new Set(orders.map(o => o.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, phone')
      .in('id', userIds);

    const mergedOrders = orders.map(order => ({
      ...order,
      profiles: profiles?.find(p => p.id === order.user_id) || null
    }));

    return mergedOrders as Order[]; // Now safely cast as Order[]
  },

  async getOrderItems(orderId: string): Promise<(OrderItem & { products: { name: string, image: string } })[]> {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        *,
        products (
          name,
          image
        )
      `)
      .eq('order_id', orderId);

    if (error) throw new Error(error.message);
    return data;
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      // Log clearly so RLS or network issues are visible
      console.error('updateOrderStatus error:', error.message, '| orderId:', orderId);
      throw new Error(error.message);
    }
  },

  async createCheckoutAndGetSnapToken(items: CheckoutItem[], totalAmount: number): Promise<{ token: string; orderId: string }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('You must be logged in to checkout');

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, phone')
      .eq('id', user.id)
      .single();

    // 1. Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError || !order) throw new Error(orderError?.message || 'Failed to create order');

    // 2. Insert order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      // Rollback order if items fail
      await supabase.from('orders').delete().eq('id', order.id);
      throw new Error(itemsError.message);
    }

    // 3. Call Midtrans API (via Vercel Serverless Function)
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: order.id,
          total_amount: totalAmount,
          customer_details: {
            first_name: profile?.full_name || 'Customer',
            email: user.email,
            phone: profile?.phone || ''
          },
          items: items.map(item => ({
            id: item.product_id,
            price: item.price,
            quantity: item.quantity,
            name: item.name
          }))
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Payment API failed');
      }

      const { token } = await response.json();

      // 4. Update order with snap token
      await supabase
        .from('orders')
        .update({ snap_token: token })
        .eq('id', order.id);

      return { token, orderId: order.id };
    } catch (err) {
      const error = err as Error;
      throw new Error('Failed to initiate payment: ' + error.message);
    }
  }
};
