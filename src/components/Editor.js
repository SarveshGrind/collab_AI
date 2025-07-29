import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { FiCpu, FiActivity, FiSettings } from 'react-icons/fi';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = Codemirror.fromTextArea(
      document.getElementById('realtimeEditor'),
      {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    editorRef.current.on('change', (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      if (origin !== 'setValue') {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6 shadow-md">
        <FiCpu className="text-xl hover:text-purple-400 cursor-pointer" title="AI Insights" />
        <FiActivity className="text-xl hover:text-purple-400 cursor-pointer" title="Performance" />
        <FiSettings className="text-xl hover:text-purple-400 cursor-pointer" title="Settings" />
      </div>

      {/* Code Editor */}
      <div className="flex-1 bg-gray-800 p-4 overflow-auto">
        <textarea id="realtimeEditor" />
      </div>
    </div>
  );
};

export default Editor;
