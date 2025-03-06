
export interface Professional {
  id: string;
  name: string;
  category: ProfessionalCategory;
  location: string;
  distance?: number; // en km
  description: string;
  portfolio: PortfolioItem[];
  socialMedia: SocialMedia;
  createdAt: Date;
  avatar: string;
  rating: number;
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  clientName?: string;
  year: number;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  website?: string;
  soundcloud?: string;
}

export type ProfessionalCategory = 
  | "graphiste"
  | "cadreur"
  | "monteur"
  | "maquilleuse"
  | "styliste"
  | "ingénieur son"
  | "motion designer"
  | "ingénieur lumière"
  | "beatmaker"
  | "photographe"
  | "dj"
  | "manager"
  | "producteur";

export const categories: { value: ProfessionalCategory; label: string }[] = [
  { value: "graphiste", label: "Graphiste" },
  { value: "cadreur", label: "Cadreur" },
  { value: "monteur", label: "Monteur" },
  { value: "maquilleuse", label: "Maquilleuse" },
  { value: "styliste", label: "Styliste" },
  { value: "ingénieur son", label: "Ingénieur Son" },
  { value: "motion designer", label: "Motion Designer" },
  { value: "ingénieur lumière", label: "Ingénieur Lumière" },
  { value: "beatmaker", label: "Beatmaker" },
  { value: "photographe", label: "Photographe" },
  { value: "dj", label: "DJ" },
  { value: "manager", label: "Manager" },
  { value: "producteur", label: "Producteur" }
];

export type SortOption = "name" | "recent" | "proximity" | "relevance";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "name", label: "Nom (A-Z)" },
  { value: "recent", label: "Les plus récents" },
  { value: "proximity", label: "Plus proche" },
  { value: "relevance", label: "Pertinence" }
];

