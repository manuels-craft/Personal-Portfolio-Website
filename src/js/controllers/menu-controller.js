export function createMenuController({ openBtn, closeBtn, menu }) {
  let isOpen = false;

  const setState = (open) => {
    isOpen = open;
    openBtn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    menu.classList.toggle("active", open);
  };

  const open = () => setState(true);
  const close = () => setState(false);
  const toggle = () => setState(!isOpen);
  const handleResize = () => setState(window.innerWidth > 1024);

  const init = () => {
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    window.addEventListener("resize", handleResize);
    window.addEventListener("DOMContentLoaded", handleResize);
    
  };

  return { init, open, close, toggle };
}
