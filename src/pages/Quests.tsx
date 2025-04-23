
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import QuestCard from "@/components/quests/QuestCard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { QuestRank, StatType } from "@/context/AppContext";

export default function Quests() {
  const { hunter, addQuest } = useApp();
  const [newQuest, setNewQuest] = useState({
    name: "",
    description: "",
    rank: "E" as QuestRank,
    primaryStat: "strength" as StatType,
    xpReward: 20
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!hunter) {
    return null;
  }

  const handleCreateQuest = () => {
    addQuest(newQuest);
    setNewQuest({
      name: "",
      description: "",
      rank: "E" as QuestRank,
      primaryStat: "strength" as StatType,
      xpReward: 20
    });
    setIsDialogOpen(false);
  };

  const calculateXpReward = (rank: QuestRank): number => {
    const baseXp = {
      "E": 20,
      "D": 40,
      "C": 65,
      "B": 100,
      "A": 150,
      "S": 250
    };
    return baseXp[rank];
  };

  const handleRankChange = (rank: QuestRank) => {
    setNewQuest({
      ...newQuest,
      rank,
      xpReward: calculateXpReward(rank)
    });
  };

  // Group quests by completion status
  const activeQuests = hunter.quests.filter(q => !q.completed);
  const completedQuests = hunter.quests.filter(q => q.completed);

  return (
    <div className="container mx-auto py-6 animate-fade-up">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-solo-purple-light">Quests</h1>
          <p className="text-gray-400 mt-1">Track and complete your daily habits</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-solo-purple-accent hover:bg-solo-purple-accent/80">
              Create Quest
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-solo-purple-dark border-solo-purple-secondary/30">
            <DialogHeader>
              <DialogTitle>Create New Quest</DialogTitle>
              <DialogDescription>
                Add a new habit to track in your daily quests.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Quest Name</Label>
                <Input 
                  id="name" 
                  value={newQuest.name}
                  onChange={(e) => setNewQuest({...newQuest, name: e.target.value})}
                  placeholder="Read for 30 minutes" 
                  className="bg-solo-purple-dark/70 border-solo-purple-secondary/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newQuest.description}
                  onChange={(e) => setNewQuest({...newQuest, description: e.target.value})}
                  placeholder="Read a book or article for at least 30 minutes" 
                  className="bg-solo-purple-dark/70 border-solo-purple-secondary/50"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rank">Difficulty Rank</Label>
                  <Select 
                    value={newQuest.rank} 
                    onValueChange={(value) => handleRankChange(value as QuestRank)}
                  >
                    <SelectTrigger className="bg-solo-purple-dark/70 border-solo-purple-secondary/50">
                      <SelectValue placeholder="Select rank" />
                    </SelectTrigger>
                    <SelectContent className="bg-solo-purple-dark border-solo-purple-secondary/50">
                      <SelectItem value="E">E - Easy (5-10 min)</SelectItem>
                      <SelectItem value="D">D - Simple (10-30 min)</SelectItem>
                      <SelectItem value="C">C - Medium (30+ min)</SelectItem>
                      <SelectItem value="B">B - Hard (High focus)</SelectItem>
                      <SelectItem value="A">A - Expert (Major commitment)</SelectItem>
                      <SelectItem value="S">S - Master (Exceptional)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primaryStat">Primary Attribute</Label>
                  <Select 
                    value={newQuest.primaryStat}
                    onValueChange={(value) => setNewQuest({...newQuest, primaryStat: value as StatType})}
                  >
                    <SelectTrigger className="bg-solo-purple-dark/70 border-solo-purple-secondary/50">
                      <SelectValue placeholder="Select attribute" />
                    </SelectTrigger>
                    <SelectContent className="bg-solo-purple-dark border-solo-purple-secondary/50">
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="intelligence">Intelligence</SelectItem>
                      <SelectItem value="discipline">Discipline</SelectItem>
                      <SelectItem value="willpower">Willpower</SelectItem>
                      <SelectItem value="charisma">Charisma</SelectItem>
                      <SelectItem value="vitality">Vitality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-400">
                  XP Reward: <span className="font-semibold text-solo-purple-light">{newQuest.xpReward} XP</span>
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="border-solo-purple-secondary/50"
              >
                Cancel
              </Button>
              <Button 
                className="bg-solo-purple-accent hover:bg-solo-purple-accent/80"
                onClick={handleCreateQuest}
                disabled={!newQuest.name || !newQuest.description}
              >
                Create Quest
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="space-y-8">
        {activeQuests.length > 0 && (
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader>
              <CardTitle>Active Quests</CardTitle>
              <CardDescription>
                {activeQuests.length} quest{activeQuests.length !== 1 ? 's' : ''} awaiting completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {activeQuests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {completedQuests.length > 0 && (
          <Card className="bg-solo-purple-dark/50 border border-solo-purple-secondary/20">
            <CardHeader>
              <CardTitle>Completed Quests</CardTitle>
              <CardDescription>
                {completedQuests.length} quest{completedQuests.length !== 1 ? 's' : ''} completed today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {completedQuests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
