import { useRef, useEffect } from 'react';

const useAutoResizeTextarea = () => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('input', handleResize);
      handleResize(); // Initialize height

      return () => {
        textarea.removeEventListener('input', handleResize);
      };
    }
  }, []);

  return textareaRef;
};
export default useAutoResizeTextarea;
