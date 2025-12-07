import { Link } from "react-router-dom";

export function Ticker({ items }:{
  items: { id:string; title:string; href:string }[];
}) {
  if (!items?.length) return null;
  return (
    
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        
        
      </div>

  );
}
