
import { 
  Briefcase, 
  BookOpen, 
  Map as MapIcon, 
  User, 
  Scale, 
  Box, 
  Activity, 
  Layout, 
  Music, 
  Sparkles, 
  Settings, 
  Code, 
  Bug, 
  Zap, 
  Layers, 
  Brain, 
  FlaskConical, 
  Shield, 
  Globe, 
  Database, 
  Palette, 
  PenTool, 
  Terminal, 
  CheckCircle 
} from 'lucide-react';
import { Agent, Asset, GameTheme } from './types';

export const AGENTS: Record<string, Agent> = {
  ceo: { 
    id: 'ceo', 
    name: 'CEO Agent', 
    color: 'bg-purple-600', 
    icon: Briefcase,
    description: 'Visionary leader setting project goals and direction.'
  },
  narrative: {
    id: 'narrative', 
    name: 'Narrative Generator', 
    color: 'bg-indigo-500', 
    icon: BookOpen,
    description: 'Creates stories, dialogues, and immersive quest lines.'
  },
  level: {
    id: 'level', 
    name: 'Level Design Assistant', 
    color: 'bg-teal-500', 
    icon: MapIcon,
    description: 'Generates layouts, challenges, and world progression.'
  },
  character: {
    id: 'character', 
    name: 'Character Designer', 
    color: 'bg-rose-500', 
    icon: User,
    description: 'Generates concepts, stats, and unique abilities.'
  },
  economy: {
    id: 'economy', 
    name: 'Economy Balancer', 
    color: 'bg-amber-600', 
    icon: Scale,
    description: 'Tunes loot drops, progression costs, and rewards.'
  },
  asset_gen: {
    id: 'asset_gen', 
    name: '2D/3D Asset Generator', 
    color: 'bg-cyan-600', 
    icon: Box,
    description: 'Creates sprites, 3D models, and high-quality textures.'
  },
  animator: {
    id: 'animator', 
    name: 'Animation Assistant', 
    color: 'bg-orange-500', 
    icon: Activity,
    description: 'Handles rigging, sprite sheets, and fluid motion.'
  },
  ui_ux: {
    id: 'ui_ux', 
    name: 'UI/UX Design Helper', 
    color: 'bg-violet-500', 
    icon: Layout,
    description: 'Generates interface layouts, HUDs, and navigation.'
  },
  composer: {
    id: 'composer', 
    name: 'Sound & Music Composer', 
    color: 'bg-blue-500', 
    icon: Music,
    description: 'Creates audio assets and adaptive music scores.'
  },
  particle: {
    id: 'particle', 
    name: 'Particle Effect Designer', 
    color: 'bg-yellow-500', 
    icon: Sparkles,
    description: 'Creates particle systems and environmental effects.'
  },
  technical: {
    id: 'technical', 
    name: 'Technical Architect', 
    color: 'bg-slate-600', 
    icon: Settings,
    description: 'Designs systems, data structures, and optimized pipelines.'
  },
  code_gen: {
    id: 'code_gen', 
    name: 'Code Generator', 
    color: 'bg-sky-500', 
    icon: Code,
    description: 'Generates specialized scripts for game functions.'
  },
  debugger: {
    id: 'debugger', 
    name: 'Bug Detector & Fixer', 
    color: 'bg-red-500', 
    icon: Bug,
    description: 'Identifies and patches logical errors and runtime bugs.'
  },
  optimizer: {
    id: 'optimizer', 
    name: 'Performance Optimizer', 
    color: 'bg-green-500', 
    icon: Zap,
    description: 'Refactors code for speed and memory efficiency.'
  },
  shader: {
    id: 'shader', 
    name: 'Shader/Visual Effects Coder', 
    color: 'bg-fuchsia-600', 
    icon: Layers,
    description: 'Generates custom shaders and GPU visual effects.'
  },
  ai_behavior: {
    id: 'ai_behavior', 
    name: 'AI Behavior Designer', 
    color: 'bg-indigo-600', 
    icon: Brain,
    description: 'Creates NPC behaviors and complex state machines.'
  },
  tester: {
    id: 'tester', 
    name: 'Testing Agent', 
    color: 'bg-zinc-500', 
    icon: FlaskConical,
    description: 'Performs automated stress and integration testing.'
  },
  security: {
    id: 'security',
    name: 'Security Auditor',
    color: 'bg-red-900',
    icon: Shield,
    description: 'Audits generated logic for vulnerabilities and exploits.'
  },
  network: {
    id: 'network',
    name: 'Network Engineer',
    color: 'bg-blue-900',
    icon: Globe,
    description: 'Optimizes event-driven communication and state sync.'
  },
  database: {
    id: 'database',
    name: 'Database Architect',
    color: 'bg-cyan-900',
    icon: Database,
    description: 'Designs state persistence and local data storage.'
  },
  art: { 
    id: 'art', 
    name: 'Art Director', 
    color: 'bg-pink-600', 
    icon: Palette,
    description: 'Defines visual style, color palettes, and global aesthetic.'
  },
  design: { 
    id: 'design', 
    name: 'Game Designer', 
    color: 'bg-blue-600', 
    icon: PenTool,
    description: 'Specializes in mechanics, core loops, and UX.'
  },
  dev: { 
    id: 'dev', 
    name: 'Lead Developer', 
    color: 'bg-emerald-600', 
    icon: Terminal,
    description: 'Writes clean, efficient, and functional game code.'
  },
  qa: { 
    id: 'qa', 
    name: 'QA Engineer', 
    color: 'bg-orange-600', 
    icon: CheckCircle,
    description: 'Tests for bugs and ensures high quality gameplay.'
  }
};

