import { motion } from "motion/react";
import { ShieldCheck, MessageSquareText, Scale, HeartHandshake } from "lucide-react";

export default function SafeGuards() {
  const guidelines = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-natural-green" />,
      title: "Privacy & Safety",
      description: "We never ask for sensitive personal data like ID numbers. If you share a crisis, we immediately provide emergency resources.",
      principle: "Non-maleficence"
    },
    {
      icon: <MessageSquareText className="w-6 h-6 text-natural-accent" />,
      title: "Language Justice",
      description: "We simplify complex jargon from legal or medical documents so everyone can understand their rights and options.",
      principle: "Accessibility"
    },
    {
      icon: <Scale className="w-6 h-6 text-natural-ink" />,
      title: "Unbiased Guidance",
      description: "Our AI is trained to support all backgrounds without judgment, purely focusing on connecting you to the help you need.",
      principle: "Equity"
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-natural-green" />,
      title: "Empathetic Support",
      description: "Every response is framed with empathy, recognizing that navigating services can be stressful and overwhelming.",
      principle: "Beneficence"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-natural-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl md:text-5xl mb-4 text-natural-ink italic">Responsible AI Principles</h2>
        <p className="text-lg text-natural-muted max-w-2xl mx-auto font-medium">
          UnityPath is built on a foundation of ethical design, ensuring AI serves as a bridge, not a barrier, for underserved communities.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {guidelines.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-natural-border shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-natural-sidebar rounded-2xl group-hover:bg-natural-green transition-colors group-hover:text-white">
                {g.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-natural-muted mb-1 block">
                  {g.principle}
                </span>
                <h3 className="font-serif text-2xl mb-2 text-natural-ink">{g.title}</h3>
                <p className="text-natural-muted leading-relaxed tracking-tight text-sm">{g.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 border-t border-natural-border pt-16">
        <h3 className="font-serif text-3xl mb-8 text-center text-natural-ink">Responsible AI Alignment</h3>
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-4">
            <h4 className="font-bold text-natural-green uppercase tracking-widest text-[11px]">Accountability</h4>
            <p className="text-natural-muted leading-relaxed">
              We provide clear disclaimers that UnityPath is a tool for navigation, not a professional advisor. We redirect high-stakes queries to human specialists.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-natural-green uppercase tracking-widest text-[11px]">Transparency</h4>
            <p className="text-natural-muted leading-relaxed">
              Users are informed when they are interacting with AI. The system instructions are designed to cite sources and explain its logical reasoning when asked.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-natural-green uppercase tracking-widest text-[11px]">Inclusivity</h4>
            <p className="text-natural-muted leading-relaxed">
              By focusing on clear language and low-bandwidth UI, we ensure the digital divide is bridged, not widened by advanced technology.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-natural-green text-white p-12 rounded-[2.5rem] overflow-hidden relative shadow-xl">
        <div className="relative z-10">
          <h3 className="font-serif text-3xl mb-4 italic">Our Commitment</h3>
          <p className="text-natural-sidebar/80 max-w-xl mb-8 leading-relaxed font-medium">
            We focus on communities that are traditionally left behind: rural populations with low bandwidth, non-native speakers, and individuals with limited technical literacy.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm">No data selling</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm">Local resources only</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm">Human fallback</span>
          </div>
        </div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-natural-accent/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
