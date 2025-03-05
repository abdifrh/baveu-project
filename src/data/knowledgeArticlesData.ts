
export interface KnowledgeArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
  slug: string;
}

export const knowledgeArticlesData: KnowledgeArticle[] = [
  {
    id: '1',
    title: 'Comprendre les contrats d\'édition musicale',
    description: 'Un guide complet sur les clauses essentielles des contrats d\'édition musicale, les pièges à éviter et comment négocier des conditions favorables.',
    category: 'Contrats',
    readingTime: 8,
    slug: 'contrats-edition-musicale'
  },
  {
    id: '2',
    title: 'Droits d\'auteur et streaming: ce que vous devez savoir',
    description: 'Explorez comment les droits d\'auteur fonctionnent dans l\'univers du streaming et maximisez vos revenus sur les plateformes numériques.',
    category: 'Droits d\'auteur',
    readingTime: 6,
    slug: 'droits-auteur-streaming'
  },
  {
    id: '3',
    title: 'La synchronisation musicale expliquée',
    description: 'Tout sur les licences de synchronisation: comment placer votre musique dans des films, séries et publicités et en tirer un revenu substantiel.',
    category: 'Licences',
    readingTime: 5,
    slug: 'synchronisation-musicale'
  },
  {
    id: '4',
    title: 'Comment protéger votre musique sans budget',
    description: 'Stratégies accessibles pour protéger légalement vos créations musicales, même avec des ressources limitées.',
    category: 'Protection',
    readingTime: 4,
    slug: 'proteger-musique-sans-budget'
  },
  {
    id: '5',
    title: 'Les sociétés de gestion collective: guide pratique',
    description: 'Fonctionnement de la SACEM et autres sociétés de gestion, processus d\'adhésion et maximisation des collectes de droits.',
    category: 'Gestion collective',
    readingTime: 7,
    slug: 'societes-gestion-collective'
  },
  {
    id: '6',
    title: 'Négocier un contrat de distribution musicale',
    description: 'Les aspects essentiels à négocier dans votre contrat de distribution, physique ou numérique, pour préserver vos intérêts.',
    category: 'Contrats',
    readingTime: 6,
    slug: 'negocier-contrat-distribution'
  },
  {
    id: '7',
    title: 'Comprendre les royalties dans le streaming',
    description: 'Analyse détaillée du calcul des royalties sur les principales plateformes de streaming et stratégies pour les optimiser.',
    category: 'Revenus',
    readingTime: 8,
    slug: 'royalties-streaming'
  },
  {
    id: '8',
    title: 'Les contrats d\'enregistrement: clauses critiques',
    description: 'Décryptage des clauses les plus importantes dans les contrats d\'enregistrement et conseils pour leur négociation.',
    category: 'Contrats',
    readingTime: 9,
    slug: 'contrats-enregistrement-clauses'
  },
  {
    id: '9',
    title: 'Collaborations musicales: aspects juridiques',
    description: 'Cadre juridique des collaborations entre artistes, partage des droits et rédaction de contrats de collaboration.',
    category: 'Collaboration',
    readingTime: 5,
    slug: 'collaborations-aspects-juridiques'
  },
  {
    id: '10',
    title: 'NFT et musique: nouvelles opportunités juridiques',
    description: 'Explorer le cadre juridique des NFT dans l\'industrie musicale et comment les artistes peuvent exploiter cette technologie.',
    category: 'Innovation',
    readingTime: 7,
    slug: 'nft-musique-opportunites'
  },
  {
    id: '11',
    title: 'Comprendre les licences Creative Commons',
    description: 'Guide pratique des différentes licences Creative Commons et comment les utiliser pour protéger et partager votre musique.',
    category: 'Licences',
    readingTime: 4,
    slug: 'licences-creative-commons'
  },
  {
    id: '12',
    title: 'Les droits voisins pour les musiciens',
    description: 'Explication des droits voisins, leur différence avec les droits d\'auteur et comment ils s\'appliquent aux interprètes.',
    category: 'Droits d\'auteur',
    readingTime: 6,
    slug: 'droits-voisins-musiciens'
  }
];
