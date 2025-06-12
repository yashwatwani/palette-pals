'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: 'Murals',
    description: 'Transform your space with custom murals designed to bring your vision to life. Our team specializes in creating stunning wall art for homes, businesses, and public spaces.',
    image: '/images/artwork/urban-mural.jpg',
    link: '/services',
  },
  {
    title: 'Portraits',
    description: 'Capture the essence of your loved ones with our custom portrait services. We offer various styles from realistic to stylized, using different mediums including oil, acrylic, and watercolor.',
    image: '/images/artwork/family-portrait.jpg',
    link: '/services',
  },
  {
    title: 'Abstract Art',
    description: 'Express your unique style with custom abstract art pieces. Our artists work closely with you to create pieces that complement your space and reflect your personality.',
    image: '/images/artwork/abstract-dreams.jpg',
    link: '/services',
  },
];

const recentWork = [
  {
    image: '/images/artwork/urban-mural.jpg',
    alt: 'Urban Mural',
  },
  {
    image: '/images/artwork/family-portrait.jpg',
    alt: 'Family Portrait',
  },
  {
    image: '/images/artwork/nature-symphony.jpg',
    alt: 'Nature Symphony',
  },
  {
    image: '/images/artwork/abstract-dreams.jpg',
    alt: 'Abstract Dreams',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-bg.jpg"
            alt="Artistic background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-pink-100/60" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Bringing Your Vision to Life
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-700"
        >
          Custom murals, portraits, and artwork for your home or business
        </motion.p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Link
            href="/contact"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            href="/work"
            className="inline-block bg-white text-pink-600 border border-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            View Our Work
          </Link>
        </div>
      </section>

      {/* Our Services */}
      <section className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Services</h2>
            <p className="text-xl text-gray-600">We offer a wide range of artistic services to meet your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={service.title} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative h-56 w-full rounded-t-xl overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
                  <Link href={service.link} className="inline-block mt-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors">Learn More</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/services" className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Our Recent Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Recent Work</h2>
            <p className="text-xl text-gray-600">Take a look at some of our latest projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {recentWork.map((item, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-56 w-full">
                  <Image src={item.image} alt={item.alt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/work" className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8">Contact us today to discuss your project and bring your vision to life.</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
