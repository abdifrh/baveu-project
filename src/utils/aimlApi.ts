
import { toast } from 'sonner';

// AIML API configuration
const AIML_API_KEY = 'b1422c38a2f449d18d57efe78fb1e0e2';
const AIML_API_URL = 'https://aimlapi.com/api/chat';

// Message types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

interface AIMLRequestBody {
  messages: {
    role: string;
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface AIMLResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

// System message to set the context for the AI
const SYSTEM_MESSAGE = `You are LegalBeat, a specialized AI assistant designed to help indie musicians and young artists navigate the legal aspects of the music industry. 

Your expertise includes:
- Music contracts (recording, publishing, distribution, etc.)
- Copyright and intellectual property in music
- Royalty structures and payments
- Licensing and synchronization
- Legal terminology and implications

When responding:
- Be clear, concise, and accessible - avoid excessive legal jargon
- Always clarify that you are providing information, not legal advice
- When appropriate, suggest consulting with a qualified music attorney
- Focus on empowering artists to make informed decisions
- Prioritize explaining the artist's rights and protections

Remember that your primary goal is to help independent artists understand their legal rights and options in the music industry.`;

// Generate a unique ID for messages
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Main function to send messages to AIML API
export const sendMessageToAIML = async (
  messages: Message[],
  onSuccess?: (message: Message) => void,
  onError?: (error: Error) => void
): Promise<Message | null> => {
  try {
    // Prepare the API request with the system message and conversation history
    const apiMessages = [
      { role: 'system', content: SYSTEM_MESSAGE },
      ...messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }))
    ];

    const requestBody: AIMLRequestBody = {
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000
    };

    const response = await fetch(AIML_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AIML_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: AIMLResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from API');
    }

    const newMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: data.choices[0].message.content,
      createdAt: new Date()
    };

    if (onSuccess) {
      onSuccess(newMessage);
    }

    return newMessage;
  } catch (error) {
    console.error('Error calling AIML API:', error);
    
    if (onError && error instanceof Error) {
      onError(error);
    }
    
    toast.error('Failed to get a response from the AI assistant. Please try again.');
    return null;
  }
};
