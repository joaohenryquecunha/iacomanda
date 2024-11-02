import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store';

export function SearchOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const orders = useStore((state) => state.orders);

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search orders by customer name..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {searchTerm && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Search Results</h3>
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{order.customerName}</h4>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}