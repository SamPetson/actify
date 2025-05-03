import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import ModuleTabs from './components/ModuleTabs';
import ScriptViewer from './components/ScriptViewer';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Background />
        <div className="content-container">
          <ModuleTabs />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/script/:moduleName" element={<ScriptViewer />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

const Home = () => (
  <motion.div
    className="home-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h1>Welcome to Actify</h1>
    <p>Select a module from the tabs to view its contents</p>
  </motion.div>
);

export default App;