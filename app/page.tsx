"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Bot, User, Sparkles, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const PROJECT_PLANNER_URL = "/project-planner";

const STARTER_PROMPTS = [
  "What services does Odd Shoes offer?",
  "I need a website built from scratch",
  "Tell me about AI & Automation",
  "How do I get started with a project?",
];

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  const handleStarterPrompt = async (prompt: string) => {
    if (isLoading) return;
    await sendMessage({ text: prompt });
  };

  // Extract text content from message parts
  const getMessageText = (
    parts: Array<{ type: string; text?: string }>,
  ): string => {
    return parts
      .filter((part) => part.type === "text" && part.text)
      .map((part) => part.text)
      .join("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight text-gray-900">
                Odd Shoes
              </h1>
              <p className="text-xs text-gray-500">Digital Agency Assistant</p>
            </div>
          </div>
          <a
            href={PROJECT_PLANNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 sm:flex"
          >
            Project Planner
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {messages.length === 0 ? (
            /* Welcome State */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                Welcome to Odd Shoes
              </h2>
              <p className="mb-8 max-w-md text-gray-500">
                We help Christian founders, ministries, and faith-driven
                businesses build powerful digital experiences. How can we serve
                you today?
              </p>
              <div className="grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleStarterPrompt(prompt)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message List */
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      message.role === "user"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gray-900 text-white"
                        : "border border-gray-200 bg-white text-gray-800"
                    }`}
                  >
                    {message.role === "user" ? (
                      <p className="text-sm leading-relaxed">
                        {getMessageText(message.parts)}
                      </p>
                    ) : (
                      <div className="prose prose-sm prose-gray max-w-none prose-p:leading-relaxed prose-a:text-gray-900 prose-a:underline">
                        <ReactMarkdown>
                          {getMessageText(message.parts)}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading &&
                messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Bottom Bar: CTA + Input */}
      <footer className="sticky bottom-0 border-t border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 pb-4 pt-3">
          {/* Mobile CTA */}
          <a
            href={PROJECT_PLANNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:hidden"
          >
            <Sparkles className="h-4 w-4" />
            Start Your Project — Fill Out the Planner
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400 focus:bg-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition-colors hover:bg-gray-700 disabled:opacity-40 disabled:hover:bg-gray-900"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-2 text-center text-xs text-gray-400">
            Odd Shoes Digital Agency · Built with excellence, driven by purpose
          </p>
        </div>
      </footer>
    </div>
  );
}
