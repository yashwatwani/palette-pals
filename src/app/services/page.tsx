'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    title: 'Custom Paintings',
    description: 'We create unique, personalized paintings that reflect your style and vision. From abstract to realistic, we bring your ideas to life on canvas.',
    features: [
      'Personalized consultation',
      'Custom size options',
      'Various styles and techniques',
      'High-quality materials',
    ],
    image: '/images/custom-paintings.jpg',
  },
  {
    title: 'Murals',
    description: 'Transform your walls into stunning works of art. Our murals can turn any space into a captivating environment that tells your story.',
    features: [
      'Space assessment',
      'Custom design',
      'Professional installation',
      'Durable materials',
    ],
    image: '/images/murals.jpg',
  },
  {
    title: 'Portraits',
    description: 'Capture memories and emotions in beautiful artistic form. Our portraits go beyond photography, creating timeless pieces of art.',
    features: [
      'Multiple style options',
      'Custom framing',
      'Digital preview',
      'Fast turnaround',
    ],
    image: '/images/portraits.jpg',
  },
  {
    title: 'Art Restoration',
    description: 'Preserve and restore your valuable artwork with our expert restoration services. We handle both modern and classical pieces with care.',
    features: [
      'Damage assessment',
      'Color matching',
      'Surface cleaning',
      'Conservation techniques',
    ],
    image: '/images/restoration.jpg',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-bg.jpg"
            alt="Our Services"
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Bringing your artistic vision to life
          </p>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <span className="text-purple-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative h-[400px] rounded-xl overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8">Let's discuss how we can bring your vision to life</p>
            <a
              href="/contact"
              className="inline-block bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 