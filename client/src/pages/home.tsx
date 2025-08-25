import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Timer from "@/components/Timer";
import TaskManager from "@/components/TaskManager";
import NotesManager from "@/components/NotesManager";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Profile from "@/components/Profile";
import MobileNav from "@/components/MobileNav";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, Flame } from "lucide-react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useAuth();

  const { data: progress } = useQuery<{
    totalPoints: number;
    tasksCompleted: number;
    studyHours: number;
    currentStreak: number;
  }>({
    queryKey: ["/api/progress"],
  });

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setShowProfile(false);
  };

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "tasks":
        return <TaskManager />;
      case "notes":
        return <NotesManager />;
      case "faq":
        return <FAQ />;
      case "contact":
        return <Contact />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Master Your Study Sessions
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Boost productivity with our advanced pomodoro timer, task management, and progress tracking
              </p>
            </div>

            {/* Timer Section */}
            <Timer />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Study Hours</p>
                      <p className="text-2xl font-bold text-gray-900" data-testid="text-study-hours">
                        {progress?.studyHours || 0}h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Tasks Completed</p>
                      <p className="text-2xl font-bold text-gray-900" data-testid="text-tasks-completed">
                        {progress?.tasksCompleted || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Flame className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Current Streak</p>
                      <p className="text-2xl font-bold text-gray-900" data-testid="text-streak">
                        {progress?.currentStreak || 0} days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onTabChange={handleTabChange} 
        currentTab={currentTab}
        onProfileToggle={handleProfileToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        {renderContent()}
      </main>

      <Profile isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <MobileNav currentTab={currentTab} onTabChange={handleTabChange} />
    </div>
  );
}
