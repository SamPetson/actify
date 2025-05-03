import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ModuleTabs = () => {
  const [modules, setModules] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/modules/list.json`);
        if (!response.ok) throw new Error('Failed to fetch modules');
        const data = await response.json();
        setModules(data);
        if (data.length > 0 && !activeTab) {
          setActiveTab(data[0].name);
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
    const interval = setInterval(fetchModules, 5000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleTabClick = (module) => {
    setActiveTab(module.name);
    navigate(`/script/${module.name}`);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <h2>Actify Modules</h2>
      </div>
      <div className="tabs-list">
        {modules.map((module) => (
          <motion.div
            key={module.name}
            className={`tab ${activeTab === module.name ? 'active' : ''}`}
            onClick={() => handleTabClick(module)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {module.name.replace('.js', '')}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModuleTabs;
