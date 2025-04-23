
import { cn } from "@/lib/utils";
import { Stat } from "@/context/AppContext";

interface StatProgressProps {
  stat: Stat;
  className?: string;
}

const getStatColor = (statName: string) => {
  switch (statName) {
    case "strength":
      return "bg-red-500";
    case "intelligence":
      return "bg-blue-500";
    case "discipline":
      return "bg-purple-500";
    case "willpower":
      return "bg-yellow-500";
    case "charisma":
      return "bg-pink-500";
    case "vitality":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default function StatProgress({ stat, className }: StatProgressProps) {
  // Calculate the percentage (max level 100 for display purposes)
  const percentage = Math.min(Math.max((stat.value / 100) * 100, 5), 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{stat.displayName}</span>
        <span className="text-xs text-gray-400">Lv. {Math.floor(stat.value)}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5">
        <div 
          className={cn("h-2.5 rounded-full", getStatColor(stat.name))}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
