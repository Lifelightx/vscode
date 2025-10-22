import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

// We wrap the component in forwardRef to pass a ref from the parent
const Terminal = forwardRef(({ socket, spaceName }, ref) => {
  const terminalRef = useRef(null); // Ref for the DOM element
  const xtermInstance = useRef(null); // Ref to hold the xterm.js instance
  const fitAddonRef = useRef(null); // Ref for the fit addon

  // This hook exposes a function to the parent component via the ref
  useImperativeHandle(ref, () => ({
    /**
     * Executes JS code by temporarily overriding the console and
     * redirecting its output to this xterm.js instance.
     * @param {string} code The JavaScript code to execute.
     */
    runCode: (code) => {
      if (!xtermInstance.current) return;
      
      const term = xtermInstance.current;
      term.writeln('> Running code...');

      // --- This is the magic part ---
      // 1. Store the original console methods
      const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
      };

      // 2. Override the console methods to write to xterm
      console.log = (...args) => term.writeln(args.map(arg => JSON.stringify(arg, null, 2)).join(' '));
      console.error = (...args) => term.writeln(`\x1b[31mERROR: ${args.map(arg => JSON.stringify(arg, null, 2)).join(' ')}\x1b[0m`);
      console.warn = (...args) => term.writeln(`\x1b[33mWARN: ${args.map(arg => JSON.stringify(arg, null, 2)).join(' ')}\x1b[0m`);
      console.info = (...args) => term.writeln(`\x1b[34mINFO: ${args.map(arg => JSON.stringify(arg, null, 2)).join(' ')}\x1b[0m`);

      // 3. Execute the code in a try...catch...finally block
      try {
        // Use new Function() for safer execution than eval()
        new Function(code)();
        term.writeln('\n> Execution finished.');
      } catch (e) {
        console.error(e.message);
      } finally {
        // 4. IMPORTANT: Restore the original console methods
        console.log = originalConsole.log;
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        console.info = originalConsole.info;
      }
    }
  }));

  useEffect(() => {
    if (terminalRef.current && !xtermInstance.current) {
      const term = new XTerm({
        cursorBlink: true,
        theme: { 
          background: 'transparent',
          foreground: '#e5e7eb',
          cursor: '#818cf8',
          cursorAccent: '#1e293b',
          black: '#1e293b',
          red: '#ef4444',
          green: '#22c55e',
          yellow: '#eab308',
          blue: '#3b82f6',
          magenta: '#a855f7',
          cyan: '#06b6d4',
          white: '#f3f4f6',
          brightBlack: '#475569',
          brightRed: '#f87171',
          brightGreen: '#4ade80',
          brightYellow: '#facc15',
          brightBlue: '#60a5fa',
          brightMagenta: '#c084fc',
          brightCyan: '#22d3ee',
          brightWhite: '#ffffff'
        },
        fontSize: 14,
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        scrollback: 10000,
        convertEol: true,
        rows: 24, // Default rows
        cols: 80  // Default cols
      });

      // Create and load fit addon
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      fitAddonRef.current = fitAddon;

      // Open terminal
      term.open(terminalRef.current);
      xtermInstance.current = term;

      // Fit terminal after opening - use multiple attempts to ensure it works
      const fitTerminal = () => {
        if (fitAddonRef.current && terminalRef.current) {
          try {
            fitAddonRef.current.fit();
          } catch (e) {
            console.error('Error fitting terminal:', e);
          }
        }
      };

      // Fit immediately
      setTimeout(fitTerminal, 0);
      // Fit again after a short delay to ensure container is sized
      setTimeout(fitTerminal, 100);
      // One more time for good measure
      setTimeout(fitTerminal, 300);

      // Handle window resize
      const handleResize = () => {
        fitTerminal();
      };

      window.addEventListener('resize', handleResize);

      // ... (The previous onKey handler for manual commands is unchanged)

      return () => {
        window.removeEventListener('resize', handleResize);
        if (xtermInstance.current) {
          xtermInstance.current.dispose();
          xtermInstance.current = null;
        }
      };
    }

    // ... (The previous socket listener for backend output is unchanged)

  }, [socket, spaceName]);

  // Add a resize observer to handle container size changes
  useEffect(() => {
    if (!terminalRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (fitAddonRef.current) {
        try {
          fitAddonRef.current.fit();
        } catch (e) {
          // Ignore errors during resize
        }
      }
    });

    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-full w-full">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 animate-pulse" style={{ animationDuration: '3s' }}></div>
      
      {/* Subtle animated orb */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
      <div className="absolute -top-10 right-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
      
      {/* Terminal container with glassmorphism */}
      <div className="relative z-10 h-full w-full flex flex-col backdrop-blur-md bg-black/40 border-t border-white/10">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-sm text-gray-400 ml-3" style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}>
              Terminal
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {spaceName || 'workspace'}
          </div>
        </div>
        
        {/* Terminal content - takes remaining height */}
        <div className="flex-1 w-full overflow-hidden">
          <div ref={terminalRef} className="h-full w-full p-2" />
        </div>
      </div>
    </div>
  );
});

export default Terminal;