// Animation variants for Framer Motion

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// Fade in up animation (element appears by moving up)
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Staggered children animation (for lists and grids)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Zoom in animation
export const zoomIn = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Slide in from left
export const slideInLeft = {
  hidden: { 
    opacity: 0,
    x: -30
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Slide in from right
export const slideInRight = {
  hidden: { 
    opacity: 0,
    x: 30
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Bounce effect (for buttons, CTA elements)
export const bounce = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 0.4,
      times: [0, 0.5, 1]
    }
  }
};

export const staggeredFadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      delay, 
      duration: 0.5
    }
  }
});
