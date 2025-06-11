'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// This would typically come from a database or CMS
const artwork = [
  {
    id: 1,
    title: 'Abstract Dreams',
    description: 'A vibrant abstract painting exploring the depths of imagination',
    category: 'paintings',
    image: '/images/artwork/abstract-dreams.jpg',
  },
  {
    id: 2,
    title: 'Urban Mural',
    description: 'Large-scale mural transforming a city wall into a canvas of urban life',
    category: 'murals',
    image: '/images/artwork/urban-mural.jpg',
  },
  {
    id: 3,
    title: 'Family Portrait',
    description: 'A timeless family portrait capturing precious moments',
    category: 'portraits',
    image: '/images/artwork/family-portrait.jpg',
  },
  {
    id: 4,
    title: 'Nature\'s Symphony',
    description: 'A landscape painting celebrating the beauty of nature',
    category: 'paintings',
    image: '/images/artwork/nature-symphony.jpg',
  },
  {
    id: 5,
    title: 'Corporate Mural',
    description: 'Modern mural design for a corporate office space',
    category: 'murals',
    image: '/images/artwork/corporate-mural.jpg',
  },
  {
    id: 6,
    title: 'Wedding Portrait',
    description: 'Romantic wedding portrait in watercolor style',
    category: 'portraits',
    image: '/images/artwork/wedding-portrait.jpg',
  },
];

const categories = ['all', 'paintings', 'murals', 'portraits'];

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artwork[0] | null>(null);

  const filteredArtwork = selectedCategory === 'all'
    ? artwork
    : artwork.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/work-bg.jpg"
            alt="Our Work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Work</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Explore our portfolio of creative projects
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtwork.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedArtwork(item)}
              >
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl max-w-4xl w-full overflow-hidden"
          >
            <div className="relative h-[60vh]">
              <Image
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedArtwork.title}</h3>
              <p className="text-gray-600 mb-4">{selectedArtwork.description}</p>
              <button
                onClick={() => setSelectedArtwork(null)}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 