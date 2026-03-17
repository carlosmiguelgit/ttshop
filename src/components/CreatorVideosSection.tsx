import React from 'react';
import { Play } from 'lucide-react';

const videos = [
  { id: 1, thumb: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp", author: "Juju indica", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, thumb: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp", author: "mayckon.jho...", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, thumb: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f67585a059d74169b110b05d7a92d14c~tplv-o3syd03w52-resize-webp:800:1443.webp", author: "Daiane Mede...", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, thumb: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dca235c49d1e4eb895d4fe4237e7684d~tplv-o3syd03w52-resize-webp:800:1443.webp", author: "Ana Shop", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const CreatorVideosSection: React.FC = () => {
  return (
    <div className="bg-white p-4 border-t border-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[15px] font-bold text-gray-900">Vídeos de criadores (30+)</h3>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
        {videos.map((video) => (
          <div key={video.id} className="relative flex-shrink-0 w-[140px] h-[220px] rounded-xl overflow-hidden shadow-sm">
            <img src={video.thumb} className="w-full h-full object-cover" alt="Video thumb" />
            <div className="absolute inset-0 bg-black/10"></div>
            
            {/* Ícone de Play */}
            <div className="absolute top-2 left-2">
              <Play size={16} className="text-white fill-white opacity-80" />
            </div>

            {/* Rodapé do vídeo (Autor) */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center space-x-1.5">
              <img src={video.avatar} className="w-5 h-5 rounded-full border border-white" alt="Avatar" />
              <span className="text-[11px] text-white font-bold truncate drop-shadow-md">
                {video.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorVideosSection;