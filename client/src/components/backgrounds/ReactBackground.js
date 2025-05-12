import React from 'react';
import { motion } from 'framer-motion';

const ReactBackground = () => {
  return (
    <div className="background-container">
      <motion.div
        className="background-element"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        ⚛️
      </motion.div>
    </div>
  );
};

export default ReactBackground;

