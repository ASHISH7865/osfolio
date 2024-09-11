import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

import { FileSystemNode } from '@/types/types';

interface FileDetailsSheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedNode: FileSystemNode | null;
}

const FileDetailsSheet: React.FC<FileDetailsSheetProps> = ({ isOpen, onOpenChange, selectedNode }) => {
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex justify-between items-center">
                        File Details

                    </SheetTitle>
                </SheetHeader>
                {selectedNode && (
                    <div className="mt-4">
                        <img className='w-[80px] h-[80px] mb-4' src={selectedNode.icon || "/icons/explorer-file.png"} alt='File icon' />
                        <SheetDescription>
                            <p><strong>Name:</strong> {selectedNode.name}</p>
                            <p><strong>Type:</strong> {selectedNode.type}</p>
                            {selectedNode.size && <p><strong>Size:</strong> {selectedNode.size} Kb</p>}
                            <p><strong>Created:</strong> {new Date(selectedNode.createdAt).toLocaleString()}</p>
                            <p><strong>Modified:</strong> {new Date(selectedNode.modifiedAt).toLocaleString()}</p>
                        </SheetDescription>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default FileDetailsSheet;