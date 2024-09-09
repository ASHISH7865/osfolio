
import { 
    FileText, 
    Image, 
    Music, 
    Video, 
    Folder, 
    File,
    type LucideIcon
  } from 'lucide-react';


  export const getIconForFileType = (fileType: string): LucideIcon => {
    switch (fileType.toLowerCase()) {
      case 'text':
        return FileText;
      case 'image':
        return Image;
      case 'audio':
        return Music;
      case 'video':
        return Video;
      case 'folder':
        return Folder;
      default:
        return File;
    }
  };


  export const fileTypeToString = (fileType: string): string => {
    switch (fileType.toLowerCase()) {
      case 'text':
        return 'Text File';
      case 'image':
        return 'Image File';
      case 'audio':
        return 'Audio File';
      case 'video':
        return 'Video File';
      case 'folder':
        return 'Folder';
      default:
        return 'Unknown File Type';
    }
  };