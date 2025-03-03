import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, FilePlus, FileText, Handshake, BookMarked, Scale, FileWarning } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PageHeader from '@/components/UI/PageHeader';
import GlassCard from '@/components/UI/GlassCard';

// Catégories de la base de connaissances
const categories = [
  {
    id: 'contracts',
    title: 'Types de Contrats',
    icon: FilePlus,
    description: 'Différents types de contrats dans l\'industrie musicale'
  },
  {
    id: 'terms',
    title: 'Termes Juridiques',
    icon: FileText,
    description: 'Terminologie juridique courante dans les contrats musicaux'
  },
  {
    id: 'negotiation',
    title: 'Conseils de Négociation',
    icon: Handshake,
    description: 'Comment aborder les négociations contractuelles'
  },
  {
    id: 'international',
    title: 'Droit International',
    icon: Scale,
    description: 'Aspects juridiques internationaux de l\'industrie musicale'
  },
  {
    id: 'disputes',
    title: 'Résolution des Litiges',
    icon: FileWarning,
    description: 'Gestion des conflits et litiges dans l\'industrie musicale'
  },
  {
    id: 'digital',
    title: 'Droits Numériques',
    icon: BookMarked,
    description: 'Droits numériques et streaming dans l\'industrie musicale'
  }
];

