# Norwegian Hotel SEO Scanner

An automated tool to identify Norwegian hotel and hospitality businesses with strong financial health but weak SEO performance — ideal clients for digital marketing services.

## Features

- 🏨 Scan Norwegian municipalities for hotels
- 📊 Financial health analysis (revenue, equity ratio, employees)
- 🔍 SEO score evaluation with issue detection
- 📈 Opportunity scoring combining financial & SEO metrics
- 📁 Export results to CSV
- 🎨 Beautiful Scandinavian-inspired dark theme

## Quick Start

### Option 1: Run the React App

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open http://localhost:5173 in your browser.

### Option 2: Use the Standalone HTML

Simply open `standalone.html` in any modern browser — no build step required!

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy.

## Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop the dist folder to Netlify
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons

## Data Sources (for real implementation)

- **Financial Data**: Brønnøysundregistrene API (https://data.brreg.no/)
- **SEO Analysis**: Google PageSpeed API, Lighthouse, custom scraping
- **Business Discovery**: Norwegian business registry

## License

MIT
