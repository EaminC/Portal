#!/usr/bin/env node

/**
 * Portfolio Generator Script
 * This script scans the portfolio directory structure and generates portfolio.json
 * Run with: node scripts/generate-portfolio.js
 */

const fs = require('fs');
const path = require('path');

function scanPortfolio(baseDir = path.join(__dirname, '../public/portfolio')) {
  const themes = [];
  
  if (!fs.existsSync(baseDir)) {
    console.warn(`Warning: Portfolio directory not found at ${baseDir}`);
    return { themes: [] };
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    // Skip files and hidden directories
    if (!entry.isDirectory() || entry.name.startsWith('.')) {
      continue;
    }

    // Skip known non-theme directories
    if (entry.name === 'node_modules' || entry.name === '.git') {
      continue;
    }

    const themePath = path.join(baseDir, entry.name);
    const works = [];

    // Check if this directory contains work subdirectories
    const themeEntries = fs.readdirSync(themePath, { withFileTypes: true });
    
    for (const workEntry of themeEntries) {
      if (workEntry.isDirectory()) {
        const workPath = path.join(themePath, workEntry.name);
        const workFiles = fs.readdirSync(workPath);
        
        // Check if it has img.jpg and des.txt (indicating it's a work)
        if (workFiles.includes('img.jpg') && workFiles.includes('des.txt')) {
          // Get file modification dates
          const imgPath = path.join(workPath, 'img.jpg');
          const desPath = path.join(workPath, 'des.txt');
          
          const imgStats = fs.statSync(imgPath);
          const desStats = fs.statSync(desPath);
          
          // Use the most recent modification date between img.jpg and des.txt
          const modifiedDate = imgStats.mtime > desStats.mtime ? imgStats.mtime : desStats.mtime;
          
          works.push({
            name: workEntry.name,
            path: workEntry.name,
            modified: modifiedDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
          });
        }
      }
    }

    // Only add theme if it has works
    if (works.length > 0) {
      themes.push({
        name: entry.name,
        path: entry.name,
        works: works.sort((a, b) => a.name.localeCompare(b.name))
      });
    }
  }

  // Sort themes by name
  themes.sort((a, b) => a.name.localeCompare(b.name));

  return { themes };
}

function generatePortfolioJson() {
  try {
    const portfolioData = scanPortfolio();
    const jsonPath = path.join(__dirname, '../public/portfolio/portfolio.json');
    
    // Ensure directory exists
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(jsonPath, JSON.stringify(portfolioData, null, 2), 'utf8');
    console.log('✅ portfolio.json generated successfully!');
    console.log(`   Found ${portfolioData.themes.length} theme(s) with ${portfolioData.themes.reduce((sum, t) => sum + t.works.length, 0)} total work(s)`);
    
    portfolioData.themes.forEach(theme => {
      console.log(`   - ${theme.name}: ${theme.works.length} work(s)`);
    });
    
    return portfolioData;
  } catch (error) {
    console.error('❌ Error generating portfolio.json:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generatePortfolioJson();
}

module.exports = { scanPortfolio, generatePortfolioJson };

