export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface OrderProduct extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  products: OrderProduct[];
  status: 'pending' | 'paid';
  totalAmount: number;
  createdAt: string;
}