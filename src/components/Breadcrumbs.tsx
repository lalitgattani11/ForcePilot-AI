import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  themeColor?: "emerald" | "cyan" | "blue" | "purple" | "rose" | "teal" | "pink" | "orange" | "amber";
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, themeColor = "emerald" }) => {
  React.useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://forcepilotai.online${item.path}`
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  const hoverColors = {
    emerald: "hover:text-emerald-400",
    cyan: "hover:text-cyan-400",
    blue: "hover:text-blue-400",
    purple: "hover:text-purple-400",
    rose: "hover:text-rose-400",
    teal: "hover:text-teal-400",
    pink: "hover:text-pink-400",
    orange: "hover:text-orange-400",
    amber: "hover:text-amber-400"
  };

  const hoverColor = hoverColors[themeColor] || "hover:text-emerald-400";

  return (
    <nav aria-label="Breadcrumb" className="w-full flex justify-center sm:justify-start">
      <ol className="flex items-center flex-wrap gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight size={10} className="text-slate-600 shrink-0" />}
              {isLast ? (
                <span className="text-slate-400 select-none truncate max-w-[200px] sm:max-w-xs">{item.name}</span>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors duration-300 ${hoverColor} text-slate-500`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