export const DEFAULT_PROMPT = "A space-themed infinite runner where you dodge asteroids and collect neon crystals.";

export interface ThemeDef {
  id: GameTheme;
  name: string;
  palette: string[];
  description: string;
  cssInspiration: string;
}

export const THEMES: ThemeDef[] = [
  { 
    id: 'default', 
    name: 'Default', 
    palette: ['#1e293b', '#3b82f6', '#f8fafc', '#64748b'], 
    description: 'Clean, modern, and professional aesthetic.',
    cssInspiration: 'Slate and Blue based UI with rounded corners.'
  },
  { 
    id: 'sci-fi', 
    name: 'Sci-Fi', 
    palette: ['#000000', '#00f2ff', '#7000ff', '#ffffff'], 
    description: 'High-tech neon, holograms, and deep space.',
    cssInspiration: 'Glowing borders, scanline effects, and cyan-magenta gradients.'
  },
  { 
    id: 'fantasy', 
    name: 'Fantasy', 
    palette: ['#2d1a12', '#d4af37', '#8b4513', '#fdf5e6'], 
    description: 'Medieval magic, parchment, and golden glows.',
    cssInspiration: 'Ornate borders, serif fonts, and warm torchlight effects.'
  },
  { 
    id: 'horror', 
    name: 'Horror', 
    palette: ['#0a0a0a', '#8b0000', '#2f4f4f', '#dcdcdc'], 
    description: 'Suspenseful, dark, and gritty.',
    cssInspiration: 'Heavy vignettes, flickering lights, and blood-red accents.'
  },
  { 
    id: 'retro', 
    name: 'Retro', 
    palette: ['#000000', '#00ff00', '#ff00ff', '#ffff00'], 
    description: '8-bit arcade, vibrant and blocky.',
    cssInspiration: 'Pixelated styles, high contrast primary colors, and CRT distortion.'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    palette: ['#050505', '#fcee0a', '#00ff9f', '#ff003c'], 
    description: 'High tech, low life. Gritty urban neon.',
    cssInspiration: 'Aggressive yellow and pink, glitch effects, and tech-noir vibes.'
  },
  { 
    id: 'vaporwave', 
    name: 'Vaporwave', 
    palette: ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff'], 
    description: '90s nostalgia, pastel glitches, and sunsets.',
    cssInspiration: 'Pink/Blue gradients, lo-fi aesthetics, and surreal layouts.'
  },
  { 
    id: 'minimalist', 
    name: 'Minimal', 
    palette: ['#ffffff', '#000000', '#f0f0f0', '#808080'], 
    description: 'Zen-like simplicity and stark contrast.',
    cssInspiration: 'Zero border-radius, thin lines, and pure monochrome.'
  }
];

