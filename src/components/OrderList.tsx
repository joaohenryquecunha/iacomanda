import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../store';

export function OrderList({ status }: { status: 'pending' | 'paid' }) {
  const orders = useStore((state) => state.orders.filter((order) => order.status === status));
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  const toggleStatus = (orderId: string, currentStatus: 'pending' | 'paid') => {
    updateOrderStatus(orderId, currentStatus === 'pending' ? 'paid' : 'pending');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {status === 'pending' ? 'Pending Orders' : 'Paid Orders'}
      </h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{order.customerName}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <ul className="mt-2 space-y-1">
                  {order.products.map((product, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {product.name} - ${product.price} x {product.quantity}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold text-gray-800">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => toggleStatus(order.id, status)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                  status === 'pending'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {status === 'pending' ? (
                  <>
                    <CheckCircle size={16} />
                    Mark as Paid
                  </>
                ) : (
                  <>
                    <Clock size={16} />
                    Mark as Pending
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}