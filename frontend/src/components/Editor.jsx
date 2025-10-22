import MonacoEditor from '@monaco-editor/react';

/**
 * A helper function to map a file extension to the language ID
 * that the Monaco Editor understands.
 * @param {string} extension - The file extension (e.g., 'js', 'py').
 * @returns {string} The Monaco Editor language ID (e.g., 'javascript', 'python').
 */
const getMonacoLanguage = (extension) => {
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'txt':
    default:
      return 'plaintext';
  }
};

function Editor({ language, value, onChange }) {
  
  function handleEditorChange(value, event) {
    if (onChange) {
      onChange(value);
    }
  }

  // Use our helper function to get the correct language ID for Monaco
  const monacoLanguage = getMonacoLanguage(language);

  return (
    <div className="h-full relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-black to-purple-900/10"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-size-[64px_64px] opacity-30"></div>
      
      {/* Editor on top of background */}
      <div className="relative z-10 h-full">
        <MonacoEditor
          height="100%"
          // Pass the correctly mapped language ID to the editor
          language={monacoLanguage}
          value={value}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: 'on',
            // Optional: Enable suggestions by default
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            lineHeight: 1.6,
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            renderWhitespace: 'selection',
            bracketPairColorization: {
              enabled: true,
            },
          }}
          beforeMount={(monaco) => {
            // Define custom transparent dark theme
            monaco.editor.defineTheme('codecollab-dark', {
              base: 'vs-dark',
              inherit: true,
              rules: [],
              colors: {
                'editor.background': '#00000000', // Transparent background
                'editor.foreground': '#e5e5e5',
                'editorLineNumber.foreground': '#4b5563',
                'editorLineNumber.activeForeground': '#9ca3af',
                'editor.lineHighlightBackground': '#ffffff08',
                'editorCursor.foreground': '#60a5fa',
                'editor.selectionBackground': '#3b82f640',
                'editor.inactiveSelectionBackground': '#3b82f620',
                'editorWidget.background': '#00000090',
                'editorWidget.border': '#ffffff20',
                'editorSuggestWidget.background': '#00000090',
                'editorSuggestWidget.border': '#ffffff20',
              },
            });
          }}
          onMount={(editor, monaco) => {
            // Apply the custom theme
            monaco.editor.setTheme('codecollab-dark');
          }}
        />
      </div>
    </div>
  );
}

export default Editor;