import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import FileIcon from './FileIcon';

function FileExplorer({ files, onFileSelect, activeFile, onCreateFile, onDeleteFile }) {
  const [newFileName, setNewFileName] = useState('');
  
  const handleCreate = () => {
    if (newFileName.trim()) {
      onCreateFile(newFileName.trim());
      setNewFileName('');
    }
  };

  const handleDelete = (e, fileName) => {
    e.stopPropagation();
    if (onDeleteFile) {
      onDeleteFile(fileName);
    }
  };

  return (
    <div className="relative overflow-hidden h-full">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/5 via-purple-900/5 to-blue-900/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
      
      {/* Subtle animated orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
      
      {/* Main content with glassmorphism */}
      <div className="relative z-10 backdrop-blur-md bg-black/20 h-full p-4">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4 text-gray-200 tracking-wide" style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}>
          Explorer
        </h2>
        
        {/* Create New File Section */}
        <div className='flex mb-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg overflow-hidden shadow-lg'>
          <input 
            type="text" 
            value={newFileName} 
            onChange={e => setNewFileName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="new-file.js"
            className="bg-transparent text-sm p-2.5 w-full outline-none text-gray-200 placeholder-gray-500"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
          />
          <button 
            onClick={handleCreate} 
            className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 p-2.5 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 border-l border-blue-500/30"
            title="Create File"
          >
            <FiPlus className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* File List */}
        <ul className="space-y-1" style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}>
          {files.map((file) => (
            <li
              key={file.name}
              onClick={() => onFileSelect(file)}
              className={`group flex items-center justify-between p-1 rounded-sm cursor-pointer transition-all duration-200 ${
                activeFile?.name === file.name 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg' 
                  : 'bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileIcon fileName={file.name} />
                <span className="text-gray-200 text-sm">{file.name}</span>
              </div>
              
              {/* Delete button - shows on hover */}
              <button
                onClick={(e) => handleDelete(e, file.name)}
                className="opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-md p-1.5 transition-all duration-200 border border-transparent hover:border-red-500/30"
                title="Delete File"
              >
                <FiTrash2 className="w-3.5 h-3.5 text-red-400" />
              </button>
            </li>
          ))}
          
          {files.length === 0 && (
            <li className="text-gray-500 text-sm text-center py-8">
              $ no_files_found()
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FileExplorer;