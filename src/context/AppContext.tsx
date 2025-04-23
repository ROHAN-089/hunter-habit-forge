
import { ReactNode, createContext, useContext, useState } from "react";

// Define our core statistics types
export type StatType = "strength" | "intelligence" | "discipline" | "willpower" | "charisma" | "vitality";
export type ClassType = "warrior" | "mage" | "rogue" | "healer" | "bard";
export type QuestRank = "E" | "D" | "C" | "B" | "A" | "S";

export interface Stat {
  name: StatType;
  value: number;
  displayName: string;
  description: string;
}

export interface HunterClass {
  type: ClassType;
  name: string;
  description: string;
  primaryStat: StatType;
  secondaryStat: StatType;
  icon: string;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  rank: QuestRank;
  primaryStat: StatType;
  secondaryStat?: StatType;
  xpReward: number;
  completed: boolean;
  streak: number;
  lastCompleted?: Date;
}

export interface HunterProfile {
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  hunterClass: ClassType;
  stats: Record<StatType, Stat>;
  quests: Quest[];
}

// Default values
export const DEFAULT_STATS: Record<StatType, Stat> = {
  strength: {
    name: "strength",
    value: 1,
    displayName: "Strength",
    description: "Physical fitness and health habits"
  },
  intelligence: {
    name: "intelligence",
    value: 1,
    displayName: "Intelligence",
    description: "Learning and mental development"
  },
  discipline: {
    name: "discipline",
    value: 1,
    displayName: "Discipline",
    description: "Consistency and routine adherence"
  },
  willpower: {
    name: "willpower",
    value: 1,
    displayName: "Willpower",
    description: "Ability to resist temptation and maintain focus"
  },
  charisma: {
    name: "charisma",
    value: 1,
    displayName: "Charisma",
    description: "Social habits and interpersonal skills"
  },
  vitality: {
    name: "vitality",
    value: 1,
    displayName: "Vitality",
    description: "Self-care and wellness habits"
  }
};

export const HUNTER_CLASSES: Record<ClassType, HunterClass> = {
  warrior: {
    type: "warrior",
    name: "Warrior",
    description: "Focus on physical training and health habits",
    primaryStat: "strength",
    secondaryStat: "discipline",
    icon: "⚔️"
  },
  mage: {
    type: "mage",
    name: "Mage",
    description: "Focus on learning and skill development",
    primaryStat: "intelligence",
    secondaryStat: "willpower",
    icon: "🧙‍♂️"
  },
  rogue: {
    type: "rogue",
    name: "Rogue",
    description: "Focus on productivity and efficiency",
    primaryStat: "discipline",
    secondaryStat: "intelligence",
    icon: "🗡️"
  },
  healer: {
    type: "healer",
    name: "Healer",
    description: "Focus on self-care and wellness",
    primaryStat: "vitality",
    secondaryStat: "willpower",
    icon: "🧪"
  },
  bard: {
    type: "bard",
    name: "Bard",
    description: "Focus on creative pursuits and social connections",
    primaryStat: "charisma",
    secondaryStat: "vitality",
    icon: "🎭"
  }
};

// Interface for the context value
interface AppContextType {
  hunter: HunterProfile | null;
  isSetupComplete: boolean;
  completeSetup: (name: string, hunterClass: ClassType, statPoints: Record<StatType, number>) => void;
  completeQuest: (questId: string) => void;
  addQuest: (quest: Omit<Quest, "id" | "completed" | "streak" | "lastCompleted">) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [hunter, setHunter] = useState<HunterProfile | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Complete the initial setup
  const completeSetup = (name: string, hunterClass: ClassType, statPoints: Record<StatType, number>) => {
    // Create stats with allocated points
    const stats = { ...DEFAULT_STATS };
    Object.keys(statPoints).forEach((stat) => {
      const statKey = stat as StatType;
      stats[statKey] = {
        ...stats[statKey],
        value: statPoints[statKey]
      };
    });

    // Create the hunter profile
    const newHunter: HunterProfile = {
      name,
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      hunterClass,
      stats,
      quests: generateInitialQuests(hunterClass)
    };

    setHunter(newHunter);
    setIsSetupComplete(true);
  };

  // Complete a quest
  const completeQuest = (questId: string) => {
    if (!hunter) return;

    const updatedHunter = { ...hunter };
    
    // Find and update the quest
    const questIndex = updatedHunter.quests.findIndex(q => q.id === questId);
    if (questIndex === -1) return;

    const quest = { ...updatedHunter.quests[questIndex] };
    quest.completed = true;
    quest.streak += 1;
    quest.lastCompleted = new Date();

    updatedHunter.quests[questIndex] = quest;

    // Award XP
    updatedHunter.xp += quest.xpReward;

    // Level up if enough XP
    if (updatedHunter.xp >= updatedHunter.nextLevelXp) {
      updatedHunter.level += 1;
      updatedHunter.xp = updatedHunter.xp - updatedHunter.nextLevelXp;
      updatedHunter.nextLevelXp = Math.floor(updatedHunter.nextLevelXp * 1.5);
      
      // Increase primary stat for completing quest
      const primaryStat = updatedHunter.stats[quest.primaryStat];
      updatedHunter.stats[quest.primaryStat] = {
        ...primaryStat,
        value: primaryStat.value + 1
      };
      
      // Increase secondary stat if it exists
      if (quest.secondaryStat) {
        const secondaryStat = updatedHunter.stats[quest.secondaryStat];
        updatedHunter.stats[quest.secondaryStat] = {
          ...secondaryStat,
          value: secondaryStat.value + 0.5
        };
      }
    }

    setHunter(updatedHunter);
  };

  // Add a new quest
  const addQuest = (quest: Omit<Quest, "id" | "completed" | "streak" | "lastCompleted">) => {
    if (!hunter) return;

    const newQuest: Quest = {
      ...quest,
      id: `quest-${Date.now()}`,
      completed: false,
      streak: 0
    };

    setHunter({
      ...hunter,
      quests: [...hunter.quests, newQuest]
    });
  };

  // Generate initial quests based on hunter class
  const generateInitialQuests = (hunterClass: ClassType): Quest[] => {
    const classInfo = HUNTER_CLASSES[hunterClass];
    
    return [
      {
        id: `quest-${Date.now()}-1`,
        name: "Begin your journey",
        description: "Complete your first daily habit",
        rank: "E",
        primaryStat: classInfo.primaryStat,
        xpReward: 20,
        completed: false,
        streak: 0
      },
      {
        id: `quest-${Date.now()}-2`,
        name: "Establish routine",
        description: "Log in for 3 consecutive days",
        rank: "D",
        primaryStat: "discipline",
        xpReward: 40,
        completed: false,
        streak: 0
      },
      {
        id: `quest-${Date.now()}-3`,
        name: `Enhance your ${classInfo.name} abilities`,
        description: `Complete a task related to your ${classInfo.name} class`,
        rank: "D",
        primaryStat: classInfo.primaryStat,
        secondaryStat: classInfo.secondaryStat,
        xpReward: 50,
        completed: false,
        streak: 0
      }
    ];
  };

  const value = {
    hunter,
    isSetupComplete,
    completeSetup,
    completeQuest,
    addQuest
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
