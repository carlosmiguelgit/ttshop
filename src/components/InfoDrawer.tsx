import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { X } from 'lucide-react';

interface InfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const InfoDrawer: React.FC<InfoDrawerProps> = ({ isOpen, onClose, title, content }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="bottom">
      <DrawerContent className="h-auto max-h-[80vh] mt-24 rounded-t-[10px] flex flex-col">
        <div className="mx-auto w-full max-w-md p-4 flex flex-col h-full">
          <DrawerHeader className="flex justify-between items-center flex-shrink-0 border-b pb-3">
            <DrawerTitle className="text-xl font-bold text-gray-900">
              {title}
            </DrawerTitle>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </DrawerHeader>
          
          <div className="p-4 flex-grow overflow-y-auto">
            <p className="text-base text-gray-700 whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InfoDrawer;