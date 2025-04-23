
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import StatsRadarChart from "@/components/home/StatsRadarChart";
import StatProgress from "@/components/home/StatProgress";
import { HUNTER_CLASSES } from "@/context/AppContext";

export default function Profile() {
  const { hunter } = useApp();

  if (!hunter) {
    return null;
  }

  const hunterClass = HUNTER_CLASSES[hunter.hunterClass];

  return (
    <div className="container mx-auto py-6 animate-fade-up">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-solo-purple-light">Hunter Profile</h1>
        <p className="text-gray-400 mt-1">View and manage your hunter stats</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Hunter summary */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20 overflow-hidden">
            <div className="bg-gradient-to-b from-solo-purple-accent/40 to-transparent p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-solo-purple-dark rounded-full border-4 border-solo-purple-accent flex items-center justify-center mb-4">
                <span className="text-4xl">{hunterClass.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-solo-purple-light">{hunter.name}</h2>
              <p className="text-gray-300">Level {hunter.level} {hunterClass.name}</p>
              <p className="mt-2 text-sm text-gray-400">
                Total XP: {hunter.xp + (hunter.nextLevelXp * (hunter.level - 1))}
              </p>
            </div>
            
            <CardContent className="pt-6">
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-solo-purple-dark/70 p-3 rounded-lg border border-solo-purple-secondary/30">
                    <p className="text-sm text-gray-400">Class</p>
                    <p className="font-medium">{hunterClass.name}</p>
                  </div>
                  <div className="bg-solo-purple-dark/70 p-3 rounded-lg border border-solo-purple-secondary/30">
                    <p className="text-sm text-gray-400">Level</p>
                    <p className="font-medium">{hunter.level}</p>
                  </div>
                  <div className="bg-solo-purple-dark/70 p-3 rounded-lg border border-solo-purple-secondary/30 col-span-2">
                    <p className="text-sm text-gray-400">Specialization</p>
                    <p className="font-medium">{hunterClass.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats area */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader>
              <CardTitle>Hunter Statistics</CardTitle>
              <CardDescription>
                Your attributes determine your hunter's abilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.values(hunter.stats).map((stat) => (
                    <div key={stat.name} className="bg-solo-purple-dark/70 p-4 rounded-lg border border-solo-purple-secondary/30">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{stat.displayName}</h3>
                        <span className="text-sm text-solo-purple-light">Lv. {Math.floor(stat.value)}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{stat.description}</p>
                      <StatProgress stat={stat} />
                    </div>
                  ))}
                </div>
                
                <div>
                  <StatsRadarChart stats={hunter.stats} />
                  
                  <div className="bg-solo-purple-dark/70 p-4 rounded-lg border border-solo-purple-secondary/30 mt-6">
                    <h3 className="font-medium mb-2">Class Bonuses</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <p className="text-sm">
                          <span className="font-medium">{hunterClass.name}</span>: 
                          <span className="text-gray-400 ml-1">
                            +10% XP for {hunter.stats[hunterClass.primaryStat].displayName} quests
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <p className="text-sm">
                          <span className="font-medium">Specialization</span>: 
                          <span className="text-gray-400 ml-1">
                            +5% to all {hunter.stats[hunterClass.secondaryStat].displayName} gains
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
