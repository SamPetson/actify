import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('javascript', javascript);

const ScriptViewer = () => {
  const { moduleName } = useParams();
  const [scriptContent, setScriptContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScript = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.PUBLIC_URL}/modules/${moduleName}`);
        if (!response.ok) throw new Error('Module not found');
        const data = await response.text();
        setScriptContent(data);
      } catch (error) {
        console.error('Error fetching script:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScript();
  }, [moduleName]);

  useEffect(() => {
    if (scriptContent) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [scriptContent]);

  return (
    <motion.div
      className="script-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="script-header">
        <h2>{moduleName.replace('.js', '')}</h2>
      </div>
      {loading ? (
        <div className="loading-spinner">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '3px solid #fff',
              borderTopColor: 'transparent',
            }}
          />
        </div>
      ) : (
        <pre className="script-content">
          <code className="javascript">{scriptContent}</code>
        </pre>
      )}
    </motion.div>
  );
};

export default ScriptViewer;
