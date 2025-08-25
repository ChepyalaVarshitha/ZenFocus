import { Home, CheckSquare, StickyNote, HelpCircle, Mail } from "lucide-react";

interface MobileNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileNav({ currentTab, onTabChange }: MobileNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? "text-blue-600" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
              data-testid={`button-mobile-nav-${item.id}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
