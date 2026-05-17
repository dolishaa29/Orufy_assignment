import React, { useState } from "react";

const Card2 = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-300 rounded-xl p-4 bg-white shadow-xs">
        {item.Images && (
        <img 
          src={item.Images} 
          alt={item.ProductName} 
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}

      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-800">{item.ProductName}</h3>
        <p className="text-sm text-slate-500">Brand: <span className="font-medium text-slate-700">{item.BrandName}</span></p>
        <p className="text-sm text-slate-500">Type: <span className="font-medium text-slate-700">{item.ProductType}</span></p>
        
        <div className="flex gap-4 mt-2">
          <p className="text-base font-bold text-indigo-600">Price: ${item.SellingPrice}</p>
          {item.MRP && (
            <p className="text-sm text-slate-400 line-through mt-0.5">MRP: ${item.MRP}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg transition-colors"
      >
        {isOpen ? "Hide Details" : "View More Details"}
      </button>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
          <p><span className="font-bold">Stock Available:</span> {item.QuantityStock} units</p>
          <p><span className="font-bold">Exchange Option:</span> {item.Exchange}</p>
          <p><span className="font-bold">Status (Type):</span> {item.Type}</p>
          <p className="break-all"><span className="font-bold">Connected User:</span> {item.User || "N/A"}</p>
          <p className="text-[10px] font-mono text-slate-400">Database ID: {item._id}</p>
        </div>
      )}
    </div>
  );
};

export default Card2;