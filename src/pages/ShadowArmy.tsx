
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swords } from "lucide-react";

const ShadowArmy = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Swords className="h-6 w-6 text-solo-purple-accent" />
        <h1 className="text-2xl font-bold text-solo-purple-light">Shadow Army</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for when no shadows are available */}
        <Card className="bg-solo-purple-dark/50 border-solo-purple-secondary/20">
          <CardHeader>
            <CardTitle className="text-xl text-solo-purple-light">No Shadows Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Maintain habits for 30+ days to extract shadows and build your army.
              Each shadow represents a mastered habit that will assist you on your journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShadowArmy;
