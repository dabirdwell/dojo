"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { getBeltForXP, getCurriculumLevel } from "@/data/belts";
import { loadProgress } from "@/lib/progress";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DojoMaster() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [beltName, setBeltName] = useState("White Belt");
  const [xp, setXp] = useState(0);
  const [curriculumLevel, setCurriculumLevel] = useState("white");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load belt data from localStorage
  useEffect(() => {
    const progress = loadProgress();
    const belt = getBeltForXP(progress.totalXP);
    setBeltName(belt.name);
    setXp(progress.totalXP);
    setCurriculumLevel(getCurriculumLevel(belt.name));
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const sendMessage = useCallback(async (directText?: string) => {
    const trimmed = (directText ?? input).trim();
    if (!trimmed || isStreaming) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    // Add placeholder for assistant response
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/dojo-master", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          beltName,
          xp,
          curriculumLevel,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              assistantText += parsed.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantText,
                };
                return updated;
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "I seem to have lost my focus. Try again — a sensei's patience is infinite, but servers are not.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages, beltName, xp, curriculumLevel]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const belt = getBeltForXP(xp);

  return (
    <div className="min-h-screen bg-dojo-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dojo-bg/80 backdrop-blur-md border-b border-dojo-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-dojo-muted hover:text-dojo-text transition-colors"
          >
            ← Dojo
          </Link>
          <h1 className="text-sm font-bold text-dojo-text tracking-wide">
            Dojo Master
          </h1>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: belt.color }}
            />
            <span className="text-xs text-dojo-muted">
              {belt.name} · {xp} XP
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-20 space-y-6">
              <div className="text-5xl">🥋</div>
              <div>
                <h2 className="text-2xl font-bold text-dojo-text mb-2">
                  Welcome to the Dojo
                </h2>
                <p className="text-dojo-muted text-sm max-w-md mx-auto leading-relaxed">
                  Your sensei adapts to your{" "}
                  <span
                    className="font-medium"
                    style={{ color: belt.color }}
                  >
                    {belt.name}
                  </span>{" "}
                  level. Ask to be quizzed, bring an argument to evaluate, request a
                  belt-advancement challenge, or just start a conversation about
                  reasoning.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Quiz me on fallacies",
                  "Give me a belt challenge",
                  "What should I work on?",
                  "Evaluate my argument",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="px-3 py-1.5 text-xs bg-dojo-card border border-dojo-border rounded-lg text-dojo-muted hover:border-dojo-accent/40 hover:text-dojo-text transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-dojo-accent/20 text-dojo-text border border-dojo-accent/30"
                    : "bg-dojo-card text-dojo-text border border-dojo-border"
                }`}
              >
                {msg.role === "assistant" && (
                  <span className="text-xs text-dojo-muted block mb-1 font-medium">
                    Sensei
                  </span>
                )}
                {msg.content || (
                  <span className="inline-block w-2 h-4 bg-dojo-accent/60 animate-pulse" />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-dojo-border/50 bg-dojo-bg/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Speak to your sensei..."
              rows={1}
              className="flex-1 bg-dojo-card border border-dojo-border rounded-lg px-4 py-2.5 text-sm text-dojo-text placeholder:text-dojo-muted/50 resize-none focus:outline-none focus:border-dojo-accent/50 transition-colors"
              disabled={isStreaming}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isStreaming || !input.trim()}
              className="px-4 py-2.5 bg-dojo-accent hover:bg-dojo-accent-hover disabled:opacity-40 disabled:hover:bg-dojo-accent text-white rounded-lg text-sm font-medium transition-colors shrink-0"
            >
              {isStreaming ? "..." : "Send"}
            </button>
          </div>
          <p className="text-[10px] text-dojo-muted/40 mt-1.5 text-center">
            Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
