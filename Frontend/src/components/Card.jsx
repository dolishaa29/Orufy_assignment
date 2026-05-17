import React from "react";

const Card = ({ item, onEdit, onDelete }) => {
  const isOutOfStock = item.QuantityStock <= 0;
  
  const productImg = Array.isArray(item.Images) ? item.Images[0] : item.Images;

  const isPublished = item.Type === "published";

  return (
    <div className="flex max-w-md items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md">
      
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-50 border border-slate-100">
        <img
          src={productImg} 
          alt={item.ProductName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold tracking-wider text-slate-400 uppercase">
            {item.BrandName}
          </span>
          
          <div className="flex items-center gap-1.5">
            <span 
              className={`inline-block w-2 h-2 rounded-full ${isPublished ? "bg-emerald-500" : "bg-slate-400"}`}
              title={isPublished ? "Published" : "Unpublished"}
            ></span>
            <span className={`text-[11px] font-medium whitespace-nowrap ${isOutOfStock ? "text-red-500" : "text-emerald-600"}`}>
              {isOutOfStock ? "Out of Stock" : `Stock: ${item.QuantityStock}`}
            </span>
          </div>
        </div>

        <h2 className="truncate text-sm font-bold text-slate-800" title={item.ProductName}>
          {item.ProductName}
        </h2>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-extrabold text-slate-900">₹{item.SellingPrice}</span>
          {item.MRP > item.SellingPrice && (
            <span className="text-xs text-slate-400 line-through">₹{item.MRP}</span>
          )}
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 truncate max-w-[80px]">
            {item.ProductType}
          </span>
        </div>

        <div className="mt-2.5 flex gap-2">
          <button
            onClick={() => onEdit(item._id)}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100 focus:outline-none transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;