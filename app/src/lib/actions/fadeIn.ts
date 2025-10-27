export function fadeIn(node: HTMLElement, options = { threshold: 0.3, reset: true }) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else if (options.reset) {
          entry.target.classList.remove('visible');
        }
      });
    },
    { threshold: options.threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}