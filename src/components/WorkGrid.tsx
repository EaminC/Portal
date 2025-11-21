import { FileImage, Eye, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Work {
  img: string;
  des: string;
}

interface WorkGridProps {
  works: { [workName: string]: Work };
  onWorkClick: (workName: string) => void;
}

export function WorkGrid({ works, onWorkClick }: WorkGridProps) {
  const workEntries = Object.entries(works);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div>
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400 text-sm font-mono">COLLECTION</span>
        </div>
        <h2 className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
          Works Collection
        </h2>
        <p className="text-cyan-400/60 font-mono">$ ls -la ./{workEntries.length} items found</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workEntries.map(([workName, work], index) => (
          <button
            key={workName}
            onClick={() => onWorkClick(workName)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 text-left hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
            style={{ 
              animationDelay: `${index * 50}ms`,
              transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)'
            }}
          >
            {/* Image Container */}
            <div className="aspect-square overflow-hidden relative bg-black">
              {/* White background for pixel art */}
              <div className="absolute inset-0 bg-white m-2 rounded"></div>
              
              <img
                src={work.img}
                alt={workName}
                className="w-full h-full object-contain relative z-10 p-4 group-hover:scale-110 transition-all duration-500"
                style={{ imageRendering: 'pixelated' }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Scan Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-20 translate-y-[-100%] group-hover:translate-y-[400%] transition-transform duration-1000"></div>
              
              {/* View Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              {/* Corner Frame */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-400/60"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-cyan-400/60"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60"></div>
            </div>
            
            {/* Content Section */}
            <div className="p-4 relative">
              {/* File Type */}
              <div className="flex items-center gap-2 mb-2">
                <FileImage className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400/80 font-mono text-xs">
                  img.jpg + des.txt
                </span>
              </div>

              {/* Work Name */}
              <h3 className="text-white group-hover:text-cyan-400 transition-colors mb-2">
                {workName}
              </h3>
              
              {/* Description Preview */}
              <p className="text-cyan-400/60 text-sm line-clamp-2 mb-3">
                {work.des}
              </p>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                <span className="text-green-400 font-mono text-xs">READY</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>

            {/* Glowing Edge */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
          </button>
        ))}
      </div>
    </div>
  );
}