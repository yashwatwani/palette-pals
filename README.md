# Palette Pals - Art & Design Studio Website

A modern, responsive website for Palette Pals, an art and design studio specializing in paintings, murals, portraits, and custom artwork.

## Features

- Modern, responsive design
- Smooth animations and transitions
- Interactive portfolio gallery
- Contact form
- Service showcase
- About section
- Mobile-friendly navigation

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd palette-pals
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
palette-pals/
├── public/
│   └── images/
│       └── artwork/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── services/
│   │   ├── work/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       └── Navbar.tsx
├── package.json
└── README.md
```

## Adding Images

1. Place your artwork images in the `public/images/artwork/` directory
2. Update the `artwork` array in `src/app/work/page.tsx` with your image paths and details

## Customization

- Colors and styling can be modified in the Tailwind configuration
- Content can be updated in the respective page components
- Images can be replaced in the public directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
