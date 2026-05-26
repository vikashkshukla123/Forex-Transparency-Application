import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  CreditCard,
  Bot,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics",
    },
    {
      title: "Compare Banks",
      icon: <Wallet size={20} />,
      path: "/compare",
    },
    {
      title: "Transactions",
      icon: <CreditCard size={20} />,
      path: "/transactions",
    },
    {
      title: "AI Assistant",
      icon: <Bot size={20} />,
      path: "/assistant",
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white p-6 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-12">
          Forex Insight
        </h1>

        {/* Navigation */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300
              
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              {item.icon}

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-3 bg-slate-800 hover:bg-red-500 transition-all duration-300 p-4 rounded-xl">
        <LogOut size={20} />

        Logout
      </button>
    </div>
  );
}

export default Sidebar;