import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, BookOpen, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Inicio", icon: Home },
    { to: "/daily-check", label: "Registro Diario", icon: Heart },
    { to: "/dashboard", label: "Tendencias", icon: BarChart3 },
    { to: "/resources", label: "Recursos", icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:top-0 md:bottom-auto shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-between items-center py-3">
          {/* Logo - Only visible on desktop */}
          <Link to="/" className="hidden md:flex items-center gap-2">
            <img src={logo} alt="Bienestar Logo" className="w-8 h-8" />
            <span className="font-bold text-lg text-foreground">Bienestar</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex justify-around md:justify-start md:gap-8 w-full md:w-auto">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all duration-300",
                  location.pathname === to
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs md:text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
