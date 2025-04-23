
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function DailyLog() {
  const { hunter } = useApp();
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!hunter) {
    return null;
  }

  // For demonstration: show some random data to visualize what a filled calendar would look like
  const getTodaysCompletedQuests = () => {
    return hunter.quests.filter(quest => quest.completed);
  };

  // Simulate some historical data
  const getRandomHistoricalData = (date: Date) => {
    // Simple random seed based on date
    const seed = date.getDate() + (date.getMonth() * 31);
    const completedCount = (seed % 5) + (date.getDay() % 3); // 0-7 completed quests
    
    return Array.from({ length: completedCount }, (_, i) => ({
      id: `historical-${date.toISOString()}-${i}`,
      name: `Past Quest ${i + 1}`,
      description: "This quest was completed on this day",
      completed: true
    }));
  };

  // Get data for selected date
  const selectedDateData = date?.toDateString() === new Date().toDateString() 
    ? getTodaysCompletedQuests()
    : getRandomHistoricalData(date || new Date());
  
  // Generate heatmap data for the calendar
  const getHeatmapData = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const heatmapData: Record<string, number> = {};
    
    let currentDate = new Date(sixMonthsAgo);
    while (currentDate <= today) {
      const dateString = currentDate.toDateString();
      // Generate data based on day of week and some randomness
      const seed = currentDate.getDate() + (currentDate.getMonth() * 31);
      const value = (seed % 5) + (currentDate.getDay() % 3); // 0-7 activity score
      
      heatmapData[dateString] = value;
      
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate;
    }
    
    return heatmapData;
  };
  
  const heatmapData = getHeatmapData();

  // Custom day rendering for the calendar to show heatmap
  const dayRender = (day: Date) => {
    const dateString = day.toDateString();
    const activityLevel = heatmapData[dateString] || 0;
    
    let bgColor = "bg-transparent";
    if (activityLevel > 0) {
      if (activityLevel <= 2) bgColor = "bg-solo-purple-accent/20";
      else if (activityLevel <= 4) bgColor = "bg-solo-purple-accent/40";
      else if (activityLevel <= 6) bgColor = "bg-solo-purple-accent/60";
      else bgColor = "bg-solo-purple-accent/80";
    }
    
    return (
      <div className="h-9 w-9 p-0 font-normal aria-selected:opacity-100">
        <div className={`h-7 w-7 rounded-full ${bgColor} flex items-center justify-center`}>
          {day.getDate()}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 animate-fade-up">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-solo-purple-light">Daily Log</h1>
        <p className="text-gray-400 mt-1">Track your progress over time</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar section */}
        <div className="md:col-span-7 space-y-6">
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader>
              <CardTitle>Activity Calendar</CardTitle>
              <CardDescription>
                Your daily quest completion over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-solo-purple-secondary/20"
              />
            </CardContent>
            <CardFooter className="border-t border-solo-purple-secondary/20 pt-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span>Activity Level:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-transparent border border-solo-purple-secondary/30 rounded"></div>
                  <div className="w-4 h-4 bg-solo-purple-accent/20 rounded"></div>
                  <div className="w-4 h-4 bg-solo-purple-accent/40 rounded"></div>
                  <div className="w-4 h-4 bg-solo-purple-accent/60 rounded"></div>
                  <div className="w-4 h-4 bg-solo-purple-accent/80 rounded"></div>
                </div>
                <span className="ml-1">Low to High</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Daily details section */}
        <div className="md:col-span-5 space-y-6">
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader>
              <CardTitle>
                {date ? date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : "Select a date"}
              </CardTitle>
              <CardDescription>
                {selectedDateData.length} task{selectedDateData.length !== 1 ? 's' : ''} completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateData.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateData.map((quest, index) => (
                    <div 
                      key={quest.id || index}
                      className="p-3 rounded-lg bg-solo-purple-dark/70 border border-solo-purple-secondary/30"
                    >
                      <h3 className="font-medium">{quest.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{quest.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400">No activities recorded for this day</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader>
              <CardTitle>Stats Gained</CardTitle>
              <CardDescription>
                Attribute improvements for this day
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateData.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-solo-purple-dark/70 border border-solo-purple-secondary/30 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div>
                      <p className="font-medium">Strength</p>
                      <p className="text-xs text-solo-purple-light">+{Math.floor(Math.random() * 5) / 10}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-solo-purple-dark/70 border border-solo-purple-secondary/30 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <div>
                      <p className="font-medium">Intelligence</p>
                      <p className="text-xs text-solo-purple-light">+{Math.floor(Math.random() * 8) / 10}</p>
                    </div>
                  </div>
                  {selectedDateData.length > 3 && (
                    <div className="p-3 rounded-lg bg-solo-purple-dark/70 border border-solo-purple-secondary/30 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <div>
                        <p className="font-medium">Discipline</p>
                        <p className="text-xs text-solo-purple-light">+{Math.floor(Math.random() * 6) / 10}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400">No stats gained on this day</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
