import React from 'react';
import { motion } from 'framer-motion';
import './animations.css';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', disabled = false, className = '' }) => {
  const variants = {
    primary: {
      background: 'var(--primary-color)',
      color: 'white',
      hover: 'var(--primary-dark)'
    },
    secondary: {
      background: 'var(--secondary-color)',
      color: 'white',
      hover: 'var(--secondary-dark)'
    },
    accent: {
      background: 'var(--accent-color)',
      color: 'var(--text-color)',
      hover: 'var(--accent-dark)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-color)',
      hover: 'rgba(255, 255, 255, 0.1)'
    }
  };

  const sizes = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.8rem'
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem'
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.2rem'
    }
  };

  return (
    <motion.button
      className={`actify-button ${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05, backgroundColor: disabled ? variants[variant].background : variants[variant].hover }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: variants[variant].background,
        color: variants[variant].color,
        padding: sizes[size].padding,
        fontSize: sizes[size].fontSize,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </motion.button>
  );
};

export default Button;