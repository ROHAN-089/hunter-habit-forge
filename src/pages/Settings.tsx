
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6 text-solo-purple-accent" />
        <h1 className="text-2xl font-bold text-solo-purple-light">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <p className="text-gray-400">
            Settings page coming soon. Here you'll be able to customize your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
