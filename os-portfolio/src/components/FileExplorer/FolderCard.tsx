import React from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FolderArchive, Info, Star, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { FileSystemNode } from '@/types/types';

interface FolderCardProps {
  node: FileSystemNode;
  onDoubleClick: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = React.memo(({ node, onDoubleClick, onDelete, onClick }) => (
  <div 
    onDoubleClick={onDoubleClick} 
    className="p-6 w-[300px] border rounded-[10px] cursor-pointer hover:bg-[#34343b] bg-[#26262e] active:bg-[#34343b]"
  >
    <div className="flex flex-wrap flex-col items-center mb-2">
      <div className='self-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button><EllipsisVertical /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[10px]">
            <DropdownMenuCheckboxItem className='flex gap-4 text-xs rounded-[5px] p-2'>
              <FolderArchive size={20} />
              <span>Archived</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className='flex gap-4 text-xs rounded-[5px] p-2'>
              <Star size={20} />
              <span>Favorite</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className='flex gap-4 text-xs rounded-[5px] p-2' onClick={onDelete}>
              <Trash2 size={20} className='text-red-500' />
              <span>Delete</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className='flex gap-4 text-xs rounded-[5px] p-2' onClick={onClick}>
              <Info size={20} />
              <span>Properties</span>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
          
        </DropdownMenu>
      </div>
      <div className='flex flex-col gap-1 items-center'>
        <img className='w-[80px] h-[80px]' src={node.icon || "/icons/explorer-file.png"} alt='icons' />
        <h3 className="text-sm font-semibold">{node.name}</h3>
      </div>
      {node.size && (
        <>
          <Separator className='bg-gray-400 mt-10' />
          <div className='self-start flex gap-1 mt-10'>
            <span className='text-xs'>File Size:</span>
            <span className='text-xs'>{node.size} Kb</span>
          </div>
        </>
      )}
    </div>
  </div>
));

export default FolderCard;