# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Ben Bleikamp's personal portfolio website built with Astro and featuring an interactive WebGL shader visualization.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (http://localhost:4321)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Architecture

### Tech Stack
- **Astro 5.1.10** - Static site generator
- **Tailwind CSS v4** - Using the new Vite plugin approach
- **TypeScript** - With strict configuration
- **WebGL** - For interactive shader visualizations

### Project Structure
- Single-page portfolio site with all content in `src/pages/index.astro`
- Interactive WebGL shader component in `src/components/Shader.astro`
- Base layout template in `src/layouts/Layout.astro`
- Global styles using Tailwind CSS in `src/styles/global.css`

### Key Implementation Details

**Shader Component**:
- Uses vanilla WebGL (no Three.js or other libraries)
- Responds to mouse position and velocity
- Only displayed on desktop (hidden on mobile via CSS)
- Implements a flowing, organic visualization with color gradients

**Responsive Design**:
- Desktop: Two-column layout with content on left, shader on right
- Mobile: Single column, shader hidden
- Typography-focused with monospace font

**Build Output**:
- Static files generated to `dist/` directory
- Ready for deployment to any static hosting service