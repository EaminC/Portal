import { FileText, Image as ImageIcon, Download, Share2, Star } from 'lucide-react';
import { useState } from 'react';

interface Work {
  img: string;
  des: string;
}

interface WorkDetailProps {
  work: Work;
  workName: string;
}

export function WorkDetail({ work, workName }: WorkDetailProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
          <Star className="w-4 h-4 text-pink-400" />
          <span className="text-pink-400 text-sm font-mono">FEATURED WORK</span>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative mb-8 group">
        <div className="relative overflow-hidden rounded-2xl bg-black border border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.2)]">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
          )}
          
          {/* White background container for pixel art */}
          <div className="aspect-video bg-white p-8 flex items-center justify-center">
            <img
              src={work.img}
              alt={workName}
              onLoad={() => setImageLoaded(true)}
              className="max-w-full max-h-full object-contain relative z-10"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          
          {/* Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Corner Frames */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-400"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-purple-400"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-purple-400"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-pink-400"></div>

          {/* Scan Line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent h-32 translate-y-[-100%] group-hover:translate-y-[400%] transition-transform duration-2000"></div>
        </div>

        {/* Actions Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button className="px-6 py-3 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            <Download className="w-4 h-4" />
            <span className="font-mono text-sm">DOWNLOAD</span>
          </button>
          <button className="px-6 py-3 bg-purple-500/20 backdrop-blur-md border border-purple-400/50 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Share2 className="w-4 h-4" />
            <span className="font-mono text-sm">SHARE</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Structure */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-cyan-400">File Structure</h2>
            </div>
            
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-2 text-cyan-400/80 hover:text-cyan-400 transition-colors cursor-pointer group">
                <span className="text-purple-400">📁</span>
                <span className="group-hover:translate-x-1 transition-transform">{workName}/</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400/60 hover:text-cyan-400 transition-colors cursor-pointer pl-6 group">
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span className="group-hover:translate-x-1 transition-transform">img.jpg</span>
                <span className="ml-auto text-xs text-green-400">●</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400/60 hover:text-cyan-400 transition-colors cursor-pointer pl-6 group">
                <FileText className="w-4 h-4 text-green-400" />
                <span className="group-hover:translate-x-1 transition-transform">des.txt</span>
                <span className="ml-auto text-xs text-green-400">●</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-cyan-500/20 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-cyan-400/60 font-mono">Size:</span>
                <span className="text-cyan-400 font-mono">2.4 MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cyan-400/60 font-mono">Modified:</span>
                <span className="text-cyan-400 font-mono">{new Date().toLocaleDateString('en-US')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cyan-400/60 font-mono">Type:</span>
                <span className="text-purple-400 font-mono">DIRECTORY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 h-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-purple-400">Work Description</h2>
              <span className="ml-auto text-green-400 font-mono text-sm">des.txt</span>
            </div>
            
            {/* Terminal Style Output */}
            <div className="bg-black/40 rounded-lg p-6 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-cyan-400/60 font-mono text-xs ml-2">$ cat des.txt</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-cyan-400/90 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                  {work.des}
                </p>
                
                {/* Cursor */}
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-mono">$</span>
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse"></span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Creative', 'Featured', 'Portfolio', '2025'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-sm font-mono hover:bg-pink-500/20 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="mt-8 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 font-mono text-sm">STATUS: ACTIVE</span>
            </div>
            <div className="h-4 w-px bg-cyan-500/30"></div>
            <span className="text-cyan-400/60 font-mono text-sm">CHECKSUM: OK</span>
          </div>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-cyan-400/20 rounded-full overflow-hidden"
              >
                <div 
                  className="w-full bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full transition-all duration-300"
                  style={{ 
                    height: `${Math.random() * 100}%`,
                    animation: `pulse ${1 + Math.random()}s ease-in-out infinite`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}