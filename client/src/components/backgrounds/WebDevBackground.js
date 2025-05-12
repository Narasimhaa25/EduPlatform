import React from 'react';
import { motion } from 'framer-motion';

const WebDevBackground = () => {
  return (
    <div className="background-container">
      <motion.div
        className="background-element"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        &lt;/&gt;
      </motion.div>
    </div>
  );
};

export default WebDevBackground;

