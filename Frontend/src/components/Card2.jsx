import React, { useState } from "react";
import { X, ChevronDown, ChevronUp, Share2 } from "lucide-react";

const WhatsAppIcon = ({ size = 16 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" 
    width={size} 
    height={size} 
    fill="currentColor"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);



const Card2 = ({ item, sellerContact }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false); 
  const [copied, setCopied] = useState(false);
  const productUrl = `${window.location.origin}/explore?product=${item._id}`;

  const handleConnect = () => {
    if (sellerContact && sellerContact !== "Not Available") {
      const cleanNumber = sellerContact;
      const messageText = `Hi, I am interested in ordering: *${item.ProductName}*\n\nHere is the product link: ${productUrl}`;
      const encodedMessage = encodeURIComponent(messageText);
      
      window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, "_blank");
    } else {
      alert("Seller contact is not available");
    }
  };



  const handleShare = async () => {
    const shareData = {
      title: item.ProductName,
      text: `Check out this product: ${item.ProductName} on our store!`,
      url: productUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };




  return (
    <>
      <div className="group relative border border-white/60 rounded-2xl p-4 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
        <div>
          {item.Images && (
            <div 
              onClick={() => setIsImageModalOpen(true)}
              className="relative w-full h-64 overflow-hidden rounded-xl mb-4 cursor-pointer bg-slate-100"
            >
              <img
                src={item.Images}
                alt={item.ProductName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                {item.ProductType}
              </span>

              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-3 py-1.5 rounded-full shadow-sm">
                  Click to view
                </span>
              </div>
            </div>
          )}



          <div className="space-y-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-xl font-extrabold text-gray-800 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">
                {item.ProductName}
              </h3>
              {item.BrandName && (
                <>
                  <span className="text-gray-400 font-bold text-sm">•</span>
                  <span className="text-xs font-medium text-gray-500 lowercase bg-slate-100 px-1.5 py-0.5 rounded-md">
                    {item.BrandName}
                  </span>
                </>
              )}
            </div>




            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-black text-gray-900">
                ₹{item.SellingPrice}
              </span>
              {item.MRP && item.MRP > item.SellingPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{item.MRP}
                </span>
              )}
            </div>
          </div>



          <div className="mt-4 flex items-center justify-between border-t border-b border-gray-100/80 py-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1 focus:outline-none"
            >
              {showDetails ? (
                <>Hide Details <ChevronUp size={14} /></>
              ) : (
                <>More Details <ChevronDown size={14} /></>
              )}
            </button>

            <button
              onClick={handleShare}
              className={`text-xs font-bold transition-all duration-200 flex items-center gap-1.5 focus:outline-none px-2.5 py-1 rounded-lg ${
                copied 
                  ? "bg-emerald-50 text-emerald-600 font-extrabold" 
                  : "text-slate-500 hover:text-emerald-600 hover:bg-slate-100/50"
              }`}
            >


              <Share2 size={14} />
              {copied ? "Link Copied!" : "Share Product"}
            </button>
          </div>



          {showDetails && (
            <div className="mt-3 pt-3 border-t border-dashed border-slate-200 space-y-2 text-xs text-gray-600 bg-slate-50/80 p-3 rounded-xl animate-fade-in">
              <div className="flex justify-between">
                <span className="text-gray-400">Stock:</span>
                <span className="font-bold text-gray-700">{item.QuantityStock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="font-bold text-gray-700 capitalize">{item.ProductType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Exchange:</span>
                <span className={`font-bold capitalize ${item.Exchange === 'yes' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {item.Exchange}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contact:</span>
                <span className="font-mono font-medium text-gray-700">{sellerContact}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <button
            onClick={handleConnect}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-emerald-200 hover:shadow-lg flex items-center justify-center gap-2.5"
          >
            <WhatsAppIcon size={16} />
            Connect
          </button>
        </div>
      </div>

      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-3xl max-h-[85vh] bg-white rounded-2xl p-2 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
            <img 
              src={item.Images} 
              alt={item.ProductName} 
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Card2;