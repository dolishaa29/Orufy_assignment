import React, { useState } from "react";

const Card2 = ({ item, sellerContact }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    if (sellerContact && sellerContact !== "Not Available") {
      //const cleanNumber = sellerContact.replace(/[^\d]/g, "");
      const cleanNumber=sellerContact
      const encodedMessage="heyy how can we place order"
      window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, "_blank");
    } else {
      alert("Seller contact is not available");
    }
  };

  return (
    <div className="border border-slate-300 rounded-xl p-4 bg-white shadow-xs flex flex-col justify-between">
      <div>
        {item.Images && (
          <img
            src={item.Images}
            alt={item.ProductName}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
        )}

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800">{item.ProductName}</h3>
          <p className="text-sm text-slate-500">
            Brand: <span className="font-medium text-slate-700">{item.BrandName}</span>
          </p>
          <p className="text-sm text-slate-500">
            Type: <span className="font-medium text-slate-700">{item.ProductType}</span>
          </p>

          <div className="flex gap-4 mt-2">
            <p className="text-base font-bold text-indigo-600">Price: ${item.SellingPrice}</p>
            {item.MRP && (
              <p className="text-sm text-slate-400 line-through mt-0.5">MRP: ${item.MRP}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={handleConnect}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          Connect to Seller
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          {isOpen ? "Hide Details" : "View More Details"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
          <p><span className="font-bold">Stock Available:</span> {item.QuantityStock} units</p>
          <p><span className="font-bold">Exchange Option:</span> {item.Exchange}</p>
          <p><span className="font-bold">Status (Type):</span> {item.Type}</p>
          <p className="break-all"><span className="font-bold">Connected User:</span> {item.User || "N/A"}</p>
          <p><span className="font-bold">Seller Contact:</span> {sellerContact}</p>
          <p className="text-[10px] font-mono text-slate-400">Database ID: {item._id}</p>
        </div>
      )}
    </div>
  );
};

export default Card2;