// Données fictives de professionnels
export const musicProfessionals: Professional[] = [
  {
    id: "1",
    name: "Sophie Martin",
    category: "graphiste",
    location: "Paris",
    distance: 2,
    description: "Graphiste spécialisée dans la création d'identités visuelles pour artistes musicaux. Plus de 7 ans d'expérience dans la conception de pochettes d'albums, affiches de concerts et merchandising pour artistes indépendants et labels français.",
    portfolio: [
      {
        id: "p1",
        title: "Pochette Album 'Renaissance'",
        description: "Conception de l'identité visuelle complète pour l'album 'Renaissance' de l'artiste Léo Dubois.",
        imageUrl: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1374&auto=format&fit=crop",
        clientName: "Léo Dubois",
        year: 2022
      },
      {
        id: "p2",
        title: "Affiche Festival 'Sons d'été'",
        description: "Création d'affiche et supports de communication pour le festival 'Sons d'été' à Montpellier.",
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1470&auto=format&fit=crop",
        clientName: "Association Sons d'été",
        year: 2021
      }
    ],
    socialMedia: {
      instagram: "sophiegraphiste",
      website: "sophiemartin-design.fr",
      linkedin: "sophiemartindesign"
    },
    createdAt: new Date("2023-01-15"),
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
    rating: 4.8,
    tags: ["identité visuelle", "pochettes d'albums", "logo", "illustration"]
  },
  {
    id: "2",
    name: "Thomas Renault",
    category: "ingénieur son",
    location: "Lyon",
    distance: 5,
    description: "Ingénieur son diplômé de l'École Nationale Supérieure Louis-Lumière. Spécialisé dans l'enregistrement, le mixage et le mastering pour artistes rap et musiques urbaines. Studio équipé aux dernières normes professionnelles.",
    portfolio: [
      {
        id: "p3",
        title: "Mixage EP 'Altitude'",
        description: "Mixage et mastering de l'EP 5 titres 'Altitude' du rappeur Skyline.",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1470&auto=format&fit=crop",
        clientName: "Skyline",
        year: 2023
      },
      {
        id: "p4",
        title: "Enregistrement Live Session",
        description: "Prise de son pour la 'Live Session' du groupe Ondes Parallèles diffusée sur YouTube.",
        imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1470&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clientName: "Ondes Parallèles",
        year: 2022
      }
    ],
    socialMedia: {
      instagram: "thomassoundeng",
      facebook: "ThomasRenaultSound",
      soundcloud: "thomasrenaultsound"
    },
    createdAt: new Date("2022-11-05"),
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop",
    rating: 4.9,
    tags: ["mixage", "mastering", "enregistrement", "production", "rap"]
  },
  {
    id: "3",
    name: "Julia Blanc",
    category: "maquilleuse",
    location: "Marseille",
    distance: 10,
    description: "Maquilleuse professionnelle pour clips vidéos, shootings photos et événements live. Spécialisée dans le maquillage créatif et les effets spéciaux pour l'univers musical. Se déplace dans toute la région PACA.",
    portfolio: [
      {
        id: "p5",
        title: "Maquillage Clip 'Dystopie'",
        description: "Création des looks pour le clip 'Dystopie' de l'artiste électro Marine V.",
        imageUrl: "https://images.unsplash.com/photo-1627057753128-ad6e238d21d5?q=80&w=1374&auto=format&fit=crop",
        clientName: "Marine V",
        year: 2023
      },
      {
        id: "p6",
        title: "Shootings promo 'Les Indomptables'",
        description: "Mise en beauté pour les shootings promotionnels du groupe 'Les Indomptables'.",
        imageUrl: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1374&auto=format&fit=crop",
        clientName: "Les Indomptables",
        year: 2023
      }
    ],
    socialMedia: {
      instagram: "juliablanc_mua",
      facebook: "JuliaBlancMakeup",
      website: "julia-blanc-makeup.com"
    },
    createdAt: new Date("2023-03-20"),
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1376&auto=format&fit=crop",
    rating: 4.7,
    tags: ["maquillage artistique", "clips", "shooting photo", "effets spéciaux"]
  },
  {
    id: "4",
    name: "Karim Benzaoui",
    category: "beatmaker",
    location: "Lille",
    distance: 15,
    description: "Beatmaker avec plus de 10 ans d'expérience dans la composition et la production de musique urbaine. Styles : trap, drill, boom bap et afrobeat. Possibilité de création sur mesure et vente de productions exclusives.",
    portfolio: [
      {
        id: "p7",
        title: "Production 'Nuit sans fin'",
        description: "Beat et production du titre 'Nuit sans fin' certifié single d'or pour le rappeur NoirSombre.",
        imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1469&auto=format&fit=crop",
        clientName: "NoirSombre",
        year: 2022
      },
      {
        id: "p8",
        title: "EP 'Éclats'",
        description: "Production complète de l'EP 'Éclats' pour l'artiste émergente Stella.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop",
        clientName: "Stella",
        year: 2021
      }
    ],
    socialMedia: {
      instagram: "karim_beats",
      youtube: "KarimBeats",
      soundcloud: "karimbeats"
    },
    createdAt: new Date("2022-08-12"),
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
    rating: 4.9,
    tags: ["trap", "drill", "afrobeat", "production", "composition"]
  },
  {
    id: "5",
    name: "Claire Dubois",
    category: "cadreur",
    location: "Bordeaux",
    distance: 8,
    description: "Réalisatrice et cadreuse spécialisée dans les clips musicaux et captations live. Équipée en matériel 4K professionnel. Approche artistique et narrative unique, adaptée à l'univers de chaque artiste.",
    portfolio: [
      {
        id: "p9",
        title: "Clip 'Horizons'",
        description: "Réalisation et cadrage du clip 'Horizons' pour le groupe indie Les Explorateurs.",
        imageUrl: "https://images.unsplash.com/photo-1569508135428-99d404e39f08?q=80&w=1470&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clientName: "Les Explorateurs",
        year: 2023
      },
      {
        id: "p10",
        title: "Captation concert Nouveau Monde",
        description: "Direction de la captation multi-caméras du concert 'Nouveau Monde' à l'Olympia.",
        imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1470&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clientName: "Production Live Nation",
        year: 2022
      }
    ],
    socialMedia: {
      instagram: "clairedbsfilms",
      website: "clairedubois-films.com",
      youtube: "ClaireDBFilms"
    },
    createdAt: new Date("2023-02-01"),
    avatar: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?q=80&w=1470&auto=format&fit=crop",
    rating: 4.8,
    tags: ["clips", "réalisation", "captation live", "4K", "cinématographie"]
  }
];
