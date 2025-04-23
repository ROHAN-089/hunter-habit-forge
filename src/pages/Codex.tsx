
import { BookOpen } from "lucide-react";

const Codex = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6 text-solo-purple-accent" />
        <h1 className="text-2xl font-bold text-solo-purple-light">Codex</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <p className="text-gray-400">
            The Codex will contain all your knowledge and achievements.
            Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Codex;
