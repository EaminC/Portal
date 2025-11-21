# Portal

A modern, file-system-based portfolio website built with React, TypeScript, and Vite. This project automatically reads your portfolio structure from the file system, making it easy to add new works without modifying code.

## Features

- 🎨 **File System Based**: Organize your portfolio using folders and files
- 🔄 **Auto-Discovery**: Automatically detects themes and works from folder structure
- 🎯 **Modern UI**: Cyberpunk-inspired design with smooth animations
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds

## Project Structure

```
作品集展示网站/
├── public/
│   └── portfolio/              # Portfolio files go here
│       ├── portfolio.json       # Auto-generated index
│       ├── Theme Name/          # Theme folder (e.g., "School Bear")
│       │   ├── Work Name 1/     # Work folder
│       │   │   ├── img.jpg      # Work image
│       │   │   └── des.txt      # Work description
│       │   └── Work Name 2/
│       │       ├── img.jpg
│       │       └── des.txt
│       └── Another Theme/
│           └── ...
├── src/
│   ├── components/             # React components
│   ├── utils/                  # Utility functions
│   └── App.tsx                 # Main app component
└── scripts/
    └── generate-portfolio.js   # Script to generate portfolio.json
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building

```bash
npm run build
```

## Adding New Works

1. **Create a theme folder** (if it doesn't exist):
   ```bash
   mkdir -p public/portfolio/YourThemeName
   ```

2. **Create a work folder**:
   ```bash
   mkdir -p public/portfolio/YourThemeName/YourWorkName
   ```

3. **Add your files**:
   - Place your image as `img.jpg` in the work folder
   - Create `des.txt` with the work description

4. **Regenerate portfolio.json**:
   ```bash
   node scripts/generate-portfolio.js
   ```

5. **Refresh your browser** - the new work will appear automatically!

## File Structure Rules

- **Theme folders**: Directories inside `public/portfolio/` become themes
- **Work folders**: Directories inside theme folders become works
- **Required files**:
  - `img.jpg`: The work image (will be displayed)
  - `des.txt`: The work description (will be shown in detail view)

## Scripts

### Generate Portfolio Index

```bash
node scripts/generate-portfolio.js
```

This script scans the `public/portfolio/` directory and generates `portfolio.json` with the current structure.

## Technologies

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## License

MIT