export const MOCK_ASSETS: Asset[] = [
  // Original Sprites
  { id: '1', name: 'Cyberpunk Drone', category: 'sprite', type: 'PNG', author: 'NeonArtist', thumbnail: '🛸' },
  { id: '4', name: 'Crystal Knight', category: 'sprite', type: 'PNG', author: 'PixelPaladin', thumbnail: '🛡️' },
  { id: '8', name: 'Slime Enemy', category: 'sprite', type: 'PNG', author: 'MonsterMaker', thumbnail: '🧪' },
  { id: 's9', name: 'Space Asteroid', category: 'sprite', type: 'PNG', author: 'CosmicDev', thumbnail: '🪨' },
  { id: 's10', name: 'Fire Elemental', category: 'sprite', type: 'PNG', author: 'MageArt', thumbnail: '🔥' },
  { id: 's11', name: 'Robo-Dog', category: 'sprite', type: 'PNG', author: 'Techie', thumbnail: '🤖' },
  { id: 's12', name: 'Treasure Chest', category: 'sprite', type: 'PNG', author: 'LootMaster', thumbnail: '🪙' },
  { id: 's13', name: 'Old Wizard', category: 'sprite', type: 'PNG', author: 'Enchanter', thumbnail: '🧙' },
  { id: 's14', name: 'Ghost King', category: 'sprite', type: 'PNG', author: 'SpookyDesign', thumbnail: '👻' },
  { id: 's15', name: 'Healing Potion', category: 'sprite', type: 'PNG', author: 'Alchemist', thumbnail: '🧪' },
  { id: 's16', name: 'Retro Coin', category: 'sprite', type: 'PNG', author: '8BitGuy', thumbnail: '🟡' },
  { id: 's17', name: 'Zombie Hand', category: 'sprite', type: 'PNG', author: 'GraveDigger', thumbnail: '🧟' },
  { id: 's18', name: 'Plasma Rifle', category: 'sprite', type: 'PNG', author: 'WeaponSmith', thumbnail: '🔫' },

  // --- 50 NEW CHARACTER ASSETS ---
  { id: 'char501', name: 'Fire Knight', category: 'sprite', type: 'PNG', author: 'LegendArt', thumbnail: '⚔️' },
  { id: 'char502', name: 'Frost Archer', category: 'sprite', type: 'PNG', author: 'LegendArt', thumbnail: '🏹' },
  { id: 'char503', name: 'Storm Mage', category: 'sprite', type: 'PNG', author: 'ArcaneStudio', thumbnail: '🧙‍♂️' },
  { id: 'char504', name: 'Shadow Rogue', category: 'sprite', type: 'PNG', author: 'StealthPixels', thumbnail: '👤' },
  { id: 'char505', name: 'Earth Golem', category: 'sprite', type: 'PNG', author: 'RockBuilder', thumbnail: '🗿' },
  { id: 'char506', name: 'Solar Cleric', category: 'sprite', type: 'PNG', author: 'HolyArt', thumbnail: '☀️' },
  { id: 'char507', name: 'Lunar Assassin', category: 'sprite', type: 'PNG', author: 'NightBlade', thumbnail: '🌙' },
  { id: 'char508', name: 'Galactic Pilot', category: 'sprite', type: 'PNG', author: 'SpaceForge', thumbnail: '👨‍🚀' },
  { id: 'char509', name: 'Deep Sea Diver', category: 'sprite', type: 'PNG', author: 'OceanicArt', thumbnail: '🤿' },
  { id: 'char510', name: 'Jungle Explorer', category: 'sprite', type: 'PNG', author: 'WildernessPixels', thumbnail: '🤠' },
  { id: 'char511', name: 'Desert Nomad', category: 'sprite', type: 'PNG', author: 'SandDunes', thumbnail: '🐪' },
  { id: 'char512', name: 'Mountain Climber', category: 'sprite', type: 'PNG', author: 'PeakDesigns', thumbnail: '🧗' },
  { id: 'char513', name: 'Arctic Scientist', category: 'sprite', type: 'PNG', author: 'FrozenLab', thumbnail: '🥼' },
  { id: 'char514', name: 'Cyber Hacker', category: 'sprite', type: 'PNG', author: 'NeonGrid', thumbnail: '💻' },
  { id: 'char515', name: 'Neon Samurai', category: 'sprite', type: 'PNG', author: 'SynthBlade', thumbnail: '👘' },
  { id: 'char516', name: 'Steampunk Aviator', category: 'sprite', type: 'PNG', author: 'GearsAndSteam', thumbnail: '👨‍✈️' },
  { id: 'char517', name: 'Clockwork Automaton', category: 'sprite', type: 'PNG', author: 'TinkerBot', thumbnail: '⚙️' },
  { id: 'char518', name: 'Plague Doctor', category: 'sprite', type: 'PNG', author: 'DarkVisions', thumbnail: '👺' },
  { id: 'char519', name: 'Bone Stalker', category: 'sprite', type: 'PNG', author: 'GravePixels', thumbnail: '💀' },
  { id: 'char520', name: 'Spectral Wraith', category: 'sprite', type: 'PNG', author: 'GhostlyArt', thumbnail: '👻' },
  { id: 'char521', name: 'Void Walker', category: 'sprite', type: 'PNG', author: 'AbyssStudio', thumbnail: '🌌' },
  { id: 'char522', name: 'Star Child', category: 'sprite', type: 'PNG', author: 'CosmicDream', thumbnail: '🌟' },
  { id: 'char523', name: 'Phoenix Rebirth', category: 'sprite', type: 'PNG', author: 'FlameWings', thumbnail: '🐦' },
  { id: 'char524', name: 'Elder Dragon', category: 'sprite', type: 'PNG', author: 'WyvernForge', thumbnail: '🐲' },
  { id: 'char525', name: 'Baby Gryphon', category: 'sprite', type: 'PNG', author: 'FeatheredBeasts', thumbnail: '🦅' },
  { id: 'char526', name: 'Forest Nymph', category: 'sprite', type: 'PNG', author: 'NatureSfx', thumbnail: '🧚‍♀️' },
  { id: 'char527', name: 'Mountain Giant', category: 'sprite', type: 'PNG', author: 'BigArt', thumbnail: '👹' },
  { id: 'char528', name: 'Cave Dweller', category: 'sprite', type: 'PNG', author: 'DarkEarth', thumbnail: '🛖' },
  { id: 'char529', name: 'Sewer Mutant', category: 'sprite', type: 'PNG', author: 'ToxicPixels', thumbnail: '🐀' },
  { id: 'char530', name: 'Toxic Chemist', category: 'sprite', type: 'PNG', author: 'HazardCo', thumbnail: '🧪' },
  { id: 'char531', name: 'Gravity Manipulator', category: 'sprite', type: 'PNG', author: 'PhysicsSfx', thumbnail: '🌑' },
  { id: 'char532', name: 'Time Traveler', category: 'sprite', type: 'PNG', author: 'ParadoxStudio', thumbnail: '⌛' },
  { id: 'char533', name: 'Dimension Hopper', category: 'sprite', type: 'PNG', author: 'RiftArt', thumbnail: '🌀' },
  { id: 'char534', name: 'Rune Priest', category: 'sprite', type: 'PNG', author: 'ElderScripts', thumbnail: '📜' },
  { id: 'char535', name: 'Blade Dancer', category: 'sprite', type: 'PNG', author: 'DuelingArt', thumbnail: '⚔️' },
  { id: 'char536', name: 'Heavy Tank', category: 'sprite', type: 'PNG', author: 'Ironclads', thumbnail: '🚜' },
  { id: 'char537', name: 'Sniper Elite', category: 'sprite', type: 'PNG', author: 'EagleEye', thumbnail: '🔭' },
  { id: 'char538', name: 'Medic Drone', category: 'sprite', type: 'PNG', author: 'HealBot', thumbnail: '🚁' },
  { id: 'char539', name: 'Cargo Bot', category: 'sprite', type: 'PNG', author: 'Logistics', thumbnail: '📦' },
  { id: 'char540', name: 'AI Core Entity', category: 'sprite', type: 'PNG', author: 'NeuralNet', thumbnail: '🧠' },
  { id: 'char541', name: 'Bio-Engineer', category: 'sprite', type: 'PNG', author: 'LifeForge', thumbnail: '🔬' },
  { id: 'char542', name: 'Mech Pilot', category: 'sprite', type: 'PNG', author: 'ArmorCore', thumbnail: '🦾' },
  { id: 'char543', name: 'Orbital Guard', category: 'sprite', type: 'PNG', author: 'Zenith', thumbnail: '🛡️' },
  { id: 'char544', name: 'Rebel Leader', category: 'sprite', type: 'PNG', author: 'Resistance', thumbnail: '✊' },
  { id: 'char545', name: 'Corporate Assassin', category: 'sprite', type: 'PNG', author: 'TheFirm', thumbnail: '💼' },
  { id: 'char546', name: 'Street Brawler', category: 'sprite', type: 'PNG', author: 'UrbanFights', thumbnail: '🥊' },
  { id: 'char547', name: 'Virtual Avatar', category: 'sprite', type: 'PNG', author: 'MetaPixels', thumbnail: '👤' },
  { id: 'char548', name: 'Data Ghost', category: 'sprite', type: 'PNG', author: 'CipherArt', thumbnail: '💾' },
  { id: 'char549', name: 'Code Hunter', category: 'sprite', type: 'PNG', author: 'LogicForge', thumbnail: '🔍' },
  { id: 'char550', name: 'System Administrator', category: 'sprite', type: 'PNG', author: 'RootAccess', thumbnail: '🔑' },
  // --- END OF CHARACTER ASSETS ---

  // Original Sprites (continued)
  { id: 's101', name: 'Forest Elf', category: 'sprite', type: 'PNG', author: 'WildArt', thumbnail: '🧝' },
  { id: 's102', name: 'Viking Shield', category: 'sprite', type: 'PNG', author: 'NorseTools', thumbnail: '🛡️' },
  { id: 's103', name: 'Space Rocket', category: 'sprite', type: 'PNG', author: 'AstroDev', thumbnail: '🚀' },
  { id: 's104', name: 'Ancient Key', category: 'sprite', type: 'PNG', author: 'KeyForge', thumbnail: '🔑' },
  { id: 's105', name: 'Toxic barrel', category: 'sprite', type: 'PNG', author: 'HazardCo', thumbnail: '🛢️' },
  { id: 's106', name: 'Red Dragon', category: 'sprite', type: 'PNG', author: 'MythicBeasts', thumbnail: '🐉' },
  { id: 's107', name: 'Crystal ball', category: 'sprite', type: 'PNG', author: 'SeerProps', thumbnail: '🔮' },
  { id: 's108', name: 'Desert Cactus', category: 'sprite', type: 'PNG', author: 'EcoDesign', thumbnail: '🌵' },
  { id: 's109', name: 'Neon Sign', category: 'sprite', type: 'PNG', author: 'GlowMaster', thumbnail: '🏮' },
  { id: 's110', name: 'Broken Gear', category: 'sprite', type: 'PNG', author: 'RustyParts', thumbnail: '⚙️' },
  { id: 's111', name: 'Golden Apple', category: 'sprite', type: 'PNG', author: 'FruitKing', thumbnail: '🍎' },
  { id: 's112', name: 'Magic Portal', category: 'sprite', type: 'PNG', author: 'RiftArt', thumbnail: '🌀' },
  { id: 's113', name: 'Pirate Flag', category: 'sprite', type: 'PNG', author: 'SeaDog', thumbnail: '🏴‍☠️' },
  { id: 's114', name: 'Graveyard Tree', category: 'sprite', type: 'PNG', author: 'DeadWood', thumbnail: '🌳' },
  { id: 's115', name: 'Laser Beam', category: 'sprite', type: 'PNG', author: 'TechOps', thumbnail: '⚡' },
  { id: 's116', name: 'Paper Map', category: 'sprite', type: 'PNG', author: 'CartoMan', thumbnail: '🗺️' },
  { id: 's117', name: 'Wooden Bucket', category: 'sprite', type: 'PNG', author: 'RuralCraft', thumbnail: '🪣' },
  { id: 's118', name: 'Compass', category: 'sprite', type: 'PNG', author: 'NaviDev', thumbnail: '🧭' },
  { id: 's119', name: 'Blue Crystal', category: 'sprite', type: 'PNG', author: 'GemSmith', thumbnail: '💎' },
  { id: 's120', name: 'Steampunk Goggles', category: 'sprite', type: 'PNG', author: 'BrassGear', thumbnail: '🥽' },
  { id: 's121', name: 'Cursed Mirror', category: 'sprite', type: 'PNG', author: 'HexProps', thumbnail: '🪞' },
  { id: 's122', name: 'Moon Rock', category: 'sprite', type: 'PNG', author: 'LunarLoot', thumbnail: '🌑' },
  { id: 's123', name: 'Scroll of Fire', category: 'sprite', type: 'PNG', author: 'SpellWrite', thumbnail: '📜' },
  { id: 's124', name: 'Bone Pile', category: 'sprite', type: 'PNG', author: 'NecroSfx', thumbnail: '🦴' },
  { id: 's125', name: 'Iron Anvil', category: 'sprite', type: 'PNG', author: 'HammerTime', thumbnail: '🔨' },
  { id: 's126', name: 'Fishing Rod', category: 'sprite', type: 'PNG', author: 'LakeKing', thumbnail: '🎣' },
  { id: 's127', name: 'Glowing Mushroom', category: 'sprite', type: 'PNG', author: 'Sp sporeArt', thumbnail: '🍄' },
  { id: 's128', name: 'Compass Rose', category: 'sprite', type: 'PNG', author: 'StarMap', thumbnail: '☸️' },
  { id: 's129', name: 'Candle Stick', category: 'sprite', type: 'PNG', author: 'WaxWork', thumbnail: '🕯️' },
  { id: 's130', name: 'Broken Sword', category: 'sprite', type: 'PNG', author: 'ShatterSteel', thumbnail: '🗡️' },
  { id: 's131', name: 'Diamond Ring', category: 'sprite', type: 'PNG', author: 'LuxuryLoot', thumbnail: '💍' },
  { id: 's132', name: 'Toxic Gas Cloud', category: 'sprite', type: 'PNG', author: 'ChemHazard', thumbnail: '🌫️' },
  { id: 's133', name: 'Robot Hand', category: 'sprite', type: 'PNG', author: 'CyberLimb', thumbnail: '🦾' },
  { id: 's134', name: 'Ancient Totem', category: 'sprite', type: 'PNG', author: 'TribalProps', thumbnail: '🗿' },
  { id: 's135', name: 'Starfish', category: 'sprite', type: 'PNG', author: 'OceanDecor', thumbnail: '⭐' },
  { id: 's136', name: 'Life Heart', category: 'sprite', type: 'PNG', author: 'HealthCo', thumbnail: '💖' },
  { id: 's137', name: 'Shield of Valor', category: 'sprite', type: 'PNG', author: 'GuardMaster', thumbnail: '🛡️' },
  { id: 's138', name: 'Alien Egg', category: 'sprite', type: 'PNG', author: 'XenoBreed', thumbnail: '🥚' },
  { id: 's139', name: 'Rusty Pipe', category: 'sprite', type: 'PNG', author: 'IndustryArt', thumbnail: '🪠' },
  { id: 's140', name: 'Ice Shard', category: 'sprite', type: 'PNG', author: 'FrostForge', thumbnail: '❄️' },

  // Original Music
  { id: '2', name: 'Ambient Forest', category: 'music', type: 'MP3', author: 'NatureBeats', thumbnail: '🌲' },
  { id: '5', name: 'Chiptune Hero', category: 'music', type: 'MIDI', author: 'BitMaster', thumbnail: '🎵' },
  { id: 'm9', name: 'Cyber Synth', category: 'music', type: 'MP3', author: 'NeonDrive', thumbnail: '🎹' },
  { id: 'm10', name: 'Dark Dungeon', category: 'music', type: 'WAV', author: 'CreepAudio', thumbnail: '💀' },
  { id: 'm11', name: 'Epic Quest', category: 'music', type: 'MP3', author: 'HeroicSound', thumbnail: '⚔️' },
  { id: 'm12', name: 'Lo-fi Study', category: 'music', type: 'MP3', author: 'ChillVibes', thumbnail: '☕' },
  { id: 'm13', name: 'Arcade Rush', category: 'music', type: 'MP3', author: 'GamerTune', thumbnail: '🕹️' },
  { id: 'm14', name: 'Zen Garden', category: 'music', type: 'MP3', author: 'SpiritTrack', thumbnail: '🎋' },
  { id: 'm15', name: 'Techno Night', category: 'music', type: 'WAV', author: 'ClubBeats', thumbnail: '🕺' },

  // New Music (20 more)
  { id: 'm201', name: 'Battle Drums', category: 'music', type: 'MP3', author: 'WarSound', thumbnail: '🥁' },
  { id: 'm202', name: 'Space Waltz', category: 'music', type: 'MP3', author: 'StarComposer', thumbnail: '🎻' },
  { id: 'm203', name: 'Stealth Mission', category: 'music', type: 'WAV', author: 'SpyTrack', thumbnail: '🕶️' },
  { id: 'm204', name: 'Victory Fanfare', category: 'music', type: 'MP3', author: 'WinAudio', thumbnail: '🎺' },
  { id: 'm205', name: 'Desert Oasis', category: 'music', type: 'MP3', author: 'SandTones', thumbnail: '🐪' },
  { id: 'm206', name: 'Snowy Peak', category: 'music', type: 'WAV', author: 'ColdBeats', thumbnail: '🏔️' },
  { id: 'm207', name: 'Boss Fight Alpha', category: 'music', type: 'MP3', author: 'MetalDev', thumbnail: '👹' },
  { id: 'm208', name: 'Mystic Cave', category: 'music', type: 'MP3', author: 'EchoArtist', thumbnail: '🕯️' },
  { id: 'm209', name: 'Neon Rain', category: 'music', type: 'MP3', author: 'SynthWave', thumbnail: '🏙️' },
  { id: 'm210', name: 'Haunted Halls', category: 'music', type: 'WAV', author: 'FearComposer', thumbnail: '🧛' },
  { id: 'm211', name: 'Tropical Paradise', category: 'music', type: 'MP3', author: 'BeachMix', thumbnail: '🏖️' },
  { id: 'm212', name: 'Industrial Grind', category: 'music', type: 'MP3', author: 'MachineBeats', thumbnail: '🏗️' },
  { id: 'm213', name: '8-Bit Adventure', category: 'music', type: 'MIDI', author: 'PixelAudio', thumbnail: '👾' },
  { id: 'm214', name: 'Celestial Calm', category: 'music', type: 'MP3', author: 'VoidMusic', thumbnail: '✨' },
  { id: 'm215', name: 'Wild West Duel', category: 'music', type: 'MP3', author: 'CactusComposer', thumbnail: '🤠' },
  { id: 'm216', name: 'Clockwork Gears', category: 'music', type: 'WAV', author: 'TickingTime', thumbnail: '🕰️' },
  { id: 'm217', name: 'Underwater Abyss', category: 'music', type: 'MP3', author: 'DeepSea', thumbnail: '🌊' },
  { id: 'm218', name: 'Cyber City Chase', category: 'music', type: 'MP3', author: 'SpeedSynth', thumbnail: '🏎️' },
  { id: 'm219', name: 'Holy Cathedral', category: 'music', type: 'MP3', author: 'OrganPipe', thumbnail: '⛪' },
  { id: 'm220', name: 'Digital Rain', category: 'music', type: 'WAV', author: 'MatrixAudio', thumbnail: '💻' },

  // Original Sound Effects
  { id: '3', name: 'Laser Shot', category: 'sound', type: 'WAV', author: 'SfxWizard', thumbnail: '💥' },
  { id: '7', name: 'Jump Sound', category: 'sound', type: 'WAV', author: 'GameAudio', thumbnail: '🔊' },
  { id: 'sf9', name: 'Explosion', category: 'sound', type: 'WAV', author: 'BoomTown', thumbnail: '💣' },
  { id: 'sf10', name: 'Sword Swing', category: 'sound', type: 'WAV', author: 'SfxKing', thumbnail: '🗡️' },
  { id: 'sf11', name: 'Collect Item', category: 'sound', type: 'MP3', author: 'RewardSfx', thumbnail: '✨' },
  { id: 'sf12', name: 'Zombie Moan', category: 'sound', type: 'WAV', author: 'Ghouls', thumbnail: '🗣️' },
  { id: 'sf13', name: 'Cyborg Voice', category: 'sound', type: 'MP3', author: 'BotTalk', thumbnail: '🎙️' },
  { id: 'sf14', name: 'Magic Spell', category: 'sound', type: 'WAV', author: 'SpellAudio', thumbnail: '🪄' },
  { id: 'sf15', name: 'Rainfall', category: 'sound', type: 'MP3', author: 'StormSfx', thumbnail: '🌧️' },

  // New Sound Effects (20 more)
  { id: 'sf301', name: 'Wood Break', category: 'sound', type: 'WAV', author: 'CrashCo', thumbnail: '🪵' },
  { id: 'sf302', name: 'Metal Clang', category: 'sound', type: 'WAV', author: 'ForgeSfx', thumbnail: '🔨' },
  { id: 'sf303', name: 'Glass Shatter', category: 'sound', type: 'WAV', author: 'FragileSfx', thumbnail: '🥂' },
  { id: 'sf304', name: 'Heartbeat', category: 'sound', type: 'MP3', author: 'BioSfx', thumbnail: '💓' },
  { id: 'sf305', name: 'Teleport', category: 'sound', type: 'WAV', author: 'SciFiSfx', thumbnail: '⚛️' },
  { id: 'sf306', name: 'Bird Chirp', category: 'sound', type: 'MP3', author: 'NatureSfx', thumbnail: '🐦' },
  { id: 'sf307', name: 'Fire Crackle', category: 'sound', type: 'WAV', author: 'WarmthAudio', thumbnail: '🔥' },
  { id: 'sf308', name: 'Page Turn', category: 'sound', type: 'MP3', author: 'BookSfx', thumbnail: '📖' },
  { id: 'sf309', name: 'Power Down', category: 'sound', type: 'WAV', author: 'ElectricSfx', thumbnail: '🔌' },
  { id: 'sf310', name: 'Water Splash', category: 'sound', type: 'WAV', author: 'AquaSfx', thumbnail: '💧' },
  { id: 'sf311', name: 'Door Creak', category: 'sound', type: 'WAV', author: 'SpookySfx', thumbnail: '🚪' },
  { id: 'sf312', name: 'Cheering Crowd', category: 'sound', type: 'MP3', author: 'EventAudio', thumbnail: '🙌' },
  { id: 'sf313', name: 'Engine Rev', category: 'sound', type: 'MP3', author: 'MotorSfx', thumbnail: '🏎️' },
  { id: 'sf314', name: 'Coin Jingle', category: 'sound', type: 'WAV', author: 'GoldSfx', thumbnail: '💰' },
  { id: 'sf315', name: 'Wind Howl', category: 'sound', type: 'MP3', author: 'SkySfx', thumbnail: '🌬️' },
  { id: 'sf316', name: 'Thunder Bolt', category: 'sound', type: 'WAV', author: 'StormAudio', thumbnail: '⚡' },
  { id: 'sf317', name: 'Alien Gurgle', category: 'sound', type: 'WAV', author: 'MonsterSfx', thumbnail: '👽' },
  { id: 'sf318', name: 'Camera Click', category: 'sound', type: 'MP3', author: 'PhotoSfx', thumbnail: '📸' },
  { id: 'sf319', name: 'Typing Sound', category: 'sound', type: 'WAV', author: 'WorkAudio', thumbnail: '⌨️' },
  { id: 'sf320', name: 'Level Up Fanfare', category: 'sound', type: 'MP3', author: 'VictorySfx', thumbnail: '🆙' },

  // Original UI
  { id: '6', name: 'Spooky Manor UI', category: 'ui', type: 'JSON', author: 'GothDesign', thumbnail: '🏰' },
  { id: 'u9', name: 'Cyber HUD', category: 'ui', type: 'CSS', author: 'FutureUI', thumbnail: '📟' },
  { id: 'u10', name: 'Minimal Menu', category: 'ui', type: 'JSON', author: 'CleanDev', thumbnail: '⬜' },
  { id: 'u11', name: 'Fantasy Inventory', category: 'ui', type: 'PNG', author: 'QuestUI', thumbnail: '🎒' },
  { id: 'u12', name: 'Neon Buttons', category: 'ui', type: 'CSS', author: 'GlowMaster', thumbnail: '🔘' },
  { id: 'u13', name: 'Pixel Dialog', category: 'ui', type: 'JSON', author: 'RetroUI', thumbnail: '💬' },
  { id: 'u14', name: 'Health Bar Set', category: 'ui', type: 'PNG', author: 'BarDesigner', thumbnail: '❤️' },
  { id: 'u15', name: 'Quest Journal', category: 'ui', type: 'JSON', author: 'BookUI', thumbnail: '📜' },

  // New UI (20 more)
  { id: 'u401', name: 'Sci-Fi Radar', category: 'ui', type: 'JSON', author: 'ScanDev', thumbnail: '🛰️' },
  { id: 'u402', name: 'Parchment Scroll UI', category: 'ui', type: 'PNG', author: 'OldWorld', thumbnail: '📜' },
  { id: 'u403', name: 'Vaporwave Palette', category: 'ui', type: 'CSS', author: 'PinkBlue', thumbnail: '🎨' },
  { id: 'u404', name: 'Retro Scoreboard', category: 'ui', type: 'JSON', author: 'ArcadeUI', thumbnail: '🔢' },
  { id: 'u405', name: 'Glassmorphism Cards', category: 'ui', type: 'CSS', author: 'ModernUI', thumbnail: '🪟' },
  { id: 'u406', name: 'Steampunk Gauge', category: 'ui', type: 'PNG', author: 'ClockDev', thumbnail: '🌡️' },
  { id: 'u407', name: 'Comic Bubble Set', category: 'ui', type: 'JSON', author: 'InkArt', thumbnail: '🗨️' },
  { id: 'u408', name: 'Digital Map HUD', category: 'ui', type: 'CSS', author: 'MapDev', thumbnail: '📍' },
  { id: 'u409', name: 'Energy Bar Neon', category: 'ui', type: 'PNG', author: 'PowerUI', thumbnail: '🔋' },
  { id: 'u410', name: 'Dark Mode Kit', category: 'ui', type: 'CSS', author: 'NightDev', thumbnail: '🌑' },
  { id: 'u411', name: 'Cyberpunk Terminal', category: 'ui', type: 'JSON', author: 'HackerUI', thumbnail: '⌨️' },
  { id: 'u412', name: 'Fantasy Compass UI', category: 'ui', type: 'PNG', author: 'NaviArt', thumbnail: '🧭' },
  { id: 'u413', name: 'Luxury Gold Menu', category: 'ui', type: 'CSS', author: 'RichUI', thumbnail: '👑' },
  { id: 'u414', name: 'Hand-Drawn UI', category: 'ui', type: 'PNG', author: 'SketchDev', thumbnail: '✏️' },
  { id: 'u415', name: 'Flat Design Icons', category: 'ui', type: 'JSON', author: 'SimpleUI', thumbnail: '🟦' },
  { id: 'u416', name: 'Gothic Font Kit', category: 'ui', type: 'CSS', author: 'VoidUI', thumbnail: '🔠' },
  { id: 'u417', name: 'Holographic Tabs', category: 'ui', type: 'JSON', author: 'ProjectionUI', thumbnail: '💿' },
  { id: 'u418', name: 'Bio-Hazard Warning', category: 'ui', type: 'PNG', author: 'SafetyCo', thumbnail: '⚠️' },
  { id: 'u419', name: 'Arcade Joystick UI', category: 'ui', type: 'JSON', author: 'StickDev', thumbnail: '🕹️' },
  { id: 'u420', name: 'Crystal XP Bar', category: 'ui', type: 'PNG', author: 'LevelMaster', thumbnail: '💎' },
];
