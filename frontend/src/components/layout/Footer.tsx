import { Play } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 py-8 text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-tokopedia-500 flex items-center justify-center text-white">
            <Play className="w-3.5 h-3.5 fill-white" />
          </div>
          <span className="font-semibold text-gray-300">
            Tokopedia Play Clone
          </span>
          <span className="text-xs text-gray-600">
            | Project GoTo Tokopedia
          </span>
        </div>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Tokopedia Play Clone by Anjas
          Susetya.
        </p>
      </div>
    </footer>
  );
};
