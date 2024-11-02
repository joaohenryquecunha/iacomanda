import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { useStore } from '../store';
import { Product, OrderProduct } from '../types';

export function OrderForm() {
  const [customerName, setCustomerName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
  const products = useStore((state) => state.products);
  const addOrder = useStore((state) => state.addOrder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || selectedProducts.length === 0) return;

    const totalAmount = selectedProducts.reduce((sum, product) => 
      sum + (product.price * product.quantity), 0);

    addOrder({
      customerName,
      products: selectedProducts,
      status: 'pending',
      totalAmount,
    });

    setCustomerName('');
    setSelectedProducts([]);
  };

  const handleProductSelect = (product: Product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSelectedProducts(prev => prev.map(p => 
        p.id === product.id 
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newQuantity = Math.max(1, p.quantity + delta);
        return { ...p, quantity: newQuantity };
      }
      return p;
    }));
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Criar Novo Pedido</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Nome do Pedido"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Selecione os produtos</label>
          <select
            onChange={(e) => {
              const product = products.find((p) => p.id === e.target.value);
              if (product) handleProductSelect(product);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione os produtos</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Selecione os produtos:</h3>
          <ul className="space-y-2">
            {selectedProducts.map((product) => (
              <li key={product.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <span className="text-sm text-gray-600">
                  {product.name} - ${product.price}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-medium w-8 text-center">
                    {product.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="p-1 hover:bg-gray-200 rounded text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold text-gray-800">
            Total: R${selectedProducts.reduce((sum, product) => 
              sum + (product.price * product.quantity), 0).toFixed(2)}
          </p>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          <ShoppingCart size={20} />
          Criar Pedido
        </button>
      </div>
    </form>
  );
}