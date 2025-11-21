import { Folder, ChevronRight, Layers } from 'lucide-react';
import { Portfolio } from '../App';

interface ThemeGridProps {
  themes: string[];
  portfolioData: Portfolio;
  onThemeClick: (theme: string) => void;
}

export function ThemeGrid({ themes, portfolioData, onThemeClick }: ThemeGridProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-mono">DIRECTORY LISTING</span>
        </div>
        <h2 className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-4">
          Select Theme Directory
        </h2>
        <p className="text-cyan-400/60 font-mono">$ ls -la ./portfolio/</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme, index) => {
          const worksCount = Object.keys(portfolioData[theme]).length;
          const firstWork = Object.values(portfolioData[theme])[0];
          
          return (
            <button
              key={theme}
              onClick={() => onThemeClick(theme)}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 text-left hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glowing Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content Container */}
              <div className="relative">
                {/* Image Section */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  {/* White background for pixel art */}
                  <div className="absolute inset-0 bg-white"></div>
                  
                  <img
                    src={firstWork.img}
                    alt={theme}
                    className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-all duration-500"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Scan Line Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>
                  
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Info Section */}
                <div className="p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Folder className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-cyan-400/60 text-xs font-mono mb-1">drwxr-xr-x</div>
                        <h3 className="text-white group-hover:text-cyan-400 transition-colors">
                          {theme}
                        </h3>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.6)]"></div>
                      <span className="text-purple-300 font-mono">{worksCount} files</span>
                    </div>
                    <div className="h-3 w-px bg-cyan-500/30"></div>
                    <div className="text-cyan-400/60 font-mono text-xs">
                      {(() => {
                        // Get the most recent modification date from all works in this theme
                        const works = portfolioData[theme];
                        const dates = Object.values(works)
                          .map(w => w.modified)
                          .filter(Boolean)
                          .sort()
                          .reverse();
                        const latestDate = dates[0];
                        if (latestDate) {
                          return new Date(latestDate).toLocaleDateString('en-US');
                        }
                        return new Date().toLocaleDateString('en-US');
                      })()}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1 bg-cyan-500/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-1000 group-hover:w-full"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-purple-500/30 group-hover:border-purple-400 transition-colors"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}