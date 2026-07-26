# Vertex AI - Professional Website

A modern, professional website for Vertex AI built with React, Next.js, and Tailwind CSS.

## Features

- ✨ Advanced animations (parallax, 3D effects, smooth transitions)
- 🎨 Professional & clean design with blue color scheme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with optimized images
- 🔍 SEO optimized
- 📧 Contact form with validation
- 📝 Blog section
- 🎯 Portfolio/Case Studies showcase

## Services Offered

- Enterprise App Development
- ERP Systems & Integration
- Machine Learning Solutions
- Cloud Infrastructure & DevOps
- Data Analytics & BI
- Cybersecurity & Compliance

## Tech Stack

- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/
│   ├── services/
│   ├── portfolio/
│   ├── team/
│   ├── blog/
│   └── contact/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer
│   ├── HeroSection.tsx     # Hero with animations
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── PortfolioSection.tsx
│   ├── TeamSection.tsx
│   └── ContactForm.tsx
└── public/                 # Static assets
```

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary: Deep Blue (#003366, #0066cc)
- Accent: Cyan (#00d9ff)
- Background: White (#ffffff)

### Content
Update content in component files to match your services, team, portfolio, and blog posts.

## Deployment

The website is ready to deploy on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel will automatically deploy on every push

## License

© 2024 Vertex AI. All rights reserved.
