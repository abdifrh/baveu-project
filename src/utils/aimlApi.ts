
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

// Clé API AIML
const AIML_API_KEY = 'b1422c38a2f449d18d57efe78fb1e0e2';

// Message système qui établit le contexte juridique musical
const SYSTEM_MESSAGE = `Vous êtes un assistant juridique spécialisé dans l'industrie musicale, conçu pour aider les artistes indépendants à comprendre les aspects juridiques et contractuels de leur carrière musicale.

Votre expertise couvre:
- Les contrats de distribution musicale (physique et numérique)
- Les contrats d'édition musicale
- Les contrats de management et d'agent
- Les droits d'auteur et copyright
- Les redevances (streaming, mécaniques, synchronisation)
- Les licences et autorisations
- La protection de la propriété intellectuelle

Répondez de manière claire, précise et accessible aux artistes sans expérience juridique. Expliquez les termes techniques. Si une question dépasse votre expertise ou nécessite un conseil juridique spécifique, recommandez la consultation d'un avocat spécialisé.

Concentrez-vous sur:
1. Expliquer clairement les concepts juridiques
2. Identifier les points d'attention dans les contrats
3. Fournir des conseils généraux de négociation
4. Présenter les pratiques standards de l'industrie

Rappelez toujours que vos réponses sont des informations générales et non des conseils juridiques personnalisés.`;

// Fonction pour envoyer un message à l'API AIML
export const sendMessageToAIML = async (
  messages: Message[],
  onMessageReceived: (message: Message) => void,
  onError: (error: Error) => void
) => {
  try {
    // Préparer les messages pour l'API AIML
    const systemMessage = {
      role: 'system',
      content: SYSTEM_MESSAGE
    };

    const formattedMessages = [
      systemMessage,
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Appel à l'API AIML
    const response = await fetch('https://aimlapi.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AIML_API_KEY}`
      },
      body: JSON.stringify({
        messages: formattedMessages,
        model: 'gpt-4', // Vous pouvez ajuster le modèle selon vos besoins
        stream: false    // Ne pas utiliser le streaming pour simplifier
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    
    // Créer un nouveau message avec la réponse
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      role: 'assistant',
      content: data.choices[0].message.content,
      createdAt: new Date()
    };

    // Appeler le callback avec le nouveau message
    onMessageReceived(newMessage);
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API AIML:', error);
    onError(error as Error);
  }
};
