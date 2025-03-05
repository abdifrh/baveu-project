
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

export type ApiProvider = 'aiml' | 'openai';

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

// Réponses prédéfinies pour le mode hors ligne
const FALLBACK_RESPONSES: Record<string, string> = {
  "contrat distribution": `
Dans un contrat de distribution musicale, recherchez attentivement ces éléments clés :

1. **Durée et territoire** : Vérifiez pour combien de temps vous cédez vos droits et dans quelles régions.
2. **Exclusivité** : Déterminez si vous pouvez distribuer votre musique via d'autres canaux.
3. **Pourcentages de royalties** : Assurez-vous que les pourcentages sont clairement définis pour chaque type de plateforme.
4. **Fréquence des paiements** : Vérifiez quand et comment vous serez payé.
5. **Clauses de résiliation** : Comprenez comment mettre fin au contrat si nécessaire.
6. **Droits de propriété** : Confirmez que vous conservez la propriété de vos masters.
7. **Obligations de marketing** : Vérifiez ce que le distributeur s'engage à faire pour promouvoir votre musique.
8. **Transparence des rapports** : Assurez-vous d'avoir accès à des rapports détaillés sur vos ventes et streams.
9. **Avances et recoupement** : Si une avance est proposée, comprenez comment elle sera récupérée.
10. **Droits d'édition** : Assurez-vous que le contrat de distribution ne touche pas à vos droits d'édition.

Je recommande toujours de faire réviser tout contrat par un avocat spécialisé en droit du divertissement avant de signer.`,

  "droits d'auteur": `
Les droits d'auteur en termes simples :

Les droits d'auteur sont les droits légaux qui protègent vos créations musicales dès leur création. Ils fonctionnent comme une forme de propriété intellectuelle.

**Éléments clés :**

1. **Création automatique** : Les droits d'auteur existent dès que votre œuvre est fixée sous une forme tangible (enregistrée, écrite).

2. **Deux types principaux en musique** :
   - **Composition** : La mélodie, les accords et les paroles (appartient au compositeur/parolier)
   - **Enregistrement** : L'enregistrement sonore spécifique (appartient généralement à l'interprète ou au label)

3. **Droits exclusifs** que vous possédez :
   - Reproduire votre œuvre
   - Créer des œuvres dérivées
   - Distribuer des copies
   - Exécuter publiquement
   - Afficher publiquement

4. **Durée** : En France et dans la plupart des pays européens, les droits d'auteur durent toute la vie de l'auteur plus 70 ans.

5. **Revenus** : Vos droits d'auteur génèrent des revenus via :
   - Redevances de diffusion (radio, TV, streaming)
   - Redevances mécaniques (ventes physiques et numériques)
   - Droits de synchronisation (utilisation dans films, publicités)
   - Performances publiques (concerts, établissements)

6. **Gestion collective** : En France, la SACEM gère collectivement certains droits pour faciliter la perception des redevances.

L'enregistrement officiel n'est pas obligatoire mais recommandé pour renforcer votre protection légale.`,

  "redevances mécaniques": `
Les redevances mécaniques sont un concept essentiel dans l'industrie musicale :

**Définition simple :**
Les redevances mécaniques sont les paiements dus aux auteurs-compositeurs et aux éditeurs chaque fois que leur composition est reproduite sur un support physique (CD, vinyle) ou numérique (téléchargements, streaming).

**Origine du terme :**
Le terme "mécanique" date de l'époque où la musique était reproduite mécaniquement sur des pianos mécaniques et phonographes.

**Fonctionnement :**
1. Quand votre chanson est vendue en format physique, téléchargée ou écoutée en streaming, vous avez droit à une redevance.
2. En France, le taux standard est d'environ 9,009% du prix de gros pour les supports physiques.
3. Pour le streaming, le calcul est plus complexe et basé sur un pourcentage des revenus générés par le service.

**Qui les perçoit :**
- La SACEM en France collecte ces redevances.
- Si vous avez un éditeur, il perçoit généralement ces redevances et vous reverse votre part (souvent 50/50 selon le contrat d'édition).
- En auto-édition, vous recevez l'intégralité via votre société de gestion collective.

**Différence avec les royalties de streaming :**
- Les redevances mécaniques concernent la composition (partition et paroles).
- Les royalties de streaming incluent aussi la part pour l'enregistrement sonore (master).

**Points importants :**
- Ces redevances sont distinctes des droits de diffusion publique.
- Pour le streaming, chaque écoute génère à la fois des redevances mécaniques et des droits de diffusion.
- Les taux varient selon les pays et les accords en place.

Ces redevances constituent une source de revenus importante pour les compositeurs, même s'ils ne sont pas les interprètes de leurs œuvres.`,

  "default": `
Je vous remercie pour votre question. Bien que je sois spécialisé dans le droit musical, je ne peux pas accéder à l'API externe actuellement en raison d'une limitation technique.

Voici quelques informations générales qui pourraient vous être utiles :

Les aspects juridiques de l'industrie musicale comprennent les droits d'auteur, les contrats d'édition, les accords de distribution, les licences de synchronisation, et la protection de la propriété intellectuelle.

Pour obtenir des conseils juridiques précis adaptés à votre situation, je vous recommande de :

1. Consulter un avocat spécialisé en droit du divertissement
2. Contacter une organisation comme la SACEM qui peut offrir des ressources aux artistes
3. Explorer les ressources éducatives disponibles sur le site de BAVEU

Y a-t-il un aspect particulier du droit musical sur lequel vous souhaiteriez en savoir plus ? Je ferai de mon mieux pour vous orienter avec les informations dont je dispose.`
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

// Fonction pour appeler l'API AIML
const callAimlApi = async (
  formattedMessages: any[],
  onSuccess: (response: any) => void,
  onError: (error: Error) => void
) => {
  try {
    const apiKey = localStorage.getItem('baveu-api-key') || 'b1422c38a2f449d18d57efe78fb1e0e2';
    
    const response = await fetch('https://api.aiml-api.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: formattedMessages,
        model: 'gpt-4',
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    onSuccess(data);
    
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API AIML:', error);
    onError(error as Error);
  }
};

// Fonction pour appeler l'API OpenAI
const callOpenAiApi = async (
  formattedMessages: any[],
  onSuccess: (response: any) => void,
  onError: (error: Error) => void
) => {
  try {
    const apiKey = localStorage.getItem('baveu-api-key') || '';
    
    if (!apiKey) {
      throw new Error('Clé API OpenAI manquante. Veuillez configurer votre clé API dans les paramètres.');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: formattedMessages,
        model: 'gpt-4o',
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API OpenAI: ${response.status}`);
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
    
    // Préparer les messages pour l'API
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

    try {
      // Déterminer quel fournisseur d'API utiliser
      const apiProvider = localStorage.getItem('baveu-api-provider') as ApiProvider || 'aiml';
      
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
      
      if (apiProvider === 'openai') {
        await callOpenAiApi(formattedMessages, handleApiSuccess, (error) => {
          throw error;
        });
      } else {
        await callAimlApi(formattedMessages, handleApiSuccess, (error) => {
          throw error;
        });
      }
      
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
