import { motion } from "motion/react";
import { Handshake, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentView: 'landing' | 'assistant' | 'safeguards';
  setView: (view: 'landing' | 'assistant' | 'safeguards') => void;
}

export default function Navigation({ currentView, setView }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'assistant', label: 'Assistant' },
    { id: 'safeguards', label: 'Safety & Ethics' },
  ];

  return (
    <nav className="h-20 bg-natural-sidebar/80 backdrop-blur-md border-b border-natural-border px-6 flex items-center justify-between sticky top-0 z-50">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setView('landing')}
      >
        <div className="w-10 h-10 bg-natural-green rounded-xl flex items-center justify-center text-white shadow-sm">
          <Handshake size={24} />
        </div>
        <span className="font-serif text-xl font-black tracking-tight text-natural-green">UnityPath</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              currentView === item.id 
                ? 'bg-white shadow-sm text-natural-green border border-natural-border' 
                : 'text-natural-muted hover:text-natural-green'
            }`}
          >
            {item.label}
          </button>
        ))}
        <div className="w-px h-6 bg-natural-border mx-4" />
        <button 
          onClick={() => {
            setView('landing');
            setTimeout(() => {
              const el = document.getElementById('impact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="px-5 py-2.5 bg-natural-green text-white rounded-xl text-sm font-bold hover:bg-natural-ink transition-all shadow-md active:scale-95"
        >
          See Impact
        </button>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 w-full bg-white border-b p-6 flex flex-col gap-4 md:hidden shadow-xl"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id as any);
                setIsOpen(false);
              }}
              className={`p-4 rounded-xl text-left font-bold transition-all ${
                currentView === item.id 
                  ? 'bg-natural-green text-white shadow-lg' 
                  : 'bg-natural-sidebar text-natural-muted border border-natural-border'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => {
              setView('landing');
              setIsOpen(false);
              setTimeout(() => {
                const el = document.getElementById('impact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-4 bg-natural-ink text-white rounded-xl font-bold text-center shadow-lg active:scale-95"
          >
            See Impact
          </button>
        </motion.div>
      )}
    </nav>
  );
}
