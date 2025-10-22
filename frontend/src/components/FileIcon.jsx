import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const FileIcon = ({ fileName }) => {
  const extension = fileName.split('.').pop();

  switch (extension) {
    case 'html':
      return <FaHtml5 className="mr-2 text-orange-500" />;
    case 'css':
      return <FaCss3Alt className="mr-2 text-blue-500" />;
    case 'js':
      return <FaJs className="mr-2 text-yellow-500" />;
    case 'jsx':
      return <FaReact className="mr-2 text-cyan-400" />;
    case 'py':
      return <FaPython className="mr-2 text-blue-400" />;
    case 'java':
        return <FaJava className="mr-2 text-red-500" />;
    case 'txt':
    default:
      return <FiFileText className="mr-2 text-gray-400" />;
  }
};

export default FileIcon;