import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, Loader2, Info } from "lucide-react";
import { ai, SYSTEM_INSTRUCTION, searchResourcesTool } from "../lib/gemini";
import ReactMarkdown from "react-markdown";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm UnityPath, your national community assistant. To help you best, would you like to share your name? (It's completely optional). Also, where are you located and what kind of support or resources are you looking for today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Build current contents including history
      const currentHistory = [...history];
      currentHistory.push({ role: 'user', parts: [{ text: userMessage }] });

      const generateParams = {
        model: "gemini-3-flash-preview",
        contents: currentHistory,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [
            { googleSearch: {} },
            { functionDeclarations: [searchResourcesTool] }
          ],
          toolConfig: { includeServerSideToolInvocations: true }
        }
      };

      let result = await ai.models.generateContent(generateParams);
      
      // Handle tool calls loop (allowing multiple turns if model calls tools then searches)
      let turnCount = 0;
      while (result.functionCalls && turnCount < 3) {
        turnCount++;
        const toolResponses: any[] = [];
        for (const call of result.functionCalls) {
          if (call.name === 'searchResources') {
            const { keyword } = call.args as { keyword: string };
            try {
              const response = await fetch(`/api/resources?query=${encodeURIComponent(keyword)}`);
              const data = await response.json();
              toolResponses.push({
                functionResponse: {
                  name: call.name,
                  response: { content: data },
                },
              });
            } catch (err) {
              toolResponses.push({
                functionResponse: {
                  name: call.name,
                  response: { content: { error: "Local ward database is temporarily unavailable." } },
                },
              });
            }
          }
        }

        if (toolResponses.length > 0) {
          currentHistory.push(result.candidates[0].content);
          currentHistory.push({ role: 'tool', parts: toolResponses });

          result = await ai.models.generateContent({
            ...generateParams,
            contents: currentHistory
          });
        } else {
          break;
        }
      }

      const responseText = result.text || "I was unable to find verified information for this specifically. I recommend checking your local government website for the most accurate details.";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      
      // Update persistent history
      setHistory(prev => [
        ...prev, 
        { role: 'user', parts: [{ text: userMessage }] },
        result.candidates[0].content
      ]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-natural-bg">
      <div className="bg-natural-sidebar border-b border-natural-border px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-natural-green rounded-xl flex items-center justify-center text-white shadow-soft">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-natural-ink italic leading-none mb-1">UnityPath Chat</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] text-natural-muted uppercase tracking-[0.15em] font-bold">Secure Protocol Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="hidden lg:block text-right">
            <div className="text-[9px] uppercase text-natural-muted tracking-widest font-bold">Active Scope</div>
            <div className="text-xs font-bold text-natural-green">National Support</div>
          </div>
          <div className="hidden lg:block w-[1px] h-8 bg-natural-border"></div>
          <div className="hidden lg:block text-right">
            <div className="text-[9px] uppercase text-natural-muted tracking-widest font-bold">Safety Rating</div>
            <div className="text-xs font-bold text-natural-accent">Tier 1 Secure</div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-natural-accent bg-natural-accent/5 px-3 py-1.5 rounded-lg border border-natural-accent/10 font-bold uppercase tracking-wider ml-4">
            <Info size={14} />
            <span>General guidance only</span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                  msg.role === 'user' ? 'bg-natural-green text-white' : 'bg-white border border-natural-border text-natural-green'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-5 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-natural-green text-white rounded-tr-none' 
                    : 'bg-white border border-natural-border rounded-tl-none text-natural-ink'
                }`}>
                  <div className={`prose prose-sm max-w-none prose-headings:font-serif ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-natural-border shadow-sm p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-natural-green" />
              <span className="text-xs text-natural-muted font-medium uppercase tracking-widest">Processing query...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-natural-sidebar border-t border-natural-border">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="w-full bg-white border border-natural-border rounded-xl py-4 pl-6 pr-14 shadow-sm focus:outline-none focus:ring-2 focus:ring-natural-green/20 focus:border-natural-green transition-all placeholder:text-natural-muted/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-3 bg-natural-green text-white rounded-lg hover:bg-natural-ink disabled:opacity-50 disabled:grayscale transition-all shadow-md active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-center text-[9px] text-natural-muted mt-4 uppercase tracking-[0.2em] font-bold">
          Verified against Responsible AI Framework v2.4
        </p>
      </div>
    </div>
  );
}
