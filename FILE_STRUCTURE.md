# File Structure Guide

This portfolio website is **completely file-system based**. All content is automatically read from the file system - no code changes needed when adding new works!

## Directory Structure

```
public/portfolio/
├── portfolio.json              # Auto-generated index (run: node scripts/generate-portfolio.js)
├── Theme Name/                # Theme folder (name = theme name)
│   ├── Work Name 1/            # Work folder (name = work name)
│   │   ├── img.jpg            # Required: Work image
│   │   └── des.txt            # Required: Work description
│   └── Work Name 2/
│       ├── img.jpg
│       └── des.txt
└── Another Theme/
    └── ...
```

## How It Works

1. **Theme Names**: Automatically read from folder names in `public/portfolio/`
2. **Work Names**: Automatically read from folder names inside theme folders
3. **Required Files**: Each work folder must contain:
   - `img.jpg` - The work image
   - `des.txt` - The work description (plain text)

## Adding New Content

### Add a New Theme

1. Create a new folder in `public/portfolio/`:
   ```bash
   mkdir -p "public/portfolio/Your Theme Name"
   ```

2. Add works to the theme folder (see below)

3. Regenerate the index:
   ```bash
   node scripts/generate-portfolio.js
   ```

### Add a New Work

1. Create a work folder inside a theme folder:
   ```bash
   mkdir -p "public/portfolio/Theme Name/Work Name"
   ```

2. Add the required files:
   ```bash
   # Copy your image
   cp your-image.png "public/portfolio/Theme Name/Work Name/img.jpg"
   
   # Create description
   echo "Your work description here" > "public/portfolio/Theme Name/Work Name/des.txt"
   ```

3. Regenerate the index:
   ```bash
   node scripts/generate-portfolio.js
   ```

4. Refresh your browser - the new work will appear automatically!

## Current Structure

```
public/portfolio/
├── Gingerbread Man/
│   ├── Gingerbread Man 1/
│   │   ├── img.jpg
│   │   └── des.txt
│   └── Gingerbread Man 2/
│       ├── img.jpg
│       └── des.txt
└── School Bear/
    ├── School Bear 1/
    │   ├── img.jpg
    │   └── des.txt
    └── School Bear 2/
        ├── img.jpg
        └── des.txt
```

## Notes

- **Theme names** and **work names** are automatically read from folder names
- No code changes needed when adding content
- Just update the file structure and run `node scripts/generate-portfolio.js`
- The website will automatically display all themes and works

