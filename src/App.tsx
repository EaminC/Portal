import { useState, useEffect } from "react";
import { ThemeGrid } from "./components/ThemeGrid";
import { WorkGrid } from "./components/WorkGrid";
import { WorkDetail } from "./components/WorkDetail";
import { ArrowLeft, Terminal, Zap } from "lucide-react";
import {
  loadPortfolio,
  loadWorkDescription,
  getThemePath,
  type Portfolio,
  type Work,
} from "./utils/portfolioLoader";

// Re-export types for components
export type { Portfolio, Work };

type ViewMode = "themes" | "works" | "detail";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("themes");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedWork, setSelectedWork] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState<Portfolio>({});
  const [workDescriptions, setWorkDescriptions] = useState<
    Record<string, string>
  >({});

  // Load portfolio data on mount
  useEffect(() => {
    async function fetchPortfolio() {
      setIsLoading(true);
      try {
        const data = await loadPortfolio();
        setPortfolioData(data);

        // Preload all descriptions from des.txt files
        const descriptions: Record<string, string> = {};
        for (const [themeName, works] of Object.entries(data)) {
          const themePath = await getThemePath(themeName);
          for (const workName of Object.keys(works)) {
            // Work path is the same as work folder name
            const workPath = workName;
            const key = `${themeName}/${workName}`;
            descriptions[key] = await loadWorkDescription(themePath, workPath);
          }
        }
        setWorkDescriptions(descriptions);
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const handleThemeClick = (theme: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedTheme(theme);
      setViewMode("works");
      setIsLoading(false);
    }, 300);
  };

  const handleWorkClick = async (workName: string) => {
    setIsLoading(true);
    try {
      // Load description from des.txt if not already loaded
      const themePath = await getThemePath(selectedTheme);
      const key = `${selectedTheme}/${workName}`;
      if (!workDescriptions[key]) {
        // Work path is the same as work folder name
        const description = await loadWorkDescription(themePath, workName);
        setWorkDescriptions((prev) => ({ ...prev, [key]: description }));
      }
      setTimeout(() => {
        setSelectedWork(workName);
        setViewMode("detail");
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error("Error loading work:", error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (viewMode === "detail") {
        setViewMode("works");
        setSelectedWork("");
      } else if (viewMode === "works") {
        setViewMode("themes");
        setSelectedTheme("");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.02)_50%)] bg-[length:100%_4px] animate-scan"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-500/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {viewMode !== "themes" && (
              <button
                onClick={handleBack}
                className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
                <span className="text-cyan-400 group-hover:text-cyan-300">
                  BACK
                </span>
              </button>
            )}

            <div className="flex-1 flex items-center gap-4">
              <Terminal className="w-6 h-6 text-cyan-400" />
              <div>
                {viewMode === "themes" && (
                  <div className="flex items-center gap-2">
                    <h1 className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      CYBER GALLERY
                    </h1>
                    <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                )}
                {viewMode === "works" && (
                  <div>
                    <p className="text-cyan-400/60 text-sm font-mono">
                      $ cd {selectedTheme}
                    </p>
                    <h1 className="text-cyan-400">{selectedTheme}</h1>
                  </div>
                )}
                {viewMode === "detail" && (
                  <div>
                    <p className="text-cyan-400/60 text-sm font-mono">
                      $ cat {selectedTheme}/{selectedWork}
                    </p>
                    <h1 className="text-cyan-400">{selectedWork}</h1>
                  </div>
                )}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
              <span className="text-green-400 text-sm font-mono">ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-cyan-400 font-mono animate-pulse">LOADING...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {viewMode === "themes" && (
          <ThemeGrid
            themes={Object.keys(portfolioData)}
            portfolioData={portfolioData}
            onThemeClick={handleThemeClick}
          />
        )}

        {viewMode === "works" && selectedTheme && (
          <WorkGrid
            works={portfolioData[selectedTheme]}
            onWorkClick={handleWorkClick}
          />
        )}

        {viewMode === "detail" && selectedTheme && selectedWork && (
          <WorkDetail
            work={{
              ...portfolioData[selectedTheme][selectedWork],
              des:
                workDescriptions[`${selectedTheme}/${selectedWork}`] ||
                portfolioData[selectedTheme][selectedWork]?.des ||
                "No description available.",
            }}
            workName={selectedWork}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 bg-black/40 backdrop-blur-xl mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-cyan-400/60 font-mono text-sm">
              © 2025 CYBER GALLERY - FILE SYSTEM BASED PORTFOLIO
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></div>
              <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse delay-75"></div>
              <div className="w-1 h-1 rounded-full bg-pink-400 animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
