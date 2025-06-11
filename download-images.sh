#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/artwork

# Download placeholder images
curl -o public/images/hero-bg.jpg https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5
curl -o public/images/about-bg.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f
curl -o public/images/services-bg.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f
curl -o public/images/work-bg.jpg https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5
curl -o public/images/studio.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f

# Download artwork images
curl -o public/images/artwork/abstract-dreams.jpg https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5
curl -o public/images/artwork/urban-mural.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f
curl -o public/images/artwork/family-portrait.jpg https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5
curl -o public/images/artwork/nature-symphony.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f
curl -o public/images/artwork/corporate-mural.jpg https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5
curl -o public/images/artwork/wedding-portrait.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f

# Download service images
curl -o public/images/custom-paintings.jpg https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5
curl -o public/images/murals.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f
curl -o public/images/portraits.jpg https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5
curl -o public/images/restoration.jpg https://images.unsplash.com/photo-1513364776144-60967b0f800f 