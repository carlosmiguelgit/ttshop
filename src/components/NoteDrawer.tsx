"use client";

import React, { useState } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  initialNote: string;
}

const NoteDrawer: React.FC<NoteDrawerProps> = ({ isOpen, onClose, onSave, initialNote }) => {
  const [note, setNote] = useState(initialNote);

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[92vh] p-0 rounded-t-[20px] border-none bg-white">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full">
          {/* Header Centralizado - Texto redundante removido */}
          <div className="p-4 border-b relative flex flex-col items-center">
            <h2 className="text-[16px] font-bold text-gray-900">Nota do pedido</h2>
            <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X size={24} className="text-gray-900" />
            </button>
          </div>

          <div className="p-4 flex-grow">
            <textarea
              className="w-full h-40 p-4 bg-[#F8F8F8] rounded-xl border-none outline-none text-[14px] resize-none"
              placeholder="Forneça ao vendedor mais informações sobre seu pedido (opcional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={200}
            />
            <div className="text-right text-[12px] text-gray-400 mt-2">
              {note.length}/200
            </div>
          </div>

          <div className="p-4">
            <Button
              className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[52px]"
              onClick={() => {
                onSave(note);
                onClose();
              }}
            >
              Salvar
            </Button>
          </div>
          <div className="h-4"></div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NoteDrawer;