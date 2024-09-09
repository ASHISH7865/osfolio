import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store'; // Adjust this import based on your store setup
import { setCurrentDirectory } from '@/redux/slices/fileSlice';
import { FileSystemNode } from '@/types/types'; // Adjust this import based on your types setup

const BreadcrumbNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const { fileSystem, currentDirectory } = useSelector((state: RootState) => state.files);

  const getPath = (nodeId: string): string[] => {
    const path: string[] = [];
    let currentNode = fileSystem[nodeId];
    while (currentNode) {
      path.unshift(currentNode.id);
      currentNode = currentNode.parentId ? fileSystem[currentNode.parentId] : null;
    }
    return path;
  };

  const currentPath = getPath(currentDirectory);

  const handleClick = (nodeId: string) => {
    dispatch(setCurrentDirectory(nodeId));
  };

  return (
    <div className="breadcrumb-navigation">
      {currentPath.map((nodeId, index) => {
        const node = fileSystem[nodeId] as FileSystemNode;
        return (
          <React.Fragment key={node.id}>
            {index > 0 && <span> / </span>}
            <span 
              className="breadcrumb-item"
              onClick={() => handleClick(node.id)}
            >
              {node.name}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadcrumbNavigation;