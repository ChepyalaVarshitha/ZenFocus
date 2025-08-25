import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Clock, CheckCircle, Flame } from "lucide-react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ProgressTracker() {
  const { data: progress, isLoading } = useQuery<{
    totalPoints: number;
    tasksCompleted: number;
    studyHours: number;
    currentStreak: number;
  }>({
    queryKey: ["/api/progress"],
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["/api/tasks"],
  });

  const { data: studySessions = [] } = useQuery({
    queryKey: ["/api/study-sessions"],
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading progress data...</div>;
  }

  // Generate mock data for charts (in a real app, this would come from the API)
  const pointsChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Points Earned',
        data: [65, 85, 45, 95, 70, 30, 85],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.4,
      },
    ],
  };

  const tasksChartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#F3F4F6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  // Weekly progress data
  const weeklyData = [
    { day: 'Mon', tasks: 8, percentage: 60 },
    { day: 'Tue', tasks: 12, percentage: 80 },
    { day: 'Wed', tasks: 6, percentage: 45 },
    { day: 'Thu', tasks: 15, percentage: 95 },
    { day: 'Fri', tasks: 10, percentage: 70 },
    { day: 'Sat', tasks: 4, percentage: 30 },
    { day: 'Sun', tasks: 13, percentage: 85 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Progress</h2>
      
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="text-total-points">
                  {progress?.totalPoints || 0}
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
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="text-study-hours">
                  {progress?.studyHours || 0}
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
                <p className="text-2xl font-bold text-gray-900" data-testid="text-current-streak">
                  {progress?.currentStreak || 0} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Points Progress</h3>
            <div className="h-64">
              <Line data={pointsChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks by Difficulty</h3>
            <div className="h-64">
              <Doughnut data={tasksChartData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Weekly Progress */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Progress</h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                <div className="w-8 h-20 bg-blue-100 rounded-lg mx-auto relative">
                  <div 
                    className="absolute bottom-0 w-full bg-blue-600 rounded-lg transition-all duration-300"
                    style={{ height: `${day.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">{day.tasks} tasks</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
