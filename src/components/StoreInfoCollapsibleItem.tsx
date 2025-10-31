import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';

interface StoreInfoCollapsibleItemProps {
  title: string;
  content: string;
}

const StoreInfoCollapsibleItem: React.FC<StoreInfoCollapsibleItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="py-1">
      <CollapsibleTrigger asChild>
        <div 
          className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 transition-colors w-full"
        >
          <span className="text-base text-gray-800">{title}</span>
          <ChevronRight 
            size={20} 
            className={cn(
              "text-gray-400 transition-transform duration-300",
              isOpen ? "rotate-90" : "rotate-0" // Rotaciona 90 graus para simular a seta para baixo
            )} 
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-3 pr-4">
        <p className="text-sm text-gray-600 whitespace-pre-wrap">
          {content}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StoreInfoCollapsibleItem;