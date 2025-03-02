
import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, FilePlus, FileText, Handshake } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PageHeader from '@/components/UI/PageHeader';
import GlassCard from '@/components/UI/GlassCard';

// Knowledge base categories
const categories = [
  {
    id: 'contracts',
    title: 'Contract Types',
    icon: FilePlus,
    description: 'Different types of contracts in the music industry'
  },
  {
    id: 'terms',
    title: 'Legal Terms',
    icon: FileText,
    description: 'Common legal terminology in music contracts'
  },
  {
    id: 'negotiation',
    title: 'Negotiation Tips',
    icon: Handshake,
    description: 'How to approach contract negotiations'
  }
];

// Sample knowledge base items
const knowledgeItems = [
  {
    id: '1',
    category: 'contracts',
    title: 'Recording Contract',
    summary: 'Agreement between an artist and a record label for recording and distributing music',
    content: `
      A recording contract (also known as a record deal) is an agreement between an artist and a record label where the label agrees to produce, distribute, and market the artist's music. In return, the artist typically grants the label ownership rights to the recordings.

      Key points to understand:
      
      - Royalty Rate: The percentage of revenue the artist receives from sales/streams
      - Advance: An upfront payment that is recoupable against future royalties
      - Term: How long the contract lasts, often defined by album cycles
      - Ownership: Who owns the master recordings (typically the label)
      - Territory: Where the label can distribute your music
      - Options: The label's right to extend the contract for additional albums

      Many recording contracts are structured to heavily favor the label. Artists should pay special attention to ownership rights, royalty calculations, and how advances are recouped.
    `
  },
  {
    id: '2',
    category: 'contracts',
    title: 'Publishing Agreement',
    summary: 'Contract that manages the ownership and administration of song compositions',
    content: `
      A music publishing agreement is a contract between a songwriter and a music publisher where the songwriter grants certain rights to their compositions in exchange for promotion, administration services, and royalty collection.

      Important elements include:
      
      - Copyright Assignment: Many publishers request partial or full ownership of compositions
      - Admin Rights: Rights to license your music for various uses
      - Term: Duration of the agreement
      - Territory: Geographic scope where the publisher represents your works
      - Advances: Upfront payments recoupable against future royalties
      - Commission: Percentage the publisher keeps (typically 10-50%)
      
      Publishing deals can significantly impact a songwriter's income for years or even decades. Understanding which rights you're giving up and for how long is critical before signing.
    `
  },
  {
    id: '3',
    category: 'terms',
    title: 'Mechanical Royalties',
    summary: 'Payments for the reproduction of compositions in physical or digital formats',
    content: `
      Mechanical royalties are payments made to songwriters and publishers for the reproduction of their compositions in physical formats (CDs, vinyl) or digital downloads. They are distinct from performance royalties.

      Key information:
      
      - In the US, mechanical rates are set by the Copyright Royalty Board
      - For streams, mechanicals are a portion of the total royalty payment
      - These royalties are typically collected by organizations like the MLC (in the US)
      - For physical products, the current rate is 9.1¢ per song under 5 minutes
      - For digital downloads, the same rate applies as physical products
      - For streaming, the formulas are more complex and constantly changing
      
      As a songwriter, ensuring you're registered correctly with mechanical collection societies is essential to collecting all royalties owed to you.
    `
  },
  {
    id: '4',
    category: 'terms',
    title: 'Work For Hire',
    summary: 'Legal designation where creator gives up ownership rights to their work',
    content: `
      A "work for hire" is a legal designation where the person or company that commissions a work is considered the legal author and owner, not the actual creator. In music, this often appears in producer agreements, session musician contracts, and some songwriter agreements.

      Important considerations:
      
      - Under a work for hire, you have no ownership rights to your creation
      - You typically receive a one-time payment with no ongoing royalties
      - The commissioning party can use, modify, or sell the work without your permission
      - These agreements can sometimes be negotiated to include royalties while still transferring ownership
      - For creative work, consider negotiating a license instead of a work for hire when possible
      
      Be very cautious about signing work for hire agreements for your creative output, as you're permanently giving up all rights to your work.
    `
  },
  {
    id: '5',
    category: 'negotiation',
    title: 'Negotiating Your First Record Deal',
    summary: 'Strategies for approaching your first recording contract negotiation',
    content: `
      When negotiating your first record deal, coming prepared with knowledge is your best strategy. Here are key points to consider:

      Preparation steps:
      
      - Research the label's typical deals and artist treatment
      - Know your leverage (streaming numbers, social following, live draw)
      - Identify your non-negotiables vs. flexible points
      - Consider having an entertainment attorney review before signing
      
      Key areas to focus on:
      
      - Royalty rate: Industry standard is 15-18% for new artists, but can vary
      - Ownership: Try to retain ownership or secure rights reversion after a period
      - Creative control: Ensure you have input on singles, videos, etc.
      - Term: Shorter initial terms with option periods are preferable
      - Budget: Clear understanding of marketing and recording budgets
      
      Remember that everything is negotiable, but also be realistic about your bargaining power as a new artist. Focus on the terms that will most impact your future.
    `
  },
  {
    id: '6',
    category: 'negotiation',
    title: 'Red Flags in Music Contracts',
    summary: 'Warning signs to watch for when reviewing agreements',
    content: `
      When reviewing music contracts, watch for these common red flags:

      Concerning contract elements:
      
      - Perpetual rights: Agreements that never end or have unlimited option periods
      - All-rights deals: Contracts claiming rights across all income streams (recording, publishing, merchandise, touring)
      - Vague recoupment terms: Unclear language about what expenses will be charged against your royalties
      - Cross-collateralization: Allowing the label to recoup expenses from one project against revenues from another
      - Net profit definitions: Clauses that make it difficult to ever see "profit"
      - Approval rights: The company having final say on all creative decisions
      - Overly broad territory: Worldwide rights for a small company that can't effectively work globally
      
      If you encounter these elements, consider negotiating modifications or seeking legal advice before proceeding. These terms can significantly impact your career and earning potential long-term.
    `
  }
];

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof knowledgeItems[0] | null>(null);

  // Filter knowledge items by search term and category
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
          title="Knowledge Base"
          description="Explore our library of music legal resources, contract explanations, and industry terminology."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <GlassCard className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent border-b focus:outline-none focus:border-primary transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-display text-lg font-medium flex items-center mb-4">
                <BookOpen className="mr-2 h-5 w-5" />
                Categories
              </h3>
              
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === null ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
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
                  Back to list
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
                            Read more <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </button>
                      </GlassCard>
                    ))}
                  </div>
                ) : (
                  <GlassCard className="text-center py-12">
                    <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or category filter.
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
