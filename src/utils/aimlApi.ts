
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

// Message système qui établit le contexte juridique musical français optimisé pour être concis
const SYSTEM_MESSAGE = `Vous êtes Mr BAVEU, un assistant juridique spécialisé dans l'industrie musicale française. Votre mission est d'aider les jeunes artistes indépendants à comprendre les aspects juridiques et contractuels de leur carrière.

Votre expertise couvre:
- Contrats de distribution et d'édition musicale
- Droits d'auteur et droits voisins (SACEM, SDRM)
- Redevances (streaming, mécaniques, synchronisation)
- Statuts juridiques pour artistes (auto-entrepreneur, intermittent)
- Protection de la propriété intellectuelle

Répondez de manière concise, précise et accessible. Expliquez brièvement les termes techniques. Si une question dépasse votre expertise, recommandez la consultation d'un avocat spécialisé.

Pour optimiser l'utilisation des tokens:
1. Soyez direct et concis
2. Utilisez des listes à puces quand c'est possible
3. Évitez les répétitions et les phrases superflues
4. Concentrez-vous sur le droit français de la musique

Rappelez toujours que vos réponses sont des informations générales et non des conseils juridiques personnalisés.`;

// Réponses prédéfinies pour le mode hors ligne, optimisées pour être utiles mais concises
const FALLBACK_RESPONSES: Record<string, string> = {
  "contrat distribution": `
**Éléments clés des contrats de distribution musicale :**

1. **Durée et territoire** : Vérifiez pour combien de temps et dans quelles régions
2. **Exclusivité** : Pouvez-vous distribuer via d'autres canaux?
3. **Pourcentages de royalties** : Clairement définis par plateforme
4. **Fréquence des paiements** : Quand et comment serez-vous payé
5. **Clauses de résiliation** : Comment mettre fin au contrat
6. **Propriété des masters** : Confirmez que vous les conservez
7. **Obligations de marketing** : Engagements du distributeur
8. **Rapports de ventes** : Fréquence et détails fournis
9. **Avances et recoupement** : Comment sont-elles récupérées
10. **Droits d'édition** : Le contrat ne devrait pas y toucher

Faites réviser tout contrat par un avocat spécialisé avant signature.`,

  "droits d'auteur": `
**Droits d'auteur en France - Essentiel :**

• **Création automatique** : Protection dès création sans dépôt obligatoire
• **Double protection** : Composition (mélodie/paroles) et enregistrement (master)
• **Durée** : Vie de l'auteur + 70 ans
• **Gestion** : SACEM pour les droits d'exécution et de reproduction
• **Revenus** : Diffusion (radio/TV/streaming), ventes, synchronisations, performances

**Droits patrimoniaux :**
• Reproduction, représentation, adaptation
• Cessibles et transmissibles

**Droits moraux :**
• Paternité, respect de l'œuvre
• Incessibles et imprescriptibles

Pour protection renforcée: enveloppe Soleau, SACEM, ou dépôt notarié.`,

  "redevances mécaniques": `
**Redevances mécaniques - Points clés :**

• **Définition** : Paiements dus aux auteurs/compositeurs pour reproduction de leur œuvre
• **Perception** : SDRM en France (liée à la SACEM)
• **Taux** : ~9,009% du prix de gros pour supports physiques
• **Streaming** : Calcul complexe basé sur un % des revenus du service
• **Partage** : 50/50 compositeur/éditeur (contrat standard)

**Différence avec royalties de streaming :**
• Redevances mécaniques = composition (partition/paroles)
• Royalties streaming = aussi l'enregistrement (master)

Ces redevances sont versées même si vous n'êtes pas l'interprète de vos œuvres.`,

  "default": `
Je suis Mr BAVEU, votre assistant juridique musical. Je ne peux pas accéder à l'API externe actuellement.

Les principales questions juridiques pour jeunes artistes en France concernent:
• Droits d'auteur et SACEM
• Contrats de distribution/édition
• Statut professionnel (auto-entrepreneur, intermittent)
• Redevances et rémunérations

Pour des conseils juridiques précis, consultez:
1. Un avocat spécialisé en droit du divertissement
2. La SACEM pour les questions de droits
3. Le Centre National de la Musique (CNM)

Comment puis-je vous orienter avec les informations dont je dispose?`
};

