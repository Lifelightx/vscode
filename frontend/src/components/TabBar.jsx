import { FiX, FiLock, FiUnlock, FiTerminal, FiPlay } from 'react-icons/fi';
import FileIcon from './FileIcon';

function TabBar({ 
    openFiles, 
    activeFile, 
    onTabClick, 
    onTabClose, 
    onRunCode,
    isPublic, 
    onTogglePrivacy, 
    isTerminalOpen, 
    onToggleTerminal 
}) {
  // The "Run" button is only active if the current file is a JavaScript file.
  const canRun = activeFile?.language === 'js';

  return (
    <div className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-900/5 via-purple-900/5 to-blue-900/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
      
      {/* Subtle animated orb */}
      <div className="absolute -top-10 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
      
      {/* Main TabBar with glassmorphism */}
      <div className="relative z-10 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-white/10 text-sm">
        {/* Open File Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide" style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}>
          {openFiles.length > 0 ? (
            openFiles.map((file) => (
              <div
                key={file.name}
                onClick={() => onTabClick(file)}
                className={`group flex items-center justify-between space-x-2 border-r border-white/5 cursor-pointer transition-all duration-200 ${
                  activeFile?.name === file.name
                    ? 'bg-white/10 backdrop-blur-sm'
                    : 'bg-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-2 px-4 py-3">
                  <FileIcon fileName={file.name} />
                  <span className="text-gray-200">{file.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(file.name);
                  }}
                  className="mr-2 opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded-sm p-1 transition-all duration-200"
                  title="Close File"
                >
                  <FiX className="w-3.5 h-3.5 text-gray-300" />
                </button>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">$ no_files_open()</div>
          )}
        </div>

        {/* Controls on the right */}
        <div className="flex items-center space-x-3 px-4 py-2">
          {/* Run Button */}
          <button
            onClick={onRunCode}
            disabled={!canRun}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg transition-all duration-200 shadow-lg border font-semibold ${
              canRun
                ? 'bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-green-500/20 hover:shadow-green-500/40 border-green-500/30'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-gray-600/30 shadow-none'
            }`}
            title={canRun ? `Run ${activeFile?.name}` : 'Run is only available for JavaScript files'}
          >
            <FiPlay className="w-4 h-4" />
            <span>Run</span>
          </button>

          {/* Terminal Toggle */}
          <button
            onClick={onToggleTerminal}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 backdrop-blur-sm border ${
              isTerminalOpen
                ? 'bg-purple-600/80 border-purple-500/50 text-white shadow-lg shadow-purple-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
            }`}
            title={isTerminalOpen ? 'Close Terminal' : 'Open Terminal'}
          >
            <FiTerminal className="w-4 h-4" />
            <span className="text-sm font-medium">Terminal</span>
          </button>

          {/* Privacy Toggle */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <button
              onClick={onTogglePrivacy}
              className={`${
                isPublic ? 'bg-green-600' : 'bg-gray-600'
              } relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200`}
              title={isPublic ? 'Make Private' : 'Make Public'}
            >
              <span
                className={`${
                  isPublic ? 'translate-x-5' : 'translate-x-1'
                } inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200`}
              />
            </button>
            {isPublic ? (
              <FiUnlock className="w-4 h-4 text-green-400" />
            ) : (
              <FiLock className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm text-gray-300">{isPublic ? 'Public' : 'Private'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabBar;