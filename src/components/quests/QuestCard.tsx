
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Quest, useApp } from "@/context/AppContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle } from "lucide-react";

interface QuestCardProps {
  quest: Quest;
}

const getRankColor = (rank: string) => {
  switch (rank) {
    case "E":
      return "bg-solo-rank-e border-solo-rank-e/30 text-white";
    case "D": 
      return "bg-solo-rank-d border-solo-rank-d/30 text-white";
    case "C":
      return "bg-solo-rank-c border-solo-rank-c/30 text-white";
    case "B":
      return "bg-solo-rank-b border-solo-rank-b/30 text-white";
    case "A":
      return "bg-solo-rank-a border-solo-rank-a/30 text-white";
    case "S":
      return "bg-solo-rank-s border-solo-rank-s/30 text-black";
    default:
      return "bg-gray-600 border-gray-500/30 text-white";
  }
};

export default function QuestCard({ quest }: QuestCardProps) {
  const { completeQuest } = useApp();

  return (
    <Card className={`bg-solo-purple-dark border border-solo-purple-secondary/30 ${
      quest.completed ? "opacity-70" : ""
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge className={`${getRankColor(quest.rank)} border`}>
            Rank {quest.rank}
          </Badge>
          {quest.streak > 0 && (
            <Badge variant="outline" className="border-solo-purple-light/30 text-solo-gray-neutral">
              Streak: {quest.streak}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl mt-2 text-solo-purple-light">{quest.name}</CardTitle>
        <CardDescription>{quest.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center">
            <span className="text-solo-soft-purple">+{quest.xpReward} XP</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button 
                  className={`w-full ${quest.completed ? "bg-green-700 hover:bg-green-800" : "bg-solo-purple-accent hover:bg-solo-purple-accent/80"}`}
                  onClick={() => completeQuest(quest.id)}
                  disabled={quest.completed}
                >
                  {quest.completed ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> Completed
                    </span>
                  ) : (
                    "Complete Quest"
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {quest.completed && (
              <TooltipContent>
                <p>Quest already completed today!</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
