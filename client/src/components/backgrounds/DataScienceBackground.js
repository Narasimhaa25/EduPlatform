import React from 'react';
import { motion } from 'framer-motion';

const DataScienceBackground = () => {
  return (
    <div className="background-container">
      <motion.div
        className="background-element"
        animate={{
          y: [0, -20, 0],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        📊
      </motion.div>
    </div>
  );
};

export default DataScienceBackground;

