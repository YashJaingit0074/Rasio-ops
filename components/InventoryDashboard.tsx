
import React from 'react';
import { InventoryItem, ExpiryStatus } from '../types';

interface Props {
  items: InventoryItem[];
  onDeleteItem: (id: string) => void;
}

const InventoryDashboard: React.FC<Props> = ({ items, onDeleteItem }) => {
  const getStatusColor = (status: ExpiryStatus) => {
    switch (status) {
      case ExpiryStatus.FRESH: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case ExpiryStatus.EXPIRING_SOON: return 'bg-amber-100 text-amber-700 border-amber-200';
      case ExpiryStatus.EXPIRED: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Assets</p>
            <h3 className="text-3xl font-black text-slate-800">{items.length}</h3>
          </div>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
            <i className="fas fa-boxes-stacked"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Critical Expiry</p>
            <h3 className="text-3xl font-black text-amber-600">
              {items.filter(i => i.status === ExpiryStatus.EXPIRING_SOON).length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
            <i className="fas fa-hourglass-half"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Waste Identified</p>
            <h3 className="text-3xl font-black text-rose-600">
              {items.filter(i => i.status === ExpiryStatus.EXPIRED).length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
            <i className="fas fa-trash-can"></i>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Managed Inventory Store</h3>
          <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">+ Add SKU Manually</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Predicted Shelf Life</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-mono">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDeleteItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-inbox text-slate-300 text-2xl"></i>
            </div>
            <p className="text-slate-400 text-sm">Your inventory is currently empty. Use the Vision Module to scan items.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryDashboard;
