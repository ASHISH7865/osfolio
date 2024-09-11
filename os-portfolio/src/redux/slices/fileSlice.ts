import { File, FileSystem, FileSystemNode } from '@/types/types';
import { portfolioFileSystem } from '@/utils/fileSystem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Enhanced types for the file system


export interface FilesState {
  fileSystem: FileSystem;
  currentDirectory: string;
}

const initialState: FilesState = portfolioFileSystem;

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    createNode: (state, action: PayloadAction<FileSystemNode>) => {
      const node = action.payload;
      state.fileSystem[node.id] = node;
      if (node.parentId) {
        const parent = state.fileSystem[node.parentId];
        if (parent && parent.type === 'folder') {
          parent.children.push(node.id);
          parent.modifiedAt = new Date().toISOString();
        }
      }
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      const node = state.fileSystem[nodeId];
      if (node) {
        delete state.fileSystem[nodeId];
        if (node.parentId) {
          const parent = state.fileSystem[node.parentId];
          if (parent && parent.type === 'folder') {
            parent.children = parent.children.filter(id => id !== nodeId);
            parent.modifiedAt = new Date().toISOString();
          }
        }
        if (node.type === 'folder') {
          // Recursively delete children
          const deleteChildren = (childrenIds: string[]) => {
            childrenIds.forEach(childId => {
              const child = state.fileSystem[childId];
              if (child) {
                delete state.fileSystem[childId];
                if (child.type === 'folder') {
                  deleteChildren(child.children);
                }
              }
            });
          };
          deleteChildren(node.children);
        }
      }
    },
    updateNode: (state, action: PayloadAction<Partial<FileSystemNode> & { id: string }>) => {
      const { id, ...updates } = action.payload;
      const node = state.fileSystem[id];
      if (node) {
        if (node.type === 'file' && 'content' in updates) {
          (node as File).content = updates.content as string;
        }
        if ('name' in updates) {
          node.name = updates.name as string;
        }
        node.modifiedAt = new Date().toISOString();
      }
    },
    moveNode: (state, action: PayloadAction<{ nodeId: string; newParentId: string }>) => {
      const { nodeId, newParentId } = action.payload;
      const node = state.fileSystem[nodeId];
      const newParent = state.fileSystem[newParentId];
      if (node && newParent && newParent.type === 'folder') {
        // Remove from old parent
        if (node.parentId) {
          const oldParent = state.fileSystem[node.parentId];
          if (oldParent && oldParent.type === 'folder') {
            oldParent.children = oldParent.children.filter(id => id !== nodeId);
            oldParent.modifiedAt = new Date().toISOString();
          }
        }
        // Add to new parent
        newParent.children.push(nodeId);
        newParent.modifiedAt = new Date().toISOString();
        // Update node's parent
        node.parentId = newParentId;
        node.modifiedAt = new Date().toISOString();
      }
    },
    setCurrentDirectory: (state, action: PayloadAction<string>) => {
      state.currentDirectory = action.payload;
    },
  },
});

export const { createNode, deleteNode, updateNode, moveNode, setCurrentDirectory } = filesSlice.actions;
export default filesSlice.reducer;