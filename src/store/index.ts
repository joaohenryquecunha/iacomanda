import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Order } from '../types';

interface StoreState {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: 'pending' | 'paid') => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: [],
      orders: [],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: crypto.randomUUID() }],
        })),
      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })),
    }),
    {
      name: 'order-management-storage',
    }
  )
);