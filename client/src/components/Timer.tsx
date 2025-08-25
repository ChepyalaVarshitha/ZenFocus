import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Square, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Focus Time");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const createSessionMutation = useMutation({
    mutationFn: async (duration: number) => {
      return apiRequest("POST", "/api/study-sessions", {
        duration,
        type: "focus"
      });
    },
  });

  const presets = [
    { minutes: 15, label: "15m" },
    { minutes: 25, label: "25m" },
    { minutes: 45, label: "45m" },
    { minutes: 60, label: "60m" },
  ];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 0) {
                handleTimerComplete();
                return 0;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    toast({
      title: "Time's up!",
      description: "Great work! Time for a break.",
    });
    
    // Record study session
    createSessionMutation.mutate(25); // Default session length
    
    // Request notification permission and show notification
    if (Notification.permission === 'granted') {
      new Notification('StudyFlow - Timer Complete', {
        body: 'Time for a break! Great job staying focused.',
        icon: '/favicon.ico'
      });
    }
  };

  const handleStart = () => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    // Reset to current preset or default
    setMinutes(25);
    setSeconds(0);
  };

  const handlePreset = (presetMinutes: number) => {
    if (!isRunning) {
      setMinutes(presetMinutes);
      setSeconds(0);
    }
  };

  const handleCustomTime = () => {
    const customMinutes = prompt("Enter minutes:", minutes.toString());
    if (customMinutes !== null && !isNaN(Number(customMinutes)) && Number(customMinutes) > 0) {
      setMinutes(Number(customMinutes));
      setSeconds(0);
    }
  };

  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <Card className="shadow-lg border border-gray-100">
        <CardContent className="p-8">
          <div className="text-center mb-8 relative overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Clean study workspace" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="text-center mb-8">
            <div 
              className="text-6xl md:text-7xl font-bold text-gray-800 mb-4" 
              data-testid="text-timer-display"
            >
              {displayTime}
            </div>
            <div className="text-lg text-gray-600 mb-6" data-testid="text-timer-mode">
              {mode}
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Button
                variant="outline"
                onClick={handleCustomTime}
                disabled={isRunning}
                data-testid="button-timer-set"
              >
                <Settings className="w-4 h-4 mr-2" />
                Set
              </Button>
              
              {!isRunning ? (
                <Button
                  onClick={handleStart}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                  data-testid="button-timer-start"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3"
                  data-testid="button-timer-pause"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button
                onClick={handleStop}
                variant="destructive"
                data-testid="button-timer-stop"
              >
                <Square className="w-4 h-4 mr-2" />
                End
              </Button>
            </div>
            
            <div className="flex justify-center space-x-2">
              {presets.map((preset) => (
                <Button
                  key={preset.minutes}
                  variant={minutes === preset.minutes ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePreset(preset.minutes)}
                  disabled={isRunning}
                  className="px-3 py-1 text-sm"
                  data-testid={`button-preset-${preset.minutes}`}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
