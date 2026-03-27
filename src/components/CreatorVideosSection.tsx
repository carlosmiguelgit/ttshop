"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import YouTubePlayerDialog from './YouTubePlayerDialog';

interface VideoItem {
  id: string;
  author: string;
  avatar: string;
}

interface CreatorVideosSectionProps {
  videos?: VideoItem[];
}

const defaultVideos = [
  { id: "IxJqHw_NKTs", author: "Juju indica", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: "72r5fnX12vk", author: "mayckon.jho...", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "dGYEUZB5fgI", author: "Daiane Mede...", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
];

const CreatorVideosSection: React.FC<CreatorVideosSectionProps> = ({ videos = defaultVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="bg-[#F8F8F8] pt-2.5">
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[15px] font-bold text-gray-900">Vídeos de criadores ({videos.length}+)</h3>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="relative flex-shrink-0 w-[140px] h-[220px] rounded-xl overflow-hidden shadow-sm cursor-pointer active:scale-95 transition-transform"
              onClick={() => setSelectedVideo(video.id)}
            >
              <img 
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                className="w-full h-full object-cover" 
                alt="Video thumb" 
              />
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="absolute top-2 left-2">
                <div className="bg-black/40 rounded-full p-1.5 flex items-center justify-center">
                  <Play size={12} className="text-white fill-white" />
                </div>
              </div>

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

      <YouTubePlayerDialog 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
        videoId={selectedVideo} 
      />
    </div>
  );
};

export default CreatorVideosSection;