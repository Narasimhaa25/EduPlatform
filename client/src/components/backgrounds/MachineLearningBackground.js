import React from 'react';
import { motion } from 'framer-motion';

const MachineLearningBackground = () => {
  return (
    <div className="background-container">
      <motion.div
        className="background-element"
        animate={{
          scale: [1, 1.5, 1],
          borderRadius: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        🧠
      </motion.div>
    </div>
  );
};

export default MachineLearningBackground;

