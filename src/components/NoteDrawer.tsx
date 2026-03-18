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
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-gray-900">Nota</h2>
            <button onClick={onClose}>
              <X size={24} className="text-gray-900" />
            </button>
          </div>

          <div className="p-4 flex-grow">
            <textarea
              className="w-full h-40 p-4 bg-[#F8F8F8] rounded-xl border-none outline-none text-[14px] resize-none"
              placeholder="Escreva sua nota aqui..."
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