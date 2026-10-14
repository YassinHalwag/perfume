import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Menu, X, Sparkles, Plus, Minus, CheckCircle, 
  ArrowRight, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin, Send, Heart, Eye
} from 'lucide-react';

const PERFUMES = [
  {
    id: '1',
    name: 'Oud Nocturne',
    category: 'Woody',
    price: 185,
    volume: '100ml / 3.4 fl.oz',
    description: 'A deep, enchanting smoky wood wrapped in velvety amber and rare spices harvested from ancient Asian forests.',
    topNotes: ['Cardamom', 'Italian Bergamot', 'Black Pepper'],
    heartNotes: ['Rare Agarwood (Oud)', 'Damask Rose', 'Patchouli'],
    baseNotes: ['Golden Amber', 'Smoky Sandalwood', 'Dark Musk'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: '2',
    name: 'Velvet Jasmine',
    category: 'Floral',
    price: 160,
    volume: '100ml / 3.4 fl.oz',
    description: 'Lush night-blooming white petals captured at dusk, infused with creamy Madagascar vanilla bean.',
    topNotes: ['White Nectarine', 'Crushed Green Leaves'],
    heartNotes: ['Night-blooming Jasmine', 'Indonesian Tuberose', 'Orange Blossom'],
    baseNotes: ['Bourbon Vanilla', 'White Musk', 'Cashmeran'],
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: '3',
    name: 'Soleil D\'Or',
    category: 'Fresh',
    price: 145,
    volume: '100ml / 3.4 fl.oz',
    description: 'Sun-drenched Mediterranean citrus orchards softened by crisp ocean breeze and refined cedarwood.',
    topNotes: ['Calabrian Bergamot', 'Sicilian Lemon Zest', 'Grapefruit'],
    heartNotes: ['Marine Sea Salt', 'Absolute Neroli', 'Thyme'],
    baseNotes: ['Virginian Cedarwood', 'Clean Ambroxan'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: '4',
    name: 'Ambre Imperial',
    category: 'Oriental',
    price: 210,
    volume: '100ml / 3.4 fl.oz',
    description: 'Opulent golden resin infused with toasted Ceylon cinnamon, rich incense, and velvety tonka bean.',
    topNotes: ['Pink Pepper', 'Ceylon Cinnamon Bark', 'Nutmeg'],
    heartNotes: ['Benzoin Resin', 'Somalian Myrrh', 'Labdanum'],
    baseNotes: ['Roasted Tonka Bean', 'Dark Amber', 'Balsam Fir'],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    featured: true,
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'collection' | 'story' | 'contact'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['All', 'Woody', 'Floral', 'Fresh', 'Oriental'];

  // Filter products
  const filteredPerfumes = PERFUMES.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = cartSubtotal > 150 ? 0 : 15;
  const grandTotal = cartSubtotal + (cart.length > 0 ? shippingFee : 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckingOut(false);
    setOrderComplete(true);
    setCart([]);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a09] text-[#e6e2dd] font-sans antialiased selection:bg-[#d4af37] selection:text-black flex flex-col justify-between">
      
      <div>
        {/* Top Announcement Bar */}
        <div className="bg-[#121110] text-[#d4af37] text-[11px] py-2 text-center tracking-[0.25em] uppercase border-b border-[#222]">
          Complimentary express delivery & signature gift wrapping on orders over $150
        </div>

        {/* Navigation Header */}
        <nav className="sticky top-0 z-40 bg-[#0a0a09]/95 backdrop-blur-md border-b border-[#1f1d1a]">
          <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
            >
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-2xl font-serif tracking-[0.25em] text-[#f4f1ea] font-light">AURA & ESSENCE</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium">
              <button 
                onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
                className={`transition-colors py-1 ${currentPage === 'home' ? 'text-[#d4af37] border-b border-[#d4af37]' : 'text-[#a09a93] hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('collection'); window.scrollTo(0, 0); }}
                className={`transition-colors py-1 ${currentPage === 'collection' ? 'text-[#d4af37] border-b border-[#d4af37]' : 'text-[#a09a93] hover:text-white'}`}
              >
                Collection
              </button>
              <button 
                onClick={() => { setCurrentPage('story'); window.scrollTo(0, 0); }}
                className={`transition-colors py-1 ${currentPage === 'story' ? 'text-[#d4af37] border-b border-[#d4af37]' : 'text-[#a09a93] hover:text-white'}`}
              >
                Our Story
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}
                className={`transition-colors py-1 ${currentPage === 'contact' ? 'text-[#d4af37] border-b border-[#d4af37]' : 'text-[#a09a93] hover:text-white'}`}
              >
                Contact Us
              </button>
            </div>

            {/* Actions (Bag & Mobile Menu) */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 bg-[#141312] border border-[#262420] hover:border-[#d4af37] rounded-full transition-all group"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
                <span className="text-xs tracking-wider uppercase hidden sm:inline">Bag</span>
                {totalCartItems > 0 && (
                  <span className="bg-[#d4af37] text-[#0a0a09] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden text-[#f4f1ea] p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#121110] border-b border-[#222] px-6 py-6 space-y-4 flex flex-col text-xs uppercase tracking-[0.2em]">
              <button 
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className={`text-left py-2 ${currentPage === 'home' ? 'text-[#d4af37]' : 'text-[#a09a93]'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('collection'); setMobileMenuOpen(false); }}
                className={`text-left py-2 ${currentPage === 'collection' ? 'text-[#d4af37]' : 'text-[#a09a93]'}`}
              >
                Collection
              </button>
              <button 
                onClick={() => { setCurrentPage('story'); setMobileMenuOpen(false); }}
                className={`text-left py-2 ${currentPage === 'story' ? 'text-[#d4af37]' : 'text-[#a09a93]'}`}
              >
                Our Story
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                className={`text-left py-2 ${currentPage === 'contact' ? 'text-[#d4af37]' : 'text-[#a09a93]'}`}
              >
                Contact Us
              </button>
            </div>
          )}
        </nav>

        {/* PAGE CONTENT */}

        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <main>
            {/* Hero Section */}
            <section className="relative py-28 px-6 max-w-5xl mx-auto text-center overflow-hidden">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1a1714]/40 to-transparent blur-3xl"></div>
              <span className="text-xs font-medium tracking-[0.4em] uppercase text-[#d4af37] mb-4 block">
                Artisanal Haute Parfumerie
              </span>
              <h1 className="text-5xl md:text-7xl font-serif tracking-wide text-[#f4f1ea] mb-6 leading-tight">
                Crafted for the Extraordinary
              </h1>
              <p className="max-w-xl mx-auto text-[#9e968d] text-base md:text-lg mb-10 leading-relaxed font-light">
                Small-batch perfume distilled from rare natural absolutes, aged resin extracts, and master artistry.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button 
                  onClick={() => { setCurrentPage('collection'); window.scrollTo(0, 0); }}
                  className="bg-[#d4af37] hover:bg-[#b8952b] text-[#0a0a09] font-semibold px-8 py-4 rounded-xl text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => { setCurrentPage('story'); window.scrollTo(0, 0); }}
                  className="bg-[#141312] border border-[#262420] hover:border-[#d4af37] text-[#f4f1ea] px-8 py-4 rounded-xl text-xs uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Our Philosophy
                </button>
              </div>
            </section>

            {/* Featured Fragrances Section */}
            <section className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex justify-between items-end mb-10 border-b border-[#222] pb-6">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#d4af37] block mb-1">Curated Selection</span>
                  <h2 className="text-3xl font-serif text-[#f4f1ea]">Signature Creations</h2>
                </div>
                <button 
                  onClick={() => { setCurrentPage('collection'); window.scrollTo(0, 0); }}
                  className="text-xs uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-colors flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PERFUMES.map(perfume => (
                  <div 
                    key={perfume.id} 
                    onClick={() => setSelectedProduct(perfume)}
                    className="bg-[#121110] border border-[#222] rounded-2xl overflow-hidden group hover:border-[#d4af37]/60 transition-all duration-500 flex flex-col justify-between cursor-pointer shadow-xl hover:shadow-[#d4af37]/5"
                  >
                    <div>
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#090807]">
                        <img 
                          src={perfume.image} 
                          alt={perfume.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <span className="absolute top-4 left-4 bg-[#0a0a09]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/30">
                          {perfume.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-serif text-[#f4f1ea] mb-1 group-hover:text-[#d4af37] transition-colors">{perfume.name}</h3>
                        <p className="text-[11px] text-[#d4af37] tracking-wider uppercase mb-3">{perfume.volume}</p>
                        <p className="text-xs text-[#9e968d] mb-4 line-clamp-2 leading-relaxed font-light">{perfume.description}</p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between border-t border-[#1a1816] mt-2">
                      <span className="text-lg font-serif text-[#f4f1ea]">${perfume.price}</span>
                      <button
                        onClick={(e) => addToCart(perfume, e)}
                        className="bg-[#d4af37] hover:bg-[#b8952b] text-[#0a0a09] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        )}

        {/* 2. COLLECTION PAGE */}
        {currentPage === 'collection' && (
          <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-2 block">Catalog</span>
              <h1 className="text-4xl font-serif text-[#f4f1ea] mb-4">The Fragrance Collection</h1>
              <p className="text-xs text-[#9e968d] leading-relaxed">
                Filter through our handcrafted olfactory compositions by fragrance family or search for key botanical notes.
              </p>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-[#121110] p-4 rounded-2xl border border-[#222]">
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-[#d4af37] text-[#0a0a09]'
                        : 'bg-[#1a1918] text-[#9e968d] border border-[#262420] hover:border-[#d4af37]/50 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="flex items-center bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-2.5 w-full md:w-80 focus-within:border-[#d4af37] transition-all">
                <Search className="w-4 h-4 text-[#8a847d] mr-2" />
                <input 
                  type="text"
                  placeholder="Search fragrances, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-[#f4f1ea] placeholder-[#8a847d] focus:outline-none w-full"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-[#8a847d] hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Grid */}
            {filteredPerfumes.length === 0 ? (
              <div className="text-center py-24 bg-[#121110] rounded-2xl border border-[#222]">
                <p className="text-[#9e968d] text-sm mb-4">No exquisite fragrances found matching your search.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="text-[#d4af37] underline text-xs tracking-wider uppercase"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredPerfumes.map(perfume => (
                  <div 
                    key={perfume.id} 
                    onClick={() => setSelectedProduct(perfume)}
                    className="bg-[#121110] border border-[#222] rounded-2xl overflow-hidden group hover:border-[#d4af37]/60 transition-all duration-500 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#090807]">
                        <img 
                          src={perfume.image} 
                          alt={perfume.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <span className="absolute top-4 left-4 bg-[#0a0a09]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/30">
                          {perfume.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-serif text-[#f4f1ea] mb-1 group-hover:text-[#d4af37] transition-colors">{perfume.name}</h3>
                        <p className="text-[11px] text-[#d4af37] tracking-wider uppercase mb-3">{perfume.volume}</p>
                        <p className="text-xs text-[#9e968d] mb-4 leading-relaxed font-light">{perfume.description}</p>
                        
                        {/* Note breakdown */}
                        <div className="space-y-1.5 pt-3 border-t border-[#1f1d1a] text-[11px] text-[#8a847d]">
                          <div><strong className="text-[#e6e2dd] font-medium">Top:</strong> {perfume.topNotes.join(', ')}</div>
                          <div><strong className="text-[#e6e2dd] font-medium">Heart:</strong> {perfume.heartNotes.join(', ')}</div>
                          <div><strong className="text-[#e6e2dd] font-medium">Base:</strong> {perfume.baseNotes.join(', ')}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between border-t border-[#1a1816] mt-4">
                      <span className="text-lg font-serif text-[#f4f1ea]">${perfume.price}</span>
                      <button
                        onClick={(e) => addToCart(perfume, e)}
                        className="bg-[#d4af37] hover:bg-[#b8952b] text-[#0a0a09] px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        )}

        {/* 3. OUR STORY (ABOUT) PAGE */}
        {currentPage === 'story' && (
          <main className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <span className="text-xs font-medium tracking-[0.4em] uppercase text-[#d4af37] mb-3 block">Maison de Parfum</span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#f4f1ea] mb-6">The Art of Aura & Essence</h1>
              <p className="text-sm text-[#9e968d] leading-relaxed max-w-2xl mx-auto font-light">
                Founded on the pursuit of olfactory perfection, Aura & Essence crafts non-commercial, artisanal fragrances designed to linger with distinction.
              </p>
            </div>

            <div className="space-y-16">
              <div className="bg-[#121110] border border-[#222] p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <h3 className="text-2xl font-serif text-[#d4af37] mb-4">Small-Batch Philosophy</h3>
                <p className="text-xs text-[#9e968d] leading-relaxed font-light mb-4">
                  Unlike mass-market perfumes synthesized in industrial quantities, each bottle from Aura & Essence is compounded in strictly limited batches. We allow our rare floral absolutes and natural resins to macerate for up to eight weeks, unlocking rich complexity and incredible longevity on skin.
                </p>
                <p className="text-xs text-[#9e968d] leading-relaxed font-light">
                  Our raw ingredients—from hand-harvested Damask Rose in Grasse to aged Somalian Myrrh—are ethically sourced directly from family-owned estates across the globe.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#121110] border border-[#222] p-8 rounded-2xl">
                  <h4 className="font-serif text-lg text-[#f4f1ea] mb-2">Sustainable Sourcing</h4>
                  <p className="text-xs text-[#8a847d] leading-relaxed">
                    We exclusively partner with growers who practice renewable harvesting, ensuring rare botanicals like wild Agarwood are preserved for generations.
                  </p>
                </div>
                <div className="bg-[#121110] border border-[#222] p-8 rounded-2xl">
                  <h4 className="font-serif text-lg text-[#f4f1ea] mb-2">Zero Synthetic Phthalates</h4>
                  <p className="text-xs text-[#8a847d] leading-relaxed">
                    Our formulations prioritize clean, skin-loving carrier oils and organic grain alcohol without synthetic preservatives or harsh additives.
                  </p>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* 4. CONTACT US PAGE */}
        {currentPage === 'contact' && (
          <main className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-medium tracking-[0.4em] uppercase text-[#d4af37] mb-2 block">At Your Service</span>
              <h1 className="text-4xl font-serif text-[#f4f1ea] mb-4">Contact Our Concierge</h1>
              <p className="text-xs text-[#9e968d] leading-relaxed">
                Have questions regarding custom fragrance formulation, order tracking, or bespoke gift sets? Our concierge team is available to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8 bg-[#121110] p-8 rounded-3xl border border-[#222]">
                <h3 className="text-2xl font-serif text-[#f4f1ea]">Bespoke Flagship Atelier</h3>
                
                <div className="space-y-6 text-xs text-[#9e968d]">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#f4f1ea] block mb-1">Address</strong>
                      742 Rue de la Paix, Atelier 4B<br />Grasse / Paris, France
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#f4f1ea] block mb-1">Email Concierge</strong>
                      concierge@auraandessence.com
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#f4f1ea] block mb-1">Telephone</strong>
                      +33 1 42 68 55 00 (Mon - Fri, 9am - 6pm CET)
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#121110] p-8 rounded-3xl border border-[#222]">
                {contactSent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                    <h4 className="text-xl font-serif text-[#f4f1ea] mb-2">Message Sent</h4>
                    <p className="text-xs text-[#8a847d]">Thank you for reaching out. Our concierge will reply within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9e968d] mb-1">Your Name</label>
                      <input required type="text" placeholder="Julian Vane" className="w-full bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-3 text-xs text-[#f4f1ea] focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9e968d] mb-1">Email Address</label>
                      <input required type="email" placeholder="julian@example.com" className="w-full bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-3 text-xs text-[#f4f1ea] focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9e968d] mb-1">Message / Inquiry</label>
                      <textarea required rows={4} placeholder="Inquiring about bespoke custom formulations..." className="w-full bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-3 text-xs text-[#f4f1ea] focus:outline-none focus:border-[#d4af37] resize-none"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#d4af37] text-[#0a0a09] font-semibold py-3.5 rounded-xl hover:bg-[#b8952b] transition-colors text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                      Send Message <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </main>
        )}

      </div>

      {/* Brand Value Propositions */}
      <section className="border-t border-b border-[#1f1d1a] bg-[#121110]/50 py-16 my-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Truck className="w-8 h-8 text-[#d4af37] mb-4 stroke-1" />
            <h4 className="font-serif text-lg mb-2">Secure Express Delivery</h4>
            <p className="text-xs text-[#9e968d] font-light max-w-xs">Delivered in temperature-controlled luxury packaging with signature samples.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-[#d4af37] mb-4 stroke-1" />
            <h4 className="font-serif text-lg mb-2">Certified Authentic</h4>
            <p className="text-xs text-[#9e968d] font-light max-w-xs">Formulated by master perfumers using sustainably sourced 100% natural absolutes.</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-8 h-8 text-[#d4af37] mb-4 stroke-1" />
            <h4 className="font-serif text-lg mb-2">Complimentary Returns</h4>
            <p className="text-xs text-[#9e968d] font-light max-w-xs">Every full-size flacon includes a matching trial sample to test on skin first.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[#1f1d1a] text-center text-xs text-[#8a847d] w-full">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="font-serif tracking-widest text-[#f4f1ea]">AURA & ESSENCE</span>
        </div>
        <p className="mb-2">© 2026 Aura & Essence Parfumerie. All rights reserved.</p>
        <p>Crafted for distinguished connoisseurs worldwide.</p>
      </footer>

      {/* Product Details Quick-View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141312] border border-[#2a2723] rounded-3xl max-w-3xl w-full overflow-hidden relative shadow-2xl flex flex-col md:flex-row">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-[#0a0a09]/80 text-[#8a847d] hover:text-white p-2 rounded-full border border-[#2a2723]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="md:w-1/2 bg-[#090807] relative aspect-square md:aspect-auto">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] mb-2 block">
                  {selectedProduct.category} Collection
                </span>
                <h2 className="text-3xl font-serif text-[#f4f1ea] mb-2">{selectedProduct.name}</h2>
                <p className="text-sm text-[#d4af37] font-serif mb-4">${selectedProduct.price} • {selectedProduct.volume}</p>
                <p className="text-xs text-[#9e968d] leading-relaxed mb-6 font-light">{selectedProduct.description}</p>
                
                <div className="space-y-2.5 border-t border-b border-[#222] py-4 mb-6 text-xs text-[#9e968d]">
                  <div><strong className="text-[#f4f1ea] font-medium">Top Notes:</strong> {selectedProduct.topNotes.join(', ')}</div>
                  <div><strong className="text-[#f4f1ea] font-medium">Heart Notes:</strong> {selectedProduct.heartNotes.join(', ')}</div>
                  <div><strong className="text-[#f4f1ea] font-medium">Base Notes:</strong> {selectedProduct.baseNotes.join(', ')}</div>
                </div>
              </div>

              <button
                onClick={(e) => { addToCart(selectedProduct, e); setSelectedProduct(null); }}
                className="w-full bg-[#d4af37] hover:bg-[#b8952b] text-[#0a0a09] font-semibold py-3.5 rounded-xl text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Add to Bag — ${selectedProduct.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Bag Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121110] h-full p-6 md:p-8 flex flex-col justify-between border-l border-[#222] shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#222]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                  <h2 className="text-xl font-serif text-[#f4f1ea]">Shopping Bag ({totalCartItems})</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-[#8a847d] hover:text-white p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4 max-h-[55vh] overflow-y-auto pr-2">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-[#8a847d] text-sm mb-4">Your bag is currently empty.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); setCurrentPage('collection'); }}
                      className="text-xs uppercase tracking-widest text-[#d4af37] underline hover:text-white"
                    >
                      Explore fragrances
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-[#0a0a09] p-4 rounded-2xl border border-[#222]">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-[#222]" />
                        <div>
                          <h4 className="font-serif text-sm text-[#f4f1ea]">{item.name}</h4>
                          <p className="text-xs text-[#d4af37]">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-[#141312] border border-[#262420] px-3 py-1.5 rounded-xl">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-[#8a847d] hover:text-white"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="text-xs text-[#f4f1ea] font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-[#8a847d] hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-[#222]">
                <div className="space-y-2 mb-6 text-xs text-[#9e968d]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#f4f1ea]">${cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#f4f1ea]">{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif text-[#f4f1ea] pt-2 border-t border-[#222]">
                    <span>Total</span>
                    <span className="text-[#d4af37]">${grandTotal}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckingOut(true); }}
                  className="w-full bg-[#d4af37] text-[#0a0a09] font-semibold py-4 rounded-xl hover:bg-[#b8952b] transition-colors text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141312] border border-[#2a2723] rounded-3xl max-w-lg w-full p-8 relative shadow-2xl">
            <button onClick={() => setIsCheckingOut(false)} className="absolute top-6 right-6 text-[#8a847d] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-serif text-[#f4f1ea] mb-2">Secure Checkout</h2>
            <p className="text-xs text-[#9e968d] mb-6">Enter your details to finalize your order.</p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e968d] mb-1">Full Name</label>
                <input required type="text" placeholder="Julian Vane" className="w-full bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-3 text-xs text-[#f4f1ea] focus:outline-none focus:border-[#d4af37]" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e968d] mb-1">Shipping Address</label>
                <input required type="text" placeholder="742 Evergreen Terrace, Suite 4B" className="w-full bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-3 text-xs text-[#f4f1ea] focus:outline-none focus:border-[#d4af37]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e968d] mb-1">Card Number</label>
                  <input required type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-3 text-xs text-[#f4f1ea] focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e968d] mb-1">Expiry / CVV</label>
                  <input required type="text" placeholder="MM/YY / CVC" className="w-full bg-[#0a0a09] border border-[#262420] rounded-xl px-4 py-3 text-xs text-[#f4f1ea] focus:outline-none focus:border-[#d4af37]" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#d4af37] text-[#0a0a09] font-semibold py-4 rounded-xl hover:bg-[#b8952b] transition-colors text-xs uppercase tracking-[0.2em] mt-4">
                Pay ${grandTotal} & Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Complete Success Modal */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141312] border border-[#2a2723] rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
            <CheckCircle className="w-16 h-16 text-[#d4af37] mx-auto mb-4 stroke-1" />
            <h2 className="text-2xl font-serif text-[#f4f1ea] mb-2">Order Confirmed</h2>
            <p className="text-xs text-[#9e968d] mb-6 leading-relaxed">
              Thank you for acquiring from Aura & Essence. Your order is being prepared for express delivery.
            </p>
            <button 
              onClick={() => setOrderComplete(false)} 
              className="bg-[#d4af37] text-[#0a0a09] font-semibold px-8 py-3.5 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-[#b8952b] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}