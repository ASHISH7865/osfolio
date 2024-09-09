export interface App {
    id: string;
    name: string;
    icon: string;
    description?: string;
    launchCommand?: string;
  }


  export interface Window extends App {
    isMinimized: boolean;
    isMaximized : boolean;
    zIndex:number;
    position: { x: number; y: number };
    prevPosition?: { x: number; y: number };
    size: { width: number; height: number };
    prevSize?: { width: number; height: number };
    innerWidth? : number;
    innerHeight? : number;
  }


  export interface ContextMenuItem {
    label : string;
    action : () => void;
  }


  export interface BaseNode {
    id: string;
    name: string;
    createdAt: string;
    modifiedAt: string;
    parentId: string | null;
  }
  
  export interface File extends BaseNode {
    type: 'file';
    content: string;
    size: number;
    extension: string;
  }
  
  export interface Folder extends BaseNode {
    type: 'folder';
    children: string[];
  }
  
  export type FileSystemNode = File | Folder;
  export type FileSystem = Record<string, FileSystemNode>;