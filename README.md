# Star Wars Characters Explorer

A React application that allows users to explore characters from the Star Wars universe. Built with React, TypeScript, and Vite.

## Features

- Browse Star Wars characters with infinite scrolling
- Search characters by name
- AI-powered natural language search
- Detailed character pages with information about films, vehicles, and starships
- Responsive design with dark mode support
- Fast and efficient with data prefetching and caching

## Tech Stack

- React 18
- TypeScript
- Vite
- TanStack Query (React Query)
- Tailwind CSS
- Shadcn/ui Components
- React Router DOM
- NUQS for URL state management

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn or bun
- Google AI API key (for AI-powered search)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/DivinPrince/star-wars-characters-explorer.git star-wars-character-explorer
cd star-wars-character-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn
# or
bun install
```

3. Create a `.env` file in the root directory and add your Google AI API key:
```bash
VITE_AI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open your browser and visit `http://localhost:5173`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| VITE_AI_API_KEY | Google AI API key for natural language search | Yes |

## Getting an API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" button
4. Copy the generated API key
5. Paste it into your `.env` file as `VITE_AI_API_KEY`

Note: The API key is required for the AI-powered natural language search feature. Without it, only basic name-based search will be available.



## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── character/      # Character-related components
│   └── ui/            # Generic UI components
├── hooks/             # Custom React hooks
│   └── api/          # API-related hooks
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
└── App.tsx           # Root component
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API Integration

This project uses the [SWAPI (Star Wars API)](https://swapi.dev/) for fetching character data. The application implements:

- Character listing with pagination
- Character search
- Detailed character information
- Related data (films, vehicles, starships)

## Performance Optimizations

- Query caching with TanStack Query
- Infinite scrolling for efficient data loading
- Debounced search to prevent excessive API calls
- Image lazy loading

## Known Issues

- SWAPI API can be slow to respond at times
- Some character images may be missing
- AI search requires API key configuration

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed
2. Verify environment variables are set correctly
3. Clear browser cache and local storage
4. Check console for error messages

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [SWAPI](https://swapi.dev/) for providing the Star Wars API
- [Lucide Icons](https://lucide.dev/) for the icon set
- [shadcn/ui](https://ui.shadcn.com/) for UI components
