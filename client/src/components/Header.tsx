import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  onTabChange: (tab: string) => void;
  currentTab: string;
  onProfileToggle: () => void;
}

export default function Header({ onTabChange, currentTab, onProfileToggle }: HeaderProps) {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "tasks", label: "Tasks" },
    { id: "notes", label: "Notes" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">StudyFlow</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`transition-colors ${
                  currentTab === item.id
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                data-testid={`button-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onProfileToggle}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 p-0"
              data-testid="button-profile"
            >
              <User className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
