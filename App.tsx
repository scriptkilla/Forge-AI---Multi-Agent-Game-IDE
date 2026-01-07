
import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Play, 
  Code2, 
  Terminal, 
  Layout, 
  Users, 
  RotateCcw, 
  Sparkles,
  ChevronRight,
  Maximize2,
  Cpu,
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Upload,
  Music,
  Image as ImageIcon,
  Volume2,
  Box,
  Check,
  XCircle,
  Bug,
  Brain,
  Gauge,
  FlaskConical,
  Hammer,
  ShieldCheck,
  Database,
  Globe,
  FileUp,
  ImagePlus,
  MousePointer2,
  Download,
  Share2,
  Palette as PaletteIcon,
  Columns,
  Layers as LayersIcon,
  Cuboid,
  PackagePlus,
  Trash2
} from 'lucide-react';
import { Message, GameProject, AgentRole, GameTheme, GamePerspective, Asset, ReferenceImage } from './types';
import { AGENTS, DEFAULT_PROMPT, THEMES, MOCK_ASSETS } from './constants';
import { generateAgentComment, generateGameCode, generateBrainstormingBatch } from './services/geminiService';
import AgentBubble from './components/AgentBubble';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [messages, setMessages] = useState<Message[]>([]);
  const [project, setProject] = useState<GameProject>({
    prompt: '',
    status: 'idle',
    code: '',
    designDocs: '',
    theme: 'default',
    perspective: '2d-side',
    assets: []
  });
  const [activeTab, setActiveTab] = useState<'chat' | 'code' | 'play' | 'store'>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [assetSearch, setAssetSearch] = useState('');
  const [sidebarAssetSearch, setSidebarAssetSearch] = useState('');
  const [assetFilter, setAssetFilter] = useState<string>('all');
  const [synthesisProgress, setSynthesisProgress] = useState(0);
  
  // Asset Store Extensions
  const [customAssets, setCustomAssets] = useState<Asset[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newAssetData, setNewAssetData] = useState<{
    name: string;
    category: 'sprite' | 'sound' | 'music' | 'ui';
    data: string;
    type: string;
  }>({ name: '', category: 'sprite', data: '', type: '' });

  const scrollRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const assetStoreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (activeTab === 'play' && iframeRef.current) {
      const focusIframe = () => {
        iframeRef.current?.focus();
      };
      const timer = setTimeout(focusIframe, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab, project.code]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setProject(prev => ({
          ...prev,
          referenceImage: {
            data: base64String,
            mimeType: file.type
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoreAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setNewAssetData(prev => ({
          ...prev,
          name: file.name.split('.')[0],
          data: base64String,
          type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
        }));
        setIsUploadModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const finalizeAssetUpload = () => {
    if (!newAssetData.name || !newAssetData.data) return;

    const newAsset: Asset = {
      id: Math.random().toString(36).substr(2, 9),
      name: newAssetData.name,
      category: newAssetData.category,
      type: newAssetData.type,
      author: 'LocalUser',
      thumbnail: newAssetData.category === 'sprite' ? '🎨' : newAssetData.category === 'music' ? '🎵' : newAssetData.category === 'sound' ? '🔊' : '🧊',
      data: newAssetData.data
    };

    setCustomAssets(prev => [newAsset, ...prev]);
    setIsUploadModalOpen(false);
    setNewAssetData({ name: '', category: 'sprite', data: '', type: '' });
    if (assetStoreInputRef.current) assetStoreInputRef.current.value = '';
  };

  const removeReference = () => {
    setProject(prev => ({ ...prev, referenceImage: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addMessage = (agentId: AgentRole, text: string, status: 'typing' | 'complete' = 'complete') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      agentId,
      text,
      timestamp: Date.now(),
      status
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }

  const updateMessage = (id: string, text: string, status: 'complete') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, text, status } : m));
  }

  const startCreation = async () => {
    if (!prompt.trim() || project.status !== 'idle') return;

    setMessages([]);
    setSynthesisProgress(0);
    setProject(prev => ({ ...prev, prompt, status: 'discussing', code: '', designDocs: '' }));
    setActiveTab('chat');

    const refImg = project.referenceImage;
    const currentHistory: Message[] = [];

    const callBatch = async (roles: AgentRole[], contextDesc: string, progress: number) => {
      // 1. Show all agents as typing to imply parallel brainstorming
      const msgIds = roles.map(r => addMessage(r, '', 'typing'));
      
      // 2. Perform a SINGLE API call for the whole group (saves quota!)
      const results = await generateBrainstormingBatch(roles, prompt, contextDesc, currentHistory, refImg);
      
      // 3. Stagger the reveals for visual feedback
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        const res = results.find(r => r.agentId === role) || { agentId: role, text: "Collaborating with the array..." };
        
        updateMessage(msgIds[i], res.text, 'complete');
        currentHistory.push({ id: msgIds[i], agentId: role, text: res.text, timestamp: Date.now(), status: 'complete' });
        
        await new Promise(r => setTimeout(r, 800)); // Short pause between agents for readability
      }
      
      setSynthesisProgress(progress);
    };

    try {
      // PHASE 1: VISION & STRATEGY
      await callBatch(['ceo', 'design', 'technical'], "Establishing core vision, technical constraints, and fundamental mechanics.", 20);
      
      // PHASE 2: WORLD & CHARACTER
      await callBatch(['narrative', 'art', 'level', 'character'], "Building the world lore, visual style, and entity profiles.", 40);

      // PHASE 3: SYSTEMS & BEHAVIOR
      await callBatch(['ui_ux', 'ai_behavior', 'economy'], "Defining interface flow, NPC intelligence, and gameplay balance.", 60);

      setProject(prev => ({ ...prev, status: 'developing' }));
      
      // PHASE 4: POLISH & AUDIO
      await callBatch(['particle', 'composer', 'shader'], "Finalizing audiovisual feedback and environmental effects.", 80);

      // PHASE 5: THE BUILD (Lead Dev)
      const devMsgId = addMessage('dev', 'Lead Developer: Fusing all neural inputs into the final executable artifact...', 'typing');
      const combinedDocs = currentHistory.map(m => `${AGENTS[m.agentId]?.name}: ${m.text}`).join('\n');
      const generatedCode = await generateGameCode(prompt, combinedDocs, project.theme, project.perspective, project.assets, refImg);
      updateMessage(devMsgId, 'Artifact Synthesis Complete. Source binary emitted and ready for testing.', 'complete');
      setProject(prev => ({ ...prev, code: generatedCode }));
      setSynthesisProgress(90);

      setProject(prev => ({ ...prev, status: 'testing' }));
      
      // PHASE 6: QA
      await callBatch(['debugger', 'qa'], "Final validation, bug detection, and theme compliance certification.", 100);

      await new Promise(r => setTimeout(r, 800));

      addMessage('ceo', 'Project Objective REACHED. Artifact successfully deployed to the runtime environment.');
      setProject(prev => ({ ...prev, status: 'ready' }));
      setActiveTab('play');

    } catch (error: any) {
      console.error(error);
      const errorMsg = error?.message || "Unknown neural link failure.";
      addMessage('ceo', `CRITICAL ERROR: ${errorMsg}. Synthesis halted. Please reset link.`);
      setProject(prev => ({ ...prev, status: 'idle' }));
      setSynthesisProgress(0);
    }
  };

  const toggleAsset = (asset: Asset) => {
    setProject(prev => {
      const exists = prev.assets.find(a => a.id === asset.id);
      if (exists) {
        return { ...prev, assets: prev.assets.filter(a => a.id !== asset.id) };
      } else {
        return { ...prev, assets: [...prev.assets, asset] };
      }
    });
  };

  const allAssets = [...MOCK_ASSETS, ...customAssets];
  
  const filteredAssets = allAssets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(assetSearch.toLowerCase());
    const matchesFilter = assetFilter === 'all' || a.category === assetFilter;
    return matchesSearch && matchesFilter;
  });

  const sidebarSearchResults = sidebarAssetSearch.trim() === '' 
    ? [] 
    : allAssets.filter(a => 
        a.name.toLowerCase().includes(sidebarAssetSearch.toLowerCase()) && 
        !project.assets.find(p => p.id === a.id)
      ).slice(0, 5);

  const getAssetIcon = (category: string) => {
    switch (category) {
      case 'sprite': return <ImageIcon size={14} />;
      case 'music': return <Music size={14} />;
      case 'sound': return <Volume2 size={14} />;
      case 'ui': return <Box size={14} />;
      default: return <Box size={14} />;
    }
  };

  const downloadAsset = (asset: Asset) => {
    if (asset.data) {
      const link = document.createElement('a');
      link.href = `data:application/octet-stream;base64,${asset.data}`;
      link.download = `${asset.name}.${asset.type.toLowerCase()}`;
      link.click();
    } else {
      alert(`Asset download simulated for: ${asset.name}`);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-20'} transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shadow-2xl overflow-hidden`}>
        <div className="p-4 flex items-center gap-3 border-b border-slate-800 h-16 shrink-0">
          <div className="bg-blue-600 p-2 rounded-xl shrink-0 shadow-lg shadow-blue-600/20">
            <Cpu size={24} className="text-white" />
          </div>
          {isSidebarOpen && (
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-white truncate">Forge AI</h1>
              <p className="text-[10px] text-blue-400 font-mono tracking-tighter uppercase">v3.5 Multi-Agent</p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-hide space-y-6">
          {isSidebarOpen ? (
            <>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                  <PaletteIcon size={12} />
                  Visual Aesthetic
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setProject(prev => ({ ...prev, theme: t.id }))}
                      disabled={project.status !== 'idle'}
                      className={`group p-3 rounded-xl text-left transition-all border ${
                        project.theme === t.id 
                          ? 'border-blue-500 bg-blue-500/10 shadow-inner' 
                          : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[11px] font-black uppercase tracking-tight ${project.theme === t.id ? 'text-blue-400' : 'text-slate-400'}`}>
                          {t.name}
                        </span>
                        <div className="flex gap-1">
                          {t.palette.map((color, idx) => (
                            <div 
                              key={idx} 
                              className="w-2.5 h-2.5 rounded-full border border-white/10" 
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight group-hover:text-slate-400 transition-colors">
                        {t.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                  <Maximize2 size={12} />
                  Camera Perspective
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setProject(prev => ({ ...prev, perspective: '2d-side' }))}
                    disabled={project.status !== 'idle'}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${project.perspective === '2d-side' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'}`}
                  >
                    <Columns size={16} />
                    <span className="text-[11px] font-black uppercase">2D Side Scrolling</span>
                  </button>
                  <button
                    onClick={() => setProject(prev => ({ ...prev, perspective: '2d-top' }))}
                    disabled={project.status !== 'idle'}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${project.perspective === '2d-top' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'}`}
                  >
                    <LayersIcon size={16} />
                    <span className="text-[11px] font-black uppercase">2D Top-Down</span>
                  </button>
                  <button
                    onClick={() => setProject(prev => ({ ...prev, perspective: '3d-open' }))}
                    disabled={project.status !== 'idle'}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${project.perspective === '3d-open' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'}`}
                  >
                    <Cuboid size={16} />
                    <span className="text-[11px] font-black uppercase">3D Open World</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <ShoppingBag size={12} />
                  Asset Registry
                </label>
                
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={sidebarAssetSearch}
                    onChange={(e) => setSidebarAssetSearch(e.target.value)}
                    placeholder="Search for assets..."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-[11px] font-medium outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                  />
                  {sidebarSearchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden z-30 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-200">
                      {sidebarSearchResults.map(a => (
                        <button
                          key={a.id}
                          onClick={() => {
                            toggleAsset(a);
                            setSidebarAssetSearch('');
                          }}
                          className="w-full px-3 py-2 flex items-center gap-3 hover:bg-slate-700 text-left transition-colors border-b border-slate-700 last:border-0"
                        >
                          <span className="text-sm shrink-0">{a.thumbnail}</span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-slate-200 truncate leading-tight">{a.name}</p>
                            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">{a.category}</p>
                          </div>
                          <Plus size={12} className="text-blue-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-hide pr-1">
                  {project.assets.length === 0 ? (
                    <div className="py-4 text-center border border-slate-800 border-dashed rounded-xl">
                      <p className="text-[10px] text-slate-600 font-bold uppercase">No units deployed</p>
                    </div>
                  ) : (
                    project.assets.map(asset => (
                      <div key={asset.id} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg p-2 group hover:border-slate-600 transition-colors">
                        <span className="text-xs shrink-0">{asset.thumbnail}</span>
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-bold text-slate-300 truncate tracking-tight">{asset.name}</p>
                        </div>
                        <button 
                          onClick={() => toggleAsset(asset)}
                          className="text-slate-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <button 
                  onClick={() => setActiveTab('store')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase tracking-tighter text-slate-400 rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-2 shadow-inner"
                >
                  <PackagePlus size={14} />
                  Open Global Store
                </button>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Objective Directive</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={project.status !== 'idle'}
                  className="w-full h-20 bg-slate-950/50 border border-slate-700/50 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none disabled:opacity-50 font-medium"
                  placeholder="Describe your game vision..."
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Visual Reference</label>
                {!project.referenceImage ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={project.status !== 'idle'}
                    className="w-full py-4 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-all group active:scale-95 disabled:opacity-50"
                  >
                    <ImagePlus size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Upload Ref (Img/File)</span>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-blue-500/30 group">
                    <img 
                      src={`data:${project.referenceImage.mimeType};base64,${project.referenceImage.data}`} 
                      alt="Reference" 
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={removeReference}
                        className="bg-red-500 text-white p-1.5 rounded-lg shadow-lg hover:scale-110 transition-transform"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*,.pdf,.doc,.docx" 
                  onChange={handleFileUpload} 
                />
              </div>

              <button
                onClick={startCreation}
                disabled={project.status !== 'idle' || !prompt.trim()}
                className="w-full py-3 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 group"
              >
                {project.status === 'idle' ? (
                  <>
                    <Zap size={16} className="group-hover:text-yellow-400 transition-colors" />
                    <span>Deploy 24 Agents</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="capitalize">{project.status}...</span>
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-slate-800 pb-10">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 block">Neural Array</label>
                <div className="grid grid-cols-6 gap-2">
                  {Object.values(AGENTS).map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <div 
                        key={agent.id} 
                        title={`${agent.name}: ${agent.description}`}
                        className={`${agent.color} w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md transition-all hover:scale-110 cursor-help opacity-60 hover:opacity-100 border border-white/10`}
                      >
                        <Icon size={16} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-2">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-500 hover:text-white bg-slate-800 rounded-lg transition-colors">
                <ChevronRight size={18} />
              </button>
              <div className="w-full space-y-2 px-2">
                {Object.values(AGENTS).slice(0, 10).map(a => {
                  const Icon = a.icon;
                  return (
                    <div key={a.id} className={`${a.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md border border-white/10`}>
                      <Icon size={20} />
                    </div>
                  );
                })}
                <div className="text-[10px] text-slate-600 font-bold text-center">+14</div>
              </div>
            </div>
          )}
        </div>

        {isSidebarOpen && project.status !== 'idle' && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
            <div className="mb-4">
              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-1">
                <span>Sync Progress</span>
                <span>{synthesisProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  style={{ width: `${synthesisProgress}%` }}
                />
              </div>
            </div>
            <button 
              onClick={() => {
                setProject({ prompt: '', status: 'idle', code: '', designDocs: '', theme: 'default', perspective: '2d-side', assets: [] });
                setMessages([]);
                setActiveTab('chat');
                setSynthesisProgress(0);
              }}
              className="w-full py-2 flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/5 border border-transparent hover:border-red-400/20"
            >
              <RotateCcw size={14} />
              Abort Link
            </button>
          </div>
        )}
      </aside>

      <main className="flex-1 flex flex-col relative bg-[#020617] overflow-hidden">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-xl z-10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 shadow-inner backdrop-blur-md">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'chat' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Users size={14} />
                Sync Log
              </button>
              <button
                onClick={() => setActiveTab('store')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'store' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <ShoppingBag size={14} />
                Asset Store
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'code' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Code2 size={14} />
                Artifacts
              </button>
              <button
                onClick={() => setActiveTab('play')}
                disabled={!project.code}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'play' ? 'bg-emerald-600/20 text-emerald-400 shadow-lg' : 'text-slate-400 hover:text-slate-200 disabled:opacity-30'}`}
              >
                <Play size={14} />
                Environment
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-[11px] font-mono font-bold">
            <div className="flex items-center gap-2 text-blue-400">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
              <span>SYNTH_LINK: <span className="text-white">STABLE</span></span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
              <span>NEURAL_ARRAY: <span className="text-white">24 UNITS</span></span>
            </div>
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden bg-slate-950">
          {activeTab === 'chat' && (
            <div ref={scrollRef} className="absolute inset-0 overflow-y-auto p-8 space-y-4 scroll-smooth">
              <div className="max-w-3xl mx-auto pb-24">
                {messages.length === 0 ? (
                  <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-8">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-blue-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <div className="relative p-10 bg-slate-900 border border-slate-800 rounded-full shadow-2xl">
                        <Sparkles size={80} className="text-blue-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-4xl font-extrabold text-white tracking-tighter">Forge AI IDE</h2>
                      <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed font-medium">
                        Deployment of 24 specialized neural agents collaborating to synthesize artifacts from multimodal directives.
                      </p>
                    </div>
                    <div className="flex gap-4">
                       <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-500">
                         MULTIMODAL SYNTHESIS
                       </div>
                       <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-500">
                         VISUAL OCR ACTIVE
                       </div>
                    </div>
                  </div>
                ) : (
                  messages.map(msg => <AgentBubble key={msg.id} message={msg} />)
                )}
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="absolute inset-0 bg-slate-950 p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-8">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Global Asset Repository</h2>
                    <p className="text-slate-400 text-sm font-medium">Contribute to and deploy high-fidelity binary assets from the decentralized store.</p>
                  </div>
                  <button 
                    onClick={() => assetStoreInputRef.current?.click()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95 shrink-0"
                  >
                    <Upload size={16} />
                    Upload To Repository
                  </button>
                  <input type="file" ref={assetStoreInputRef} className="hidden" onChange={handleStoreAssetUpload} />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search binary index (sprites, vfx, sfx, music)..."
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none backdrop-blur-sm transition-all font-medium"
                      value={assetSearch}
                      onChange={(e) => setAssetSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1.5 shrink-0 shadow-inner">
                    {['all', 'sprite', 'music', 'sound', 'ui'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setAssetFilter(cat)}
                        className={`px-5 py-2 rounded-lg text-xs font-black capitalize transition-all ${assetFilter === cat ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredAssets.length === 0 ? (
                  <div className="py-32 text-center">
                    <Search size={48} className="mx-auto text-slate-800 mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No assets found in global index</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                    {filteredAssets.map(asset => {
                      const isSelected = !!project.assets.find(a => a.id === asset.id);
                      return (
                        <div 
                          key={asset.id} 
                          className={`group p-5 bg-slate-900/40 border-2 rounded-3xl transition-all hover:translate-y-[-4px] backdrop-blur-sm ${isSelected ? 'border-blue-500 shadow-2xl shadow-blue-500/20 bg-blue-500/5' : 'border-slate-800 hover:border-slate-700'}`}
                        >
                          <div className="aspect-square rounded-2xl bg-slate-800/80 flex items-center justify-center text-5xl mb-4 relative overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform">
                             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                             {asset.thumbnail}
                             <div className="absolute top-3 right-3 bg-slate-950/90 px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1.5 border border-slate-800">
                               {getAssetIcon(asset.category)}
                               <span className="uppercase tracking-tighter">{asset.category}</span>
                             </div>
                             <div className="absolute bottom-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); downloadAsset(asset); }}
                                  className="p-1.5 bg-slate-900/90 text-slate-300 hover:text-white rounded-lg border border-slate-700" title="Download Binary"
                                >
                                  <Download size={14} />
                                </button>
                                <button 
                                  className="p-1.5 bg-slate-900/90 text-slate-300 hover:text-white rounded-lg border border-slate-700" title="Share ID"
                                >
                                  <Share2 size={14} />
                                </button>
                             </div>
                          </div>
                          <div className="mb-5 px-1">
                            <h3 className="font-black text-base text-white truncate">{asset.name}</h3>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase mt-1">
                              <span>{asset.type}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                              <span>{asset.author}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => toggleAsset(asset)}
                            className={`w-full py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                              isSelected 
                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
                                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/10'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <XCircle size={16} />
                                Eject Unit
                              </>
                            ) : (
                              <>
                                <Plus size={16} />
                                Deploy Asset
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Upload Modal */}
              {isUploadModalOpen && (
                <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                  <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                    <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Register New Asset</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Asset Name</label>
                        <input 
                          type="text" 
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={newAssetData.name}
                          onChange={(e) => setNewAssetData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Project X Sprite..."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Classification</label>
                        <div className="grid grid-cols-2 gap-2">
                          {(['sprite', 'sound', 'music', 'ui'] as const).map(cat => (
                            <button
                              key={cat}
                              onClick={() => setNewAssetData(prev => ({ ...prev, category: cat }))}
                              className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all border ${
                                newAssetData.category === cat 
                                  ? 'bg-blue-600 border-blue-500 text-white' 
                                  : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 flex gap-3">
                        <button 
                          onClick={() => setIsUploadModalOpen(false)}
                          className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-black transition-all"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={finalizeAssetUpload}
                          className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black transition-all shadow-lg shadow-blue-600/20"
                        >
                          Publish Binary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="absolute inset-0 bg-[#0d1117] p-8 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <Terminal size={14} /> Artifact Binary Source
                 </h3>
                 {project.code && (
                   <button 
                     onClick={() => {
                        const blob = new Blob([project.code], {type: 'text/html'});
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'artifact.html';
                        a.click();
                     }}
                     className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase border border-blue-400/20 px-3 py-1 rounded-lg"
                   >
                     Download HTML
                   </button>
                 )}
              </div>
              <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-slate-950 p-8 font-mono text-sm leading-relaxed text-blue-300 whitespace-pre shadow-2xl">
                {project.code || "// [SYSTEM]: Pipeline awaiting synthesis trigger. No artifact emitted."}
              </div>
            </div>
          )}

          {activeTab === 'play' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-950">
              {project.code ? (
                <div className="w-full h-full max-w-6xl rounded-3xl overflow-hidden border border-slate-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col bg-slate-900 group">
                  <div className="h-10 bg-slate-800 flex items-center justify-between px-4 border-b border-slate-700 shrink-0">
                    <div className="flex gap-1.5">
                       <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 tracking-tighter uppercase flex items-center gap-2">
                       <MousePointer2 size={10} className="animate-pulse" />
                       Artifact Runtime Env
                    </div>
                    <button 
                      onClick={() => { if(iframeRef.current) iframeRef.current.srcdoc = project.code; }}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Reset Buffer"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                  <div className="relative flex-1 bg-black">
                    <iframe
                      ref={iframeRef}
                      title="AI Game Preview"
                      srcDoc={project.code}
                      className="w-full h-full border-none outline-none"
                      sandbox="allow-scripts allow-same-origin allow-pointer-lock"
                      tabIndex={0}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="p-8 bg-slate-900 border border-slate-800 rounded-full shadow-2xl relative inline-block">
                    <RotateCcw className="mx-auto text-slate-700 animate-spin-slow" size={48} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-300 text-lg font-black tracking-tight uppercase">Null Buffer Detected</p>
                    <p className="text-slate-500 text-xs font-mono max-w-xs mx-auto">DEPLOY NEURAL UNITS TO SYNTHESIZE EXECUTABLE PAYLOAD.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        iframe:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default App;
