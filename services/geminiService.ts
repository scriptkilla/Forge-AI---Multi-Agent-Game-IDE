
import { GoogleGenAI, Type } from "@google/genai";
import { GameTheme, GamePerspective, Asset, ReferenceImage, Message, AgentRole } from "../types";
import { THEMES, AGENTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Robust retry wrapper for Gemini API calls to handle 429 Rate Limits
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, initialDelay = 2000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error?.message?.includes('429') || error?.status === 429 || error?.toString().includes('quota');
      if (isRateLimit && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export interface BrainstormResult {
  agentId: AgentRole;
  text: string;
}

/**
 * Generates a collaborative dialogue between multiple agents in a single API call
 * to save quota and ensure agents actually reference each other.
 */
export const generateBrainstormingBatch = async (
  agentRoles: AgentRole[],
  prompt: string,
  context: string,
  history: Message[] = [],
  referenceImage?: ReferenceImage
): Promise<BrainstormResult[]> => {
  const model = 'gemini-3-flash-preview';
  const agentNames = agentRoles.map(r => AGENTS[r].name).join(', ');
  const conversationSummary = history.map(m => `${AGENTS[m.agentId]?.name || m.agentId}: ${m.text}`).join('\n');

  const systemInstruction = `You are a group of specialized AI Game Studio agents: ${agentNames}.
    DIRECTIVE: "${prompt}"
    CURRENT PHASE: ${context}
    
    CONVERSATION HISTORY:
    ${conversationSummary || "Project start."}

    TASK: Generate a collaborative debate between these agents: ${agentNames}.
    Each agent should speak once, in order. They MUST respond to what was said previously by other agents or the history.
    They should work out tough technical or design problems together.
    
    Format your response as a valid JSON array of objects:
    [{"agentId": "role_id", "text": "agent message content"}]
    
    Use these IDs: ${agentRoles.join(', ')}.
    Keep each message concise (max 2-3 sentences).`;

  return withRetry(async () => {
    const parts: any[] = [{ text: "Proceed with the group brainstorming." }];
    if (referenceImage) {
      parts.push({
        inlineData: { data: referenceImage.data, mimeType: referenceImage.mimeType }
      });
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.9,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              agentId: { type: Type.STRING },
              text: { type: Type.STRING }
            },
            required: ["agentId", "text"]
          }
        }
      },
    });

    try {
      return JSON.parse(response.text || "[]") as BrainstormResult[];
    } catch (e) {
      console.error("Failed to parse brainstorming batch JSON", e);
      return agentRoles.map(role => ({ agentId: role, text: "Synchronizing neural buffers..." }));
    }
  });
};

export const generateAgentComment = async (
  role: string, 
  prompt: string, 
  context: string, 
  history: Message[] = [], 
  referenceImage?: ReferenceImage
) => {
  return withRetry(async () => {
    const model = 'gemini-3-flash-preview';
    const conversationSummary = history.map(m => `${AGENTS[m.agentId]?.name || m.agentId}: ${m.text}`).join('\n');
    const systemInstruction = `You are the ${role} of a specialized AI Game Studio.
      DIRECTIVE: "${prompt}"
      HISTORY: ${conversationSummary || "None"}
      PHASE: ${context}
      Respond to the team and history. Concise (max 3 sentences).`;

    const parts: any[] = [{ text: "Provide your professional input." }];
    if (referenceImage) {
      parts.push({ inlineData: { data: referenceImage.data, mimeType: referenceImage.mimeType } });
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: { systemInstruction, temperature: 0.8 },
    });
    return response.text || "Syncing...";
  });
};

export const generateGameCode = async (prompt: string, designDocs: string, themeId: GameTheme, perspective: GamePerspective, assets: Asset[], referenceImage?: ReferenceImage) => {
  return withRetry(async () => {
    const model = 'gemini-3-pro-preview';
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    const assetList = assets.map(a => `- ${a.name} (${a.category})`).join('\n');

    let perspectiveInstruction = "";
    if (perspective === '2d-side') {
      perspectiveInstruction = "Perspective is 2D Side-Scrolling Platformer. Use HTML5 Canvas.";
    } else if (perspective === '2d-top') {
      perspectiveInstruction = "Perspective is 2D Top-Down. Use HTML5 Canvas.";
    } else if (perspective === '3d-open') {
      perspectiveInstruction = "Perspective is 3D Open World. Use Three.js via CDN.";
    }

    const systemInstruction = `You are a Lead Game Developer. 
      Generate a SINGLE self-contained HTML/JS/CSS file based on the collaborative brainstorm transcript below.
      THEME: ${theme.name}. PERSPECTIVE: ${perspective}.
      ASSETS: ${assetList}
      
      TRANSCRIPT:
      ${designDocs}
      
      ${perspectiveInstruction}
      Include a "Click to Start" overlay.`;

    const parts: any[] = [{ text: "Synthesize the code artifact." }];
    if (referenceImage) {
      parts.push({ inlineData: { data: referenceImage.data, mimeType: referenceImage.mimeType } });
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: { systemInstruction, temperature: 0.1 },
    });
    
    const text = response.text || "";
    const codeMatch = text.match(/```html([\s\S]*?)```/) || text.match(/```([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : text;
  });
};
