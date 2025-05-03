import React from 'react';
import { motion } from 'framer-motion';
import './animations.css';

const Card = ({ children, title, subtitle, className = '', onClick }) => {
  return (
    <motion.div
      className={`actify-card ${className}`}
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-content">{children}</div>
    </motion.div>
  );
};

export default Card;