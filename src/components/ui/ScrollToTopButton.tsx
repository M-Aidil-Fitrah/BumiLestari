import { motion, AnimatePresence } from 'framer-motion';
import { buttonVariants } from '../../animations/variants';

interface ScrollToTopButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export const ScrollToTopButton = ({ isVisible, onClick }: ScrollToTopButtonProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={onClick}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#8B7355] hover:bg-[#7a6449] text-white rounded-full shadow-lg z-50"
          variants={buttonVariants}
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          whileHover="hover"
          whileTap="tap"
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            opacity: { duration: 0.2 }
          }}
          aria-label="Scroll to top"
        >
          <motion.svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, -2, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};