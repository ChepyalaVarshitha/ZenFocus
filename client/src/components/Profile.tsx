import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Star, Trophy, BarChart3, LogOut } from "lucide-react";
import SkillsManager from "./SkillsManager";
import AchievementsManager from "./AchievementsManager";
import ProgressTracker from "./ProgressTracker";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Profile({ isOpen, onClose }: ProfileProps) {
  const [currentTab, setCurrentTab] = useState("skills");

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const renderContent = () => {
    switch (currentTab) {
      case "achievements":
        return <AchievementsManager />;
      case "progress":
        return <ProgressTracker />;
      default:
        return <SkillsManager />;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 w-full max-w-4xl h-full bg-white shadow-xl z-50 border-l border-gray-100 overflow-hidden">
        <div className="flex h-full">
          {/* Navigation */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                data-testid="button-close-profile"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button
                variant={currentTab === "skills" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("skills")}
                data-testid="button-profile-skills"
              >
                <Star className="w-4 h-4 mr-3 text-green-600" />
                Skills
              </Button>
              <Button
                variant={currentTab === "achievements" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("achievements")}
                data-testid="button-profile-achievements"
              >
                <Trophy className="w-4 h-4 mr-3 text-yellow-600" />
                Achievements
              </Button>
              <Button
                variant={currentTab === "progress" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("progress")}
                data-testid="button-profile-progress"
              >
                <BarChart3 className="w-4 h-4 mr-3 text-blue-600" />
                Progress
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
