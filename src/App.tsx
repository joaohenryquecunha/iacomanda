import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { ProductForm } from './components/ProductForm';
import { OrderForm } from './components/OrderForm';
import { OrderList } from './components/OrderList';
import { Dashboard } from './components/Dashboard';
import { SearchOrders } from './components/SearchOrders';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'search'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'orders', label: 'Pedido', icon: ShoppingCart },
    { id: 'search', label: 'Buscar', icon: Search },
  ] as const;

  const handleNavClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">ClickComanda</h1>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeTab === id
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`w-full flex items-center px-4 py-2 text-base font-medium ${
                  activeTab === id
                    ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        
        {activeTab === 'products' && (
          <div className="space-y-8">
            <ProductForm />
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <OrderForm />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <OrderList status="pending" />
              <OrderList status="paid" />
            </div>
          </div>
        )}
        
        {activeTab === 'search' && <SearchOrders />}
      </main>
    </div>
  );
}

export default App;