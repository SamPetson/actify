import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModuleTabs = () => {
  const [modules, setModules] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('/modules/list');
        setModules(response.data);
        if (response.data.length > 0 && !activeTab) {
          setActiveTab(response.data[0].name);
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
    const interval = setInterval(fetchModules, 5000); // Check for new modules every 5 seconds

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