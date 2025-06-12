'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define your gallery categories and images here
const galleryCategories = [
  {
    name: 'Mural',
    folder: 'Mural',
    images: [
      'mural1.jpg',
      'mural2.jpg',
      'mural3.jpg',
    ],
  },
  {
    name: 'Portrait',
    folder: 'Portrait',
    images: [
      'portrait1.jpg',
      'portrait2.jpg',
      'portrait3.jpg',
    ],
  },
  {
    name: 'Abstract',
    folder: 'Abstract',
    images: [
      'abstract1.jpg',
      'abstract2.jpg',
      'abstract3.jpg',
    ],
  },
];

// Flatten all images for the 'All' category
const allImages = galleryCategories.flatMap(cat => cat.images.map(img => ({
  folder: cat.folder,
  img
})));

const allCategory = {
  name: 'All',
  folder: '',
  images: allImages,
};

const categoriesWithAll = [allCategory, ...galleryCategories];

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState(categoriesWithAll[0].name);
  const currentCategory = categoriesWithAll.find(cat => cat.name === selectedCategory);

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Browse our portfolio by category
          </p>
        </motion.div>
      </section>

      {/* Category Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {categoriesWithAll.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Images */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedCategory === 'All'
              ? allImages.map(({ folder, img }, idx) => (
                  <motion.div
                    key={folder + '-' + img + '-' + idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-[350px] w-full">
                      <Image
                        src={`/images/gallery/${folder}/${img}`}
                        alt={`${folder} ${img}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))
              : currentCategory?.images.map((img, idx) => (
                  <motion.div
                    key={currentCategory.folder + '-' + img + '-' + idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-[350px] w-full">
                      <Image
                        src={`/images/gallery/${currentCategory.folder}/${img}`}
                        alt={`${currentCategory.folder} ${img}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
} 