// Exemples d'éléments de la base de connaissances
const knowledgeItems = [
  {
    id: '1',
    category: 'contracts',
    title: 'Contrat d\'Enregistrement',
    summary: 'Accord entre un artiste et un label pour l\'enregistrement et la distribution de musique',
    content: `
      Un contrat d'enregistrement (aussi connu sous le nom de contrat discographique) est un accord entre un artiste et un label discographique où le label s'engage à produire, distribuer et commercialiser la musique de l'artiste. En retour, l'artiste accorde généralement au label des droits de propriété sur les enregistrements.

      Points clés à comprendre :
      
      - Taux de Redevance : Le pourcentage des revenus que l'artiste reçoit des ventes/streams
      - Avance : Un paiement anticipé récupérable sur les futures redevances
      - Durée : La durée du contrat, souvent définie par cycles d'albums
      - Propriété : Qui possède les enregistrements master (généralement le label)
      - Territoire : Où le label peut distribuer votre musique
      - Options : Le droit du label de prolonger le contrat pour des albums supplémentaires

      De nombreux contrats d'enregistrement sont structurés pour favoriser fortement le label. Les artistes doivent porter une attention particulière aux droits de propriété, aux calculs des redevances et à la façon dont les avances sont récupérées.
    `
  },
  {
    id: '2',
    category: 'contracts',
    title: 'Contrat d\'Édition Musicale',
    summary: 'Contrat qui gère la propriété et l\'administration des compositions musicales',
    content: `
      Un contrat d'édition musicale est un accord entre un auteur-compositeur et un éditeur musical où l'auteur-compositeur accorde certains droits sur ses compositions en échange de promotion, de services d'administration et de collecte de redevances.

      Éléments importants à considérer :
      
      - Cession de Droits d'Auteur : De nombreux éditeurs demandent la propriété partielle ou totale des compositions
      - Droits d'Administration : Droits d'autorisation d'utilisation de votre musique à diverses fins
      - Durée : Période de validité de l'accord
      - Territoire : Portée géographique où l'éditeur représente vos œuvres
      - Avances : Paiements anticipés récupérables sur les futures redevances
      - Commission : Pourcentage que l'éditeur conserve (généralement 10-50%)
      
      Les contrats d'édition peuvent avoir un impact significatif sur les revenus d'un auteur-compositeur pendant des années, voire des décennies. Comprendre quels droits vous cédez et pour combien de temps est essentiel avant de signer.
    `
  },
  {
    id: '3',
    category: 'terms',
    title: 'Redevances Mécaniques',
    summary: 'Paiements pour la reproduction de compositions sur supports physiques ou numériques',
    content: `
      Les redevances mécaniques sont des paiements versés aux auteurs-compositeurs et aux éditeurs pour la reproduction de leurs compositions sur supports physiques (CD, vinyle) ou en téléchargements numériques. Elles sont distinctes des redevances de performance.

      Informations essentielles :
      
      - Aux États-Unis, les taux mécaniques sont fixés par le Copyright Royalty Board
      - Pour les streams, les mécaniques représentent une portion du paiement total des redevances
      - Ces redevances sont généralement collectées par des organisations comme la MLC (aux États-Unis)
      - Pour les produits physiques, le taux actuel est de 9,1¢ par morceau de moins de 5 minutes
      - Pour les téléchargements numériques, le même taux s'applique que pour les produits physiques
      - Pour le streaming, les formules sont plus complexes et évoluent constamment
      
      En tant qu'auteur-compositeur, s'assurer d'être correctement enregistré auprès des sociétés de perception mécanique est essentiel pour collecter toutes les redevances qui vous sont dues.
    `
  },
  {
    id: '4',
    category: 'terms',
    title: 'Œuvre sur Commande',
    summary: 'Désignation juridique où le créateur abandonne ses droits de propriété sur son œuvre',
    content: `
      Une "œuvre sur commande" est une désignation juridique où la personne ou l'entreprise qui commande une œuvre est considérée comme l'auteur et le propriétaire légal, et non le créateur réel. Dans la musique, cela apparaît souvent dans les contrats de producteurs, les contrats de musiciens de session et certains accords d'auteurs-compositeurs.

      Considérations importantes :
      
      - Dans le cadre d'une œuvre sur commande, vous n'avez aucun droit de propriété sur votre création
      - Vous recevez généralement un paiement unique sans redevances continues
      - La partie commanditaire peut utiliser, modifier ou vendre l'œuvre sans votre permission
      - Ces accords peuvent parfois être négociés pour inclure des redevances tout en transférant la propriété
      - Pour les œuvres créatives, envisagez de négocier une licence plutôt qu'une œuvre sur commande lorsque c'est possible
      
      Soyez très prudent avant de signer des contrats d'œuvre sur commande pour votre production créative, car vous abandonnez définitivement tous les droits sur votre travail.
    `
  },
  {
    id: '5',
    category: 'negotiation',
    title: 'Négocier Votre Premier Contrat Discographique',
    summary: 'Stratégies pour aborder votre première négociation de contrat d\'enregistrement',
    content: `
      Lors de la négociation de votre premier contrat discographique, se présenter avec des connaissances est votre meilleure stratégie. Voici les points clés à considérer :

      Étapes de préparation :
      
      - Recherchez les contrats typiques du label et le traitement des artistes
      - Connaissez votre pouvoir de négociation (nombre de streams, audience sur les réseaux sociaux, capacité à attirer du public en live)
      - Identifiez vos points non-négociables vs. flexibles
      - Envisagez de faire examiner le contrat par un avocat spécialisé avant de signer
      
      Domaines clés à surveiller :
      
      - Taux de redevance : La norme de l'industrie est de 15-18% pour les nouveaux artistes, mais peut varier
      - Propriété : Essayez de conserver la propriété ou de sécuriser la réversion des droits après une certaine période
      - Contrôle créatif : Assurez-vous d'avoir votre mot à dire sur les singles, les vidéos, etc.
      - Durée : Des durées initiales plus courtes avec des périodes d'option sont préférables
      - Budget : Une compréhension claire des budgets marketing et d'enregistrement
      
      Rappelez-vous que tout est négociable, mais soyez également réaliste quant à votre pouvoir de négociation en tant que nouvel artiste. Concentrez-vous sur les termes qui auront le plus d'impact sur votre avenir.
    `
  },
  {
    id: '6',
    category: 'negotiation',
    title: 'Signaux d\'Alarme dans les Contrats Musicaux',
    summary: 'Signes d\'avertissement à surveiller lors de l\'examen des accords',
    content: `
      Lors de l'examen des contrats musicaux, surveillez ces signaux d'alarme courants :

      Éléments contractuels préoccupants :
      
      - Droits perpétuels : Accords qui ne se terminent jamais ou qui ont des périodes d'option illimitées
      - Contrats tous droits : Contrats revendiquant des droits sur toutes les sources de revenus (enregistrement, édition, merchandising, tournées)
      - Termes de récupération vagues : Langage peu clair sur les dépenses qui seront imputées sur vos redevances
      - Cross-collateralisation : Permettre au label de récupérer les dépenses d'un projet sur les revenus d'un autre
      - Définitions du bénéfice net : Clauses qui rendent difficile de jamais voir de "profit"
      - Droits d'approbation : La société ayant le dernier mot sur toutes les décisions créatives
      - Territoire trop large : Droits mondiaux pour une petite entreprise qui ne peut pas travailler efficacement à l'échelle mondiale
      
      Si vous rencontrez ces éléments, envisagez de négocier des modifications ou de demander un avis juridique avant de procéder. Ces termes peuvent avoir un impact significatif sur votre carrière et votre potentiel de revenus à long terme.
    `
  },
  {
    id: '7',
    category: 'international',
    title: 'Comprendre les Accords de Licence Internationale',
    summary: 'Guide des licences musicales à travers les frontières et les juridictions',
    content: `
      Les accords de licence internationale permettent à votre musique d'être exploitée légalement dans différents pays. Ils sont essentiels pour les artistes qui cherchent à développer une présence mondiale.

      Considérations clés pour les licences internationales :

      - Territorialité : Les droits d'auteur sont territoriaux et varient selon les pays
      - Sociétés de Gestion Collective : Différentes organisations par territoire (SACEM en France, GEMA en Allemagne, etc.)
      - Taux de Redevance : Peuvent varier considérablement d'un pays à l'autre
      - Retenues Fiscales : Certains pays appliquent des retenues à la source sur les redevances internationales
      - Conversion de Devises : Les fluctuations des taux de change peuvent affecter vos revenus
      - Clauses de Sous-licence : Déterminent comment votre musique peut être redistribuée
      
      Il est souvent recommandé de travailler avec un éditeur ou un distributeur qui a de l'expérience dans les territoires cibles, ou de consulter un avocat spécialisé en droit d'auteur international avant de conclure des accords de licence internationale significatifs.
    `
  },
  {
    id: '8',
    category: 'international',
    title: 'Différences entre le Droit d\'Auteur Européen et Américain',
    summary: 'Comparaison des systèmes de protection des œuvres musicales en Europe et aux États-Unis',
    content: `
      Comprendre les différences fondamentales entre les systèmes de droit d'auteur européen et américain peut vous aider à protéger vos œuvres dans ces importantes régions musicales.

      Principales différences :

      - Durée de Protection : En général, vie de l'auteur + 70 ans en Europe; aux États-Unis, c'est similaire pour les nouvelles œuvres, mais peut varier pour les œuvres plus anciennes
      - Droits Moraux : Fortement protégés en Europe (droit à la paternité, droit à l'intégrité); limités aux arts visuels aux États-Unis
      - Enregistrement : Obligatoire pour intenter une action en justice aux États-Unis; automatique en Europe dès la création
      - Fair Use vs. Exceptions Spécifiques : Concept large de "fair use" aux États-Unis; exceptions plus précises et limitées en Europe
      - Œuvres de Commande : Concept plus développé aux États-Unis; moins établi dans la tradition juridique européenne
      - Sociétés de Gestion Collective : Souvent obligatoires en Europe; plus optionnelles aux États-Unis
      
      Ces différences peuvent avoir un impact significatif sur la façon dont vous structurez vos accords et comment vous protégez vos œuvres lorsque vous opérez des deux côtés de l'Atlantique.
    `
  },
  {
    id: '9',
    category: 'disputes',
    title: 'Résolution des Conflits de Droits d\'Auteur',
    summary: 'Approches pour résoudre les litiges liés aux droits d\'auteur dans le secteur musical',
    content: `
      Les conflits de droits d'auteur sont malheureusement courants dans l'industrie musicale. Connaître vos options de résolution peut vous faire économiser du temps et des ressources.

      Méthodes de résolution :

      - Négociation Directe : Souvent la première étape et la moins coûteuse
      - Médiation : Un tiers neutre aide à trouver un accord mutuellement acceptable
      - Arbitrage : Un arbitre prend une décision contraignante, généralement plus rapide et moins coûteux qu'un procès
      - Litiges Judiciaires : Recours aux tribunaux pour résoudre le conflit, coûteux et potentiellement long
      - Règlement à l'Amiable : La plupart des litiges se terminent par un règlement avant le procès
      
      Éléments à considérer avant d'entamer une procédure :
      
      - Solidité de votre revendication (preuve de création antérieure, originalité de l'œuvre)
      - Coûts potentiels vs. bénéfices attendus
      - Impact sur votre réputation dans l'industrie
      - Délais de prescription (qui varient selon les juridictions)
      
      Il est presque toujours préférable de consulter un avocat spécialisé en propriété intellectuelle dès les premiers signes de conflit potentiel.
    `
  },
  {
    id: '10',
    category: 'disputes',
    title: 'Gérer les Accusations d\'Échantillonnage Non Autorisé',
    summary: 'Comment répondre et se défendre contre les allégations d\'utilisation non autorisée d\'échantillons',
    content: `
      L'échantillonnage est une pratique courante dans de nombreux genres musicaux, mais il peut entraîner des problèmes juridiques sérieux s'il n'est pas correctement autorisé.

      Si vous êtes accusé d'échantillonnage non autorisé :

      - Ne pas ignorer la réclamation : Cela peut conduire à des dommages-intérêts aggravés
      - Évaluer la validité : Déterminer si l'échantillon est réellement présent et substantiel
      - Vérifier le fair use/l'utilisation équitable : Dans certaines juridictions, des utilisations limitées peuvent être permises
      - Options de résolution :
        * Négocier une licence rétroactive
        * Proposer un crédit et un partage des revenus futurs
        * Modifier la piste pour supprimer l'échantillon litigieux
      - Documentation : Conservez tous les documents relatifs à la création de votre œuvre
      
      Prévention pour les futurs projets :
      
      - Obtenir des licences pour tous les échantillons avant la sortie
      - Utiliser des banques d'échantillons sous licence
      - Créer vos propres échantillons ou travailler avec des musiciens de session
      - Consulter un avocat spécialisé en cas de doute
      
      Les règlements pour échantillonnage non autorisé peuvent être coûteux - le cas célèbre de "Bitter Sweet Symphony" des Verve a résulté en la perte de 100% des droits d'auteur de leur plus grand succès.
    `
  },
  {
    id: '11',
    category: 'digital',
    title: 'Maximiser vos Revenus de Streaming',
    summary: 'Stratégies juridiques et contractuelles pour optimiser les revenus des plateformes de streaming',
    content: `
      Les plateformes de streaming dominent désormais la consommation musicale, mais les artistes doivent être stratégiques pour maximiser leurs revenus.

      Approches contractuelles et juridiques :

      - Négociation de Taux Préférentiels : Les artistes établis peuvent négocier des taux plus élevés avec certaines plateformes
      - Distribution Directe vs. Label : Peser les avantages d'un taux plus élevé (distribution directe) contre la promotion et l'avance (label)
      - Structure de Redevances : Comprendre comment les plateformes calculent les paiements (par stream, par part d'écoute, etc.)
      - Répartition des Revenus : S'assurer que les contrats définissent clairement comment les revenus de streaming sont partagés
      - Audit Rights : Inclure des clauses permettant d'auditer les rapports de streaming
      - Transparence : Exiger des rapports détaillés sur les streams par territoire et plateforme
      
      Considérations pratiques :
      
      - Métadonnées : S'assurer que toutes les informations sont correctes pour une attribution appropriée
      - Enregistrement auprès des PROs : S'inscrire auprès des sociétés de gestion collective pour les droits d'exécution publique
      - Suivi des Performances : Utiliser des outils d'analyse pour identifier où votre musique performe le mieux
      
      Le streaming représente désormais plus de 80% des revenus de l'industrie musicale, donc optimiser cette source de revenus est essentiel pour la plupart des artistes.
    `
  },
  {
    id: '12',
    category: 'digital',
    title: 'Droit d\'Auteur et Intelligence Artificielle',
    summary: 'Implications juridiques de l\'IA dans la création et l\'utilisation de la musique',
    content: `
      L'intelligence artificielle transforme rapidement la création musicale, soulevant de nouvelles questions juridiques complexes.

      Questions juridiques émergentes :

      - Propriété des Œuvres Générées par IA : Qui détient les droits ? Le développeur du logiciel, l'utilisateur, ou personne ?
      - Entraînement des IA : L'utilisation d'œuvres protégées pour entraîner des systèmes d'IA constitue-t-elle une violation du droit d'auteur ?
      - Œuvres Dérivées : Les créations basées sur des styles d'artistes existants sont-elles des œuvres dérivées nécessitant autorisation ?
      - Protection des Interprètes : Comment protéger les musiciens contre l'imitation de leur style vocal ou instrumental par l'IA ?
      - Licences et Consentement : Nouveaux modèles nécessaires pour l'utilisation de la musique dans le développement de l'IA
      
      État actuel de la législation :
      
      - Cadre juridique en évolution : Les lois actuelles n'ont pas été conçues pour l'ère de l'IA
      - Variations internationales : Différentes approches selon les pays (certains accordent la protection aux œuvres assistées par IA, d'autres exigent une création humaine)
      - Procès en cours : Plusieurs litiges récents façonnent la jurisprudence dans ce domaine
      
      Recommandations pour les artistes :
      
      - Documenter votre processus créatif humain
      - Être transparent sur l'utilisation de l'IA dans votre création
      - Suivre l'évolution de la législation dans ce domaine
      - Envisager des licences spécifiques pour l'utilisation de votre œuvre dans les systèmes d'IA
      
      Ce domaine juridique évoluera considérablement dans les années à venir, et les précédents établis aujourd'hui auront un impact durable.
    `
  },
  {
    id: '13',
    category: 'terms',
    title: 'Comprendre les Synchronisations',
    summary: 'Tout ce qu\'il faut savoir sur les licences de synchronisation pour la musique dans les médias visuels',
    content: `
      Les licences de synchronisation (ou "synchro") permettent l'utilisation de musique dans des productions audiovisuelles comme les films, émissions TV, publicités, et jeux vidéo.

      Concepts fondamentaux :

      - Double Licence : Une synchro implique généralement deux licences - pour l'enregistrement master (du label/artiste) et pour la composition (de l'éditeur/auteur)
      - Types de Tarification :
        * Forfaitaire : Paiement unique pour l'utilisation
        * À perpétuité vs. Limitée dans le temps : Durée de validité de la licence
        * Par territoire : Spécifique à certaines régions ou mondiale
        * Par média : Télévision, cinéma, streaming, etc.
      - Most Favored Nations (MFN) : Clause garantissant le même taux pour l'enregistrement et la composition
      - Exclusivité : Peut limiter l'utilisation de votre musique dans des productions concurrentes
      
      Opportunités financières :

      - Les synchros peuvent représenter une source de revenus significative (de quelques centaines à plusieurs centaines de milliers d'euros)
      - Peuvent générer des redevances supplémentaires (diffusion TV, streaming)
      - Souvent payées d'avance et non récupérables
      - Peuvent augmenter significativement la découvrabilité de votre musique
      
      Considérations contractuelles :
      
      - Durée et territoires clairement définis
      - Médias spécifiques autorisés
      - Droit de modification de l'œuvre
      - Association avec des marques ou messages (clause morale)
      
      Les placements en synchro sont devenus une part cruciale des revenus pour de nombreux artistes, particulièrement avec le déclin des ventes physiques.
    `
  },
  {
    id: '14',
    category: 'contracts',
    title: 'Contrats de Management Musical',
    summary: 'Points essentiels à comprendre avant de signer avec un manager musical',
    content: `
      Un bon manager peut transformer votre carrière, mais un contrat de management mal négocié peut devenir un obstacle majeur.

      Éléments clés d'un contrat de management :

      - Commission : Généralement 15-20% des revenus bruts, mais peut varier
      - Durée : Typiquement 1-3 ans avec des options de renouvellement
      - Portée des Services : Définition précise des responsabilités du manager
      - Sunset Clause : Période post-contrat pendant laquelle le manager continue à recevoir des commissions (généralement dégressives)
      - Sources de Revenu : Spécifier quels revenus sont commissionnables (et lesquels ne le sont pas)
      - Dépenses : Clarifier qui couvre les frais d'exploitation
      - Clause de Performance : Conditions permettant la résiliation si certains objectifs ne sont pas atteints
      
      Pièges à éviter :

      - Durées excessivement longues sans évaluation de performance
      - Commissions sur des revenus que le manager n'a pas directement influencés
      - Absence de clause de sortie clairement définie
      - Langage vague concernant les services fournis
      - Sunset clauses trop généreuses ou trop longues
      
      Un bon contrat de management devrait être équilibré, offrant au manager une incitation à développer votre carrière tout en vous donnant la flexibilité nécessaire si la relation ne fonctionne pas comme prévu.
    `
  },
  {
    id: '15',
    category: 'negotiation',
    title: 'Négocier avec les Plateformes de Streaming Indépendantes',
    summary: 'Stratégies pour obtenir de meilleures conditions sur les plateformes de streaming de niche',
    content: `
      Les plateformes de streaming indépendantes ou spécialisées peuvent offrir de meilleures conditions que les géants du secteur, particulièrement pour les artistes dans des genres de niche.

      Approches de négociation :

      - Exclusivité Temporaire : Offrir une période d'exclusivité en échange de meilleures conditions
      - Promotion Croisée : Proposer de promouvoir la plateforme auprès de votre audience
      - Forfaits vs Streaming : Certaines plateformes proposent des paiements forfaitaires plutôt qu'un modèle par stream
      - Partage des Données : Négocier l'accès aux données d'auditeurs pour améliorer votre marketing
      - Contenu Exclusif : Proposer du contenu supplémentaire uniquement disponible sur cette plateforme
      
      Évaluation des offres :
      
      - Taux de redevance par stream (peut être significativement plus élevé sur les plateformes spécialisées)
      - Audience cible et adéquation avec votre genre
      - Outils promotionnels disponibles sur la plateforme
      - Fréquence et transparence des paiements
      - Longévité et stabilité financière de la plateforme
      
      Bien que les grandes plateformes offrent une audience plus large, les plateformes indépendantes comme Bandcamp, AudioMack ou celles spécialisées dans des genres spécifiques peuvent offrir une meilleure valeur pour certains artistes, particulièrement en début de carrière ou dans des marchés de niche.
    `
  }
];

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof knowledgeItems[0] | null>(null);

  // Filtrer les éléments de connaissance par terme de recherche et catégorie
  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container py-24">
        <PageHeader
          title="Base de Connaissances"
          description="Explorez notre bibliothèque de ressources juridiques musicales, d'explications contractuelles et de terminologie de l'industrie."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <GlassCard className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher dans la base de connaissances..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent border-b focus:outline-none focus:border-primary transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-display text-lg font-medium flex items-center mb-4">
                <BookOpen className="mr-2 h-5 w-5" />
                Catégories
              </h3>
              
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === null ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Toutes les Catégories
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-center">
                      <category.icon className="mr-2 h-4 w-4" />
                      {category.title}
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {selectedItem ? (
              <GlassCard className="animate-fade-in">
                <button
                  className="mb-4 flex items-center text-sm text-primary hover:underline"
                  onClick={() => setSelectedItem(null)}
                >
                  <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
                  Retour à la liste
                </button>

                <h2 className="font-display text-2xl font-semibold mb-2">{selectedItem.title}</h2>
                <p className="text-muted-foreground mb-6">{selectedItem.summary}</p>
                
                <div className="prose prose-slate max-w-none">
                  {selectedItem.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </GlassCard>
            ) : (
              <>
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredItems.map((item) => (
                      <GlassCard key={item.id} className="hover:shadow-lg cursor-pointer animate-fade-in">
                        <button
                          className="text-left w-full h-full flex flex-col"
                          onClick={() => setSelectedItem(item)}
                        >
                          <h3 className="font-display text-xl font-medium mb-2">{item.title}</h3>
                          <p className="text-muted-foreground mb-4 flex-1">{item.summary}</p>
                          <div className="flex items-center text-primary mt-auto">
                            Lire plus <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </button>
                      </GlassCard>
                    ))}
                  </div>
                ) : (
                  <GlassCard className="text-center py-12">
                    <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-medium mb-2">Aucun résultat trouvé</h3>
                    <p className="text-muted-foreground mb-4">
                      Essayez d'ajuster vos termes de recherche ou le filtre de catégorie.
                    </p>
                  </GlassCard>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KnowledgeBase;
