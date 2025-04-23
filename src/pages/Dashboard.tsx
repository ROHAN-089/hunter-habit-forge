
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import StatsRadarChart from "@/components/home/StatsRadarChart";
import StatProgress from "@/components/home/StatProgress";
import { Progress } from "@/components/ui/progress";
import QuestCard from "@/components/quests/QuestCard";

export default function Dashboard() {
  const { hunter } = useApp();

  if (!hunter) {
    return null;
  }

  // Calculate XP percentage
  const xpPercentage = (hunter.xp / hunter.nextLevelXp) * 100;

  // Count completed quests
  const completedQuests = hunter.quests.filter(q => q.completed).length;
  const totalQuests = hunter.quests.length;

  return (
    <div className="container mx-auto py-6 animate-fade-up">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-solo-purple-light">
          Welcome back, <span className="text-glow-purple">{hunter.name}</span>
        </h1>
        <p className="text-gray-400 mt-1">Continue your journey to greatness</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Hunter stats section */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex justify-between items-center">
                <span>Hunter Profile</span>
                <span className="text-solo-purple-accent">Lv. {hunter.level}</span>
              </CardTitle>
              <CardDescription>
                {hunter.name} • {hunter.hunterClass.charAt(0).toUpperCase() + hunter.hunterClass.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-300">Experience</span>
                  <span className="text-xs text-gray-400">
                    {hunter.xp} / {hunter.nextLevelXp} XP
                  </span>
                </div>
                <Progress value={xpPercentage} className="h-2 bg-gray-800 [&>div]:bg-solo-purple-accent" />
              </div>

              <div className="space-y-3 mt-6">
                {Object.values(hunter.stats).map((stat) => (
                  <StatProgress key={stat.name} stat={stat} />
                ))}
              </div>
            </CardContent>
          </Card>

          <StatsRadarChart stats={hunter.stats} />
        </div>

        {/* Main content area */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader>
              <CardTitle>Daily Quests</CardTitle>
              <CardDescription>
                {completedQuests} out of {totalQuests} quests completed today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {hunter.quests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
