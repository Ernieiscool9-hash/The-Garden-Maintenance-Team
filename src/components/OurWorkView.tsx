import React, { useState } from 'react';
import { WorkGalleryItem, ServiceCategory } from '../types/gardening';
import {
  Sparkles,
  MapPin,
  Calendar,
  User,
  Plus,
  Phone,
  ArrowRight,
  Filter,
  Search,
  Eye,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { AddPicModal } from './AddPicModal';

interface OurWorkViewProps {
  galleryItems: WorkGalleryItem[];
  isAdmin?: boolean;
  onAddPic?: (pic: WorkGalleryItem) => void;
  onDeletePic?: (id: string) => void;
  onCallToBookQuote?: (details?: any) => void;
  supportPhone?: string;
  businessName?: string;
}

export const OurWorkView: React.FC<OurWorkViewProps> = ({
  galleryItems,
  isAdmin = false,
  onAddPic,
  onDeletePic,
  onCallToBookQuote,
  supportPhone = '+44 20 7946 0912',
  businessName = 'Verdant'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPicModalOpen, setIsAddPicModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WorkGalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'lawn', label: 'Lawn Care' },
    { id: 'hedge', label: 'Hedge Trimming' },
    { id: 'clearance', label: 'Clearance' },
    { id: 'planting', label: 'Planting & Mulch' },
    { id: 'trees', label: 'Tree Pruning' },
    { id: 'transformation', label: 'Transformations' },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.gardenerName && item.gardenerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#F8F9F5] min-h-[80vh]">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Portfolio & Real Work</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 font-bold mb-3 tracking-tight">
              See Our Work
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Explore real garden care and transformations completed by our local gardeners.
              From razor-sharp lawn edges and level hedges to full garden revivals.
            </p>
          </div>

          {/* Quick Actions & Admin Add Pics */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {isAdmin && onAddPic && (
              <button
                type="button"
                onClick={() => setIsAddPicModalOpen(true)}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Pics</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onCallToBookQuote?.()}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Book Similar Job</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by area or job type..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">No pictures found</h3>
              <p className="text-xs text-stone-500 mt-1">
                Try selecting "All Work" or clearing your search.
              </p>
            </div>
            {isAdmin && onAddPic && (
              <button
                type="button"
                onClick={() => setIsAddPicModalOpen(true)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Picture</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to view details</span>
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.category}
                  </div>

                  {/* Admin delete button */}
                  {isAdmin && onDeletePic && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete picture "${item.title}"?`)) {
                          onDeletePic(item.id);
                        }
                      }}
                      className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-lg text-xs shadow-md cursor-pointer transition-colors"
                      title="Delete picture"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Card details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="font-serif font-bold text-stone-900 text-lg mb-2 group-hover:text-emerald-900 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.gardenerName || 'Verdant Team'}</span>
                    </div>
                    {item.completedDate && (
                      <span>{item.completedDate}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 bg-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Guaranteed Quality Every Time</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
              Ready to give your garden the care it deserves?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Speak with our team to lock in a free upfront quote. Fully insured gardeners and all equipment included.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onCallToBookQuote?.()}
              className="py-3 px-6 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call to Book Quote</span>
            </button>
            <a
              href={`tel:${supportPhone.replace(/\s+/g, '')}`}
              className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <span className="text-stone-300 font-normal">Call direct:</span>
              <span className="text-emerald-300 font-mono font-bold">{supportPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Picture Details Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 text-left my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-stone-900">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedItem.category}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold mb-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{selectedItem.location}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  {selectedItem.title}
                </h3>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-200">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-stone-400" />
                  <span>Completed by: <strong>{selectedItem.gardenerName || 'Verdant Team'}</strong></span>
                </div>
                {selectedItem.completedDate && (
                  <span>Date: {selectedItem.completedDate}</span>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(null);
                    onCallToBookQuote?.({ serviceTitle: selectedItem.title });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Book This Kind of Work</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Pic Modal */}
      {isAddPicModalOpen && onAddPic && (
        <AddPicModal
          isOpen={isAddPicModalOpen}
          onClose={() => setIsAddPicModalOpen(false)}
          onAddPic={onAddPic}
        />
      )}
    </div>
  );
};
