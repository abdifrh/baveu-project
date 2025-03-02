
import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, FilePlus, FileText, Handshake } from 'lucide-react';
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
