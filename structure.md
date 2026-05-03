{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "NODE_ENV=development vite build --mode development",
    "build:prod": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "pInstall": "pnpm install"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.1",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.15",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@react-three/drei": "^9.88.0",
    "@react-three/fiber": "^8.15.0",
    "@supabase/supabase-js": "^2.57.4",
    "@tanstack/react-query": "^5.86.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.12",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.542.0",
    "next-themes": "^0.4.6",
    "react": "^19.1.1",
    "react-day-picker": "^9.9.0",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.62.0",
    "react-resizable-panels": "^3.0.5",
    "react-router-dom": "^7.8.2",
    "recharts": "^3.1.2",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "three": "^0.158.0",
    "vaul": "^1.1.2",
    "vite-plugin-enter-dev": "^0.0.2",
    "zod": "^4.1.5"
  },
  "devDependencies": {
    "@babel/core": "^7.28.3",
    "@babel/plugin-transform-react-jsx": "^7.27.1",
    "@eslint/js": "^9.34.0",
    "@tailwindcss/postcss": "^4.1.12",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^24.3.0",
    "@types/react": "^19.1.12",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.2",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.34.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "pnpm": "8.6.12",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.2",
    "typescript-eslint": "^8.42.0",
    "vite": "^7.1.4"
  }
}



@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light theme (default - white style) */
    --background: 0 0% 100%;
    --foreground: 0 0% 10%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 10%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10%;

    --primary: 0 0% 10%;
    --primary-foreground: 0 0% 98%;

    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 10%;

    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;

    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 10%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 0 0% 10%;

    --radius: 0.75rem;

    /* Glass effects for light theme */
    --glass-bg: 0 0% 100% / 0.8;
    --glass-border: 0 0% 0% / 0.1;
    --glass-highlight: 0 0% 0% / 0.03;
  }

  .dark {
    /* Dark theme for hero/landing pages */
    --background: 0 0% 2%;
    --foreground: 0 0% 98%;

    --card: 0 0% 5%;
    --card-foreground: 0 0% 98%;

    --popover: 0 0% 5%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 10%;

    --secondary: 0 0% 10%;
    --secondary-foreground: 0 0% 98%;

    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;

    --accent: 0 0% 98%;
    --accent-foreground: 0 0% 10%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 0 0% 98%;

    --glass-bg: 0 0% 0% / 0.3;
    --glass-border: 0 0% 100% / 0.1;
    --glass-highlight: 0 0% 100% / 0.05;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

html,
body,
#root {
  width: 100%;
  height: 100%;
}


#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}



import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AuraBackground from './AuraBackground';
import Logo from './Logo';

export default function HeroLanding({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      <AuraBackground />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <span className="text-xl font-semibold">Aura</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="/api" className="hover:text-white/80 transition-colors">API</a>
          <a href="/company" className="hover:text-white/80 transition-colors">COMPANY</a>
          <a href="/news" className="hover:text-white/80 transition-colors">NEWS</a>
        </nav>

        <button
          onClick={onGetStarted}
          className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-all text-sm"
        >
          TRY AURA
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-bold leading-none tracking-tight mb-8 bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            aura
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <div className="relative group">
            <input
              type="text"
              placeholder="Ask Aura anything..."
              className="w-full px-8 py-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-all pr-16"
              onFocus={(e) => e.currentTarget.blur()}
              onClick={onGetStarted}
            />
            <button
              onClick={onGetStarted}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex gap-4"
        >
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all"
          >
            BUILD WITH AURA
          </button>
          <button className="px-8 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all">
            LEARN MORE
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-white/60 text-center max-w-2xl"
        >
          We are thrilled to unveil Aura 3, our most advanced model yet,
          <br />
          blending superior reasoning with extensive pretraining knowledge.
        </motion.p>
      </div>
    </div>
  );
}


export default function AuraBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <iframe 
        src='https://my.spline.design/blackhole-TmXxFv9G3ybkdijw4OSNNCme/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        className="w-full h-full"
        title="Black Hole Background"
      />
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
}


