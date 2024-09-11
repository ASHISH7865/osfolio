import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { createNode } from '@/redux/slices/fileSlice';
import { FileSystemNode } from '@/types/types';
import TabComponent from './TabComponent';


const FileExplorer: React.FC = () => {
    const dispatch = useDispatch();
    const { fileSystem, currentDirectory } = useSelector((state: RootState) => state.files);

    const currentFolder = useMemo(() =>
        fileSystem[currentDirectory] as FileSystemNode & { type: 'folder' },
        [fileSystem, currentDirectory]
    );


    const handleCreateFolder = useCallback(() => {
        const newFolderId = `folder-${Date.now()}`;
        dispatch(createNode({
            id: newFolderId,
            name: 'New Folder',
            type: 'folder',
            children: [],
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
            parentId: currentDirectory
        }));
    }, [dispatch, currentDirectory]);

   

    return (
        <div className="p-6">
            <div className="flex space-x-4 mb-8">
                <ActionButton onClick={handleCreateFolder} icon="+" label="New document" />
            </div>
            <TabComponent items={currentFolder?.children} />
           
        </div>
    );
};

const ActionButton: React.FC<{ icon: string; label: string , onClick:()=>void }> = ({ icon, label,onClick }) => (
    <button onClick={onClick} className="flex items-center justify-center border w-[200px] h-[80px] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
        <span className="mr-2">{icon}</span>
        {label}
    </button>
);


export default React.memo(FileExplorer);