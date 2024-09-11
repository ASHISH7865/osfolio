import React, { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFileSystem } from '@/hooks/useFileSystem';
import { FileSystemNode } from '@/types/types';
import FolderCard from './FolderCard';
import FileDetailsSheet from './FileDetailSheet';
import BreadcrumbNavigation from './BreadCrumbNavigation';

interface TabComponentProps {
  items: string[];
}

const TabComponent: React.FC<TabComponentProps> = ({ items }) => {
  const { fileSystem, handleDelete, handleDoubleClick } = useFileSystem();

  const [currentTab, setCurrentTab] = useState("all");
  const [selectedNode, setSelectedNode] = useState<FileSystemNode | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClick = (node: FileSystemNode) => {
    setSelectedNode(node);
    setIsSheetOpen(true);
  };

  const renderedItems = useMemo(() => {
    if (currentTab !== 'all') return null;
    
    return items?.map(childId => {
      const child = fileSystem[childId];
      if (!child) return null;
      return (
        <FolderCard
          key={child.id}
          node={child}
          onDoubleClick={() => handleDoubleClick(child)}
          onDelete={() => handleDelete(child.id)}
          onClick={() => handleClick(child)}
        />
      );
    });
  }, [currentTab, items, fileSystem, handleDoubleClick, handleDelete]);

  return (
    <div className='flex gap-5 flex-col relative' >
      <div className="flex gap-2 mb-5">
        <Tabs onValueChange={setCurrentTab} defaultValue="all">
          <TabsList className="w-full flex items-center justify-center">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <BreadcrumbNavigation />

      <div className="flex flex-wrap gap-6">
        {renderedItems}
      </div>

      <FileDetailsSheet 
        isOpen={isSheetOpen} 
        onOpenChange={setIsSheetOpen}
        selectedNode={selectedNode}
      />
    </div>
  );
};

export default TabComponent;