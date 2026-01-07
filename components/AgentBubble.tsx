
import React from 'react';
import { Message, AgentRole } from '../types';
import { AGENTS } from '../constants';

interface AgentBubbleProps {
  message: Message;
}

const AgentBubble: React.FC<AgentBubbleProps> = ({ message }) => {
  const agent = AGENTS[message.agentId];
  const Icon = agent.icon;

  return (
    <div className="flex items-start gap-3 mb-6 animate-in slide-in-from-bottom-2 duration-300">
      <div className={`${agent.color} w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-white/20 flex-shrink-0 text-white`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-sm tracking-tight text-white">{agent.name}</span>
          <span className="text-[10px] text-slate-500 uppercase font-mono">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-none p-4 shadow-xl backdrop-blur-sm">
          <p className="text-slate-100 text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
            {message.status === 'typing' && (
              <span className="inline-flex ml-2 gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentBubble;
