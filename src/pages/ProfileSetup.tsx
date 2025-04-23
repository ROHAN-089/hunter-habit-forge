
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassType, HUNTER_CLASSES, StatType, DEFAULT_STATS, useApp } from "@/context/AppContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const { completeSetup } = useApp();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [statPoints, setStatPoints] = useState<Record<StatType, number>>({
    strength: 1,
    intelligence: 1,
    discipline: 1,
    willpower: 1,
    charisma: 1,
    vitality: 1
  });
  const [remainingPoints, setRemainingPoints] = useState(4); // 10 total points - 6 base points (1 per stat)

  const handleIncreaseStat = (stat: StatType) => {
    if (remainingPoints <= 0) return;
    
    setStatPoints({
      ...statPoints,
      [stat]: statPoints[stat] + 1
    });
    setRemainingPoints(remainingPoints - 1);
  };

  const handleDecreaseStat = (stat: StatType) => {
    if (statPoints[stat] <= 1) return;
    
    setStatPoints({
      ...statPoints,
      [stat]: statPoints[stat] - 1
    });
    setRemainingPoints(remainingPoints + 1);
  };

  const handleComplete = () => {
    if (!selectedClass || !name) return;
    
    completeSetup(name, selectedClass, statPoints);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-solo-purple-dark p-4">
      <Card className="w-full max-w-lg bg-solo-purple-dark/50 border border-solo-purple-secondary/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-solo-purple-light">
            Create Your Hunter
          </CardTitle>
          <CardDescription>
            Begin your journey to become a legendary hunter
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4 animate-fade-up">
              <div className="space-y-2">
                <Label htmlFor="name">Hunter Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your hunter name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="bg-solo-purple-dark/70 border-solo-purple-secondary/50"
                />
              </div>
              
              <div className="space-y-2 mt-6">
                <Label>Choose Your Hunter Class</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {Object.values(HUNTER_CLASSES).map((hunterClass) => (
                    <div 
                      key={hunterClass.type}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedClass === hunterClass.type
                          ? "bg-solo-purple-accent/20 border-solo-purple-accent"
                          : "bg-solo-purple-dark/70 border-solo-purple-secondary/30 hover:bg-solo-purple-dark/90"
                      }`}
                      onClick={() => setSelectedClass(hunterClass.type)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{hunterClass.icon}</div>
                        <div>
                          <h3 className="font-medium">{hunterClass.name}</h3>
                          <p className="text-xs text-gray-400">
                            {DEFAULT_STATS[hunterClass.primaryStat].displayName} +
                            {DEFAULT_STATS[hunterClass.secondaryStat].displayName}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mt-2 text-gray-300">{hunterClass.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <h3 className="font-medium mb-1">Distribute Stat Points</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Remaining points: <span className="font-semibold">{remainingPoints}</span>
                </p>
                
                <div className="space-y-3">
                  {Object.values(DEFAULT_STATS).map((stat) => (
                    <div key={stat.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{stat.displayName}</p>
                        <p className="text-xs text-gray-400">{stat.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 rounded-full p-0 border border-solo-purple-secondary/50"
                          onClick={() => handleDecreaseStat(stat.name)}
                          disabled={statPoints[stat.name] <= 1}
                        >
                          -
                        </Button>
                        <span className="w-4 text-center">{statPoints[stat.name]}</span>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 rounded-full p-0 border border-solo-purple-secondary/50"
                          onClick={() => handleIncreaseStat(stat.name)}
                          disabled={remainingPoints <= 0}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(1)}
              className="border-solo-purple-secondary/50"
            >
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button 
              className="ml-auto bg-solo-purple-accent hover:bg-solo-purple-accent/80"
              onClick={() => setStep(2)}
              disabled={!selectedClass || !name}
            >
              Continue
            </Button>
          ) : (
            <Button 
              className="ml-auto bg-solo-purple-accent hover:bg-solo-purple-accent/80"
              onClick={handleComplete}
            >
              Begin Journey
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
