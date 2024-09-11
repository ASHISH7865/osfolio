import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { deleteNode, setCurrentDirectory } from '@/redux/slices/fileSlice';
import { FileSystemNode } from '@/types/types';

export const useFileSystem = () => {
  const dispatch = useAppDispatch();
  const { fileSystem } = useAppSelector((state) => state.files);

  const handleDelete = useCallback((nodeId: string) => {
    dispatch(deleteNode(nodeId));
  }, [dispatch]);

  const handleDoubleClick = useCallback((node: FileSystemNode) => {
    if (node.type === 'folder') {
      dispatch(setCurrentDirectory(node.id));
    } else {
      console.log('Opening file:', node.name);
    }
  }, [dispatch]);

  return {
    fileSystem,
    handleDelete,
    handleDoubleClick
  };
};