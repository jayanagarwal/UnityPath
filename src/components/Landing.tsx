import { motion } from "motion/react";
import { ArrowRight, HelpingHand, MapPin, Search, MessageSquareText } from "lucide-react";

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-natural-bg">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-natural-green/10 text-natural-green rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-natural-green/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-natural-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-natural-green"></span>
            </span>
            AI for Social Good
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-natural-ink mb-8">
            Guidance for <span className="italic text-natural-green">everyone</span>.
          </h1>
          <p className="text-xl text-natural-muted mb-10 max-w-lg leading-relaxed">
            UnityPath helps underserved communities access local services, understand complex documents, and find the help they deserve—all through a safe, empathetic AI assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-natural-green text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-natural-ink transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
            >
              Ask UnityPath <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('mission');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white border border-natural-border text-natural-green rounded-2xl font-bold hover:bg-natural-sidebar transition-colors shadow-sm"
            >
              Read Our Mission
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[500px] bg-natural-green rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200" 
              alt="Community Support"
              className="w-full h-full object-cover mix-blend-multiply opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-4 transform translate-y-0 hover:-translate-y-2 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-natural-bg" />
                  <span className="font-bold tracking-tight">Localized Support</span>
                </div>
                <p className="text-sm text-natural-bg/80 leading-relaxed font-medium">Providing real-time info on local food banks, shelters, and clinics.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform translate-y-0 hover:-translate-y-2 transition-transform delay-100">
                <div className="flex items-center gap-3 mb-2">
                  <HelpingHand className="text-natural-bg" />
                  <span className="font-bold tracking-tight">Human-Centered AI</span>
                </div>
                <p className="text-sm text-natural-bg/80 leading-relaxed font-medium">Designed to be empathetic, patient, and easy to use for all ages.</p>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-natural-green/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-natural-accent/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section id="mission" className="bg-white py-24 px-6 border-y border-natural-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4 text-natural-ink">How it helps</h2>
            <p className="text-natural-muted uppercase text-xs tracking-widest font-bold">Empowering communities through technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Search className="text-natural-green" />, 
                title: "Resource Filtering", 
                desc: "No more scrolling through endless websites. We find exactly what you need based on your situation."
              },
              { 
                icon: <MessageSquareText className="text-natural-green" />, 
                title: "Document Simplifier", 
                desc: "Upload or paste official letters. We'll explain them in plain language without the legal jargon."
              },
              { 
                icon: <HelpingHand className="text-natural-green" />, 
                title: "Step-by-Step Guides", 
                desc: "Get a clear checklist for things like renewing healthcare or registering a child for school."
              }
            ].map((f, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-natural-sidebar rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-natural-green group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm border border-natural-border">
                  {f.icon}
                </div>
                <h3 className="font-serif text-2xl mb-3 text-natural-ink">{f.title}</h3>
                <p className="text-natural-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="impact" className="py-20 px-6 bg-natural-sidebar">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-natural-border rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-natural-bg rounded-full border border-natural-border flex items-center justify-center text-2xl text-natural-green">◈</div>
            <div>
              <div className="text-[10px] text-natural-muted font-bold uppercase tracking-widest">Families Reached</div>
              <div className="text-xl font-black text-natural-green tracking-tight">1,240</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-natural-border rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-natural-bg rounded-full border border-natural-border flex items-center justify-center text-2xl text-natural-green">◇</div>
            <div>
              <div className="text-[10px] text-natural-muted font-bold uppercase tracking-widest">Languages Map</div>
              <div className="text-xl font-black text-natural-green tracking-tight">14 Dialects</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-natural-border rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-natural-bg rounded-full border border-natural-border flex items-center justify-center text-2xl text-natural-accent">✦</div>
            <div>
              <div className="text-[10px] text-natural-muted font-bold uppercase tracking-widest">Wait Time Redux</div>
              <div className="text-xl font-black text-natural-accent tracking-tight">-62% Avg</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-natural-border rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-natural-bg rounded-full border border-natural-border flex items-center justify-center text-2xl text-natural-green">⟁</div>
            <div>
              <div className="text-[10px] text-natural-muted font-bold uppercase tracking-widest">Policy Alignment</div>
              <div className="text-xl font-black text-natural-green tracking-tight">UN SDG 10</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
