import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentDirectory, createNode, deleteNode } from '@/redux/slices/fileSlice';
import { FileSystemNode } from '@/types/types';

const FileExplorer: React.FC = () => {
    const dispatch = useDispatch();
    const { fileSystem, currentDirectory } = useSelector((state: RootState) => state.files);

    const currentFolder = useMemo(() => 
        fileSystem[currentDirectory] as FileSystemNode & { type: 'folder' },
        [fileSystem, currentDirectory]
    );

    console.log(currentFolder)

    const handleDoubleClick = useCallback((node: FileSystemNode) => {
        if (node.type === 'folder') {
            dispatch(setCurrentDirectory(node.id));
        } else {
            console.log('Opening file:', node.name);
        }
    }, [dispatch]);

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

    const handleDelete = useCallback((nodeId: string) => {
        dispatch(deleteNode(nodeId));
    }, [dispatch]);

    return (
        <div className="file-explorer relative">
            <div className="file-explorer-header">
                <h2>{currentFolder?.name}</h2>
                <button onClick={handleCreateFolder}>New Folder</button>
            </div>
            <ul className="file-explorer-list">
                {currentFolder?.children?.map(childId => {
                    const child = fileSystem[childId];
                    return (
                        <li key={child.id} onDoubleClick={() => handleDoubleClick(child)}>
                            {child?.name}
                            <button onClick={() => handleDelete(child.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default React.memo(FileExplorer);