import { useState } from "react";
import Landing from "./components/Landing";
import AIAssistant from "./components/AIAssistant";
import SafeGuards from "./components/SafeGuards";
import Navigation from "./components/Navigation";
import { AnimatePresence, motion } from "motion/react";

type View = "landing" | "assistant" | "safeguards";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("landing");

  return (
    <div className="min-h-screen">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main>
        <AnimatePresence mode="wait">
          {currentView === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Landing onStart={() => setCurrentView("assistant")} />
            </motion.div>
          )}
          
          {currentView === "assistant" && (
            <motion.div
              key="assistant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AIAssistant />
            </motion.div>
          )}

          {currentView === "safeguards" && (
            <motion.div
              key="safeguards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SafeGuards />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Disclaimer */}
      <footer className="bg-white border-t py-8 px-6 text-center text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 UnityPath Assistant. Built for AI for Good.</p>
          <div className="flex gap-6">
            <button onClick={() => setCurrentView('safeguards')} className="hover:text-[#1B4332]">Ethics Policy</button>
            <a href="#" className="hover:text-[#1B4332]">Privacy</a>
            <a href="#" className="hover:text-[#1B4332]">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
