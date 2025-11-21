// Portfolio data structure
export interface Work {
  img: string;
  des: string;
}

export interface Portfolio {
  [theme: string]: {
    [workName: string]: Work;
  };
}

/**
 * Load portfolio data from the file system
 * This function reads the portfolio.json file that should be generated
 * by the generate-portfolio.js script
 * 
 * File structure:
 * - public/portfolio/
 *   - Theme Name/ (folder name = theme name)
 *     - Work Name 1/ (folder name = work name)
 *       - img.jpg (required)
 *       - des.txt (required)
 *     - Work Name 2/
 *       - img.jpg
 *       - des.txt
 */
export async function loadPortfolio(): Promise<Portfolio> {
  try {
    const data = await loadPortfolioJson();
    if (!data) {
      return {};
    }
    return transformPortfolioData(data);
  } catch (error) {
    console.error('Error loading portfolio:', error);
    // Return empty portfolio if file doesn't exist
    return {};
  }
}

/**
 * Transform the portfolio.json structure to match the app's expected format
 * Theme names and work names are automatically read from folder names
 */
function transformPortfolioData(data: {
  themes: Array<{
    name: string;  // Theme folder name (automatically read from filesystem)
    path: string;  // Theme folder path (same as name)
    works: Array<{
      name: string;  // Work folder name (automatically read from filesystem)
      path: string; // Work folder path (same as name)
    }>;
  }>;
}): Portfolio {
  const portfolio: Portfolio = {};

  data.themes.forEach((theme) => {
    // Theme name is automatically read from folder name
    portfolio[theme.name] = {};
    theme.works.forEach((work) => {
      // Work name is automatically read from folder name
      // Each work must have img.jpg and des.txt in its folder
      portfolio[theme.name][work.name] = {
        img: `/portfolio/${theme.path}/${work.path}/img.jpg`,
        des: '', // Will be loaded separately from des.txt
      };
    });
  });

  return portfolio;
}

/**
 * Load description for a specific work
 */
export async function loadWorkDescription(
  themePath: string,
  workPath: string
): Promise<string> {
  try {
    const response = await fetch(`/portfolio/${themePath}/${workPath}/des.txt`);
    if (!response.ok) {
      return 'No description available.';
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading description:', error);
    return 'No description available.';
  }
}

/**
 * Get theme path from portfolio.json data
 * Theme path is the same as theme name (folder name)
 */
let portfolioJsonData: {
  themes: Array<{
    name: string;
    path: string;
    works: Array<{
      name: string;
      path: string;
    }>;
  }>;
} | null = null;

export async function loadPortfolioJson(): Promise<typeof portfolioJsonData> {
  if (portfolioJsonData) {
    return portfolioJsonData;
  }
  
  try {
    const response = await fetch('/portfolio/portfolio.json');
    if (!response.ok) {
      throw new Error('Failed to load portfolio.json');
    }
    portfolioJsonData = await response.json();
    return portfolioJsonData;
  } catch (error) {
    console.error('Error loading portfolio.json:', error);
    return null;
  }
}

/**
 * Get theme path from theme name
 * Theme path is automatically the same as theme folder name
 */
export async function getThemePath(themeName: string): Promise<string> {
  const data = await loadPortfolioJson();
  if (!data) {
    return themeName; // Fallback to theme name
  }
  
  const theme = data.themes.find(t => t.name === themeName);
  return theme?.path || themeName;
}