// Fonction pour déterminer quelle réponse prédéfinie utiliser
const getFallbackResponse = (question: string): string => {
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes('contrat') && questionLower.includes('distribution')) {
    return FALLBACK_RESPONSES["contrat distribution"];
  }
  
  if (questionLower.includes('droit') && questionLower.includes('auteur')) {
    return FALLBACK_RESPONSES["droits d'auteur"];
  }
  
  if (questionLower.includes('redevance') && questionLower.includes('mécanique')) {
    return FALLBACK_RESPONSES["redevances mécaniques"];
  }
  
  return FALLBACK_RESPONSES["default"];
};

// Fonction optimisée pour appeler l'API OpenAI avec une utilisation minimale de tokens
const callOpenAiApi = async (
  messages: any[],
  onSuccess: (response: any) => void,
  onError: (error: Error) => void
) => {
  try {
    const apiKey = localStorage.getItem('baveu-api-key') || '';
    
    if (!apiKey) {
      throw new Error('Clé API OpenAI manquante. Veuillez configurer votre clé API dans les paramètres.');
    }
    
    // Optimisation: utiliser gpt-4o pour un meilleur rapport qualité/prix
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: messages,
        model: 'gpt-4o',
        // Optimisation: limiter le nombre de tokens pour réduire les coûts
        max_tokens: 800,
        // Optimisation: température réduite pour des réponses plus concises et directes
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erreur API OpenAI: ${response.status} - ${errorData.error?.message || 'Erreur inconnue'}`);
    }

    const data = await response.json();
    onSuccess(data);
    
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API OpenAI:', error);
    onError(error as Error);
  }
};

// Fonction pour envoyer un message à l'API
export const sendMessageToAIML = async (
  messages: Message[],
  onMessageReceived: (message: Message) => void,
  onError: (error: Error) => void
) => {
  try {
    // Vérifier si on est en mode hors ligne
    const useOfflineMode = localStorage.getItem('baveu-offline-mode') !== 'false';
    
    if (useOfflineMode) {
      // Utiliser les réponses prédéfinies en mode hors ligne
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      const fallbackResponse = lastUserMessage 
        ? getFallbackResponse(lastUserMessage.content)
        : FALLBACK_RESPONSES["default"];
      
      const fallbackMessage: Message = {
        id: Math.random().toString(36).substring(2, 15),
        role: 'assistant',
        content: fallbackResponse,
        createdAt: new Date()
      };
      
      // Ajouter un délai pour simuler une réponse réseau
      setTimeout(() => {
        onMessageReceived(fallbackMessage);
      }, 1000);
      
      return;
    }
    
    // Optimisation: ne pas envoyer tout l'historique des messages à l'API
    // pour économiser des tokens, garder seulement les derniers messages
    const recentMessagesCount = 6; // Système + 5 derniers échanges
    const systemMessage = {
      role: 'system',
      content: SYSTEM_MESSAGE
    };

    // Ne garder que les messages récents pour l'API
    const recentMessages = messages.slice(-recentMessagesCount);
    
    const formattedMessages = [
      systemMessage,
      ...recentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    try {
      const handleApiSuccess = (data: any) => {
        // Créer un nouveau message avec la réponse
        const newMessage: Message = {
          id: Math.random().toString(36).substring(2, 15),
          role: 'assistant',
          content: data.choices[0].message.content,
          createdAt: new Date()
        };
        
        // Appeler le callback avec le nouveau message
        onMessageReceived(newMessage);
      };
      
      await callOpenAiApi(formattedMessages, handleApiSuccess, (error) => {
        throw error;
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API:', error);
      
      // Utiliser une réponse de secours en cas d'échec de l'API
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      const fallbackResponse = lastUserMessage 
        ? getFallbackResponse(lastUserMessage.content)
        : FALLBACK_RESPONSES["default"];
      
      const fallbackMessage: Message = {
        id: Math.random().toString(36).substring(2, 15),
        role: 'assistant',
        content: fallbackResponse,
        createdAt: new Date()
      };
      
      onMessageReceived(fallbackMessage);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    onError(error as Error);
  }
};
