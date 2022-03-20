export const toggle = (elementId, className, set) => {
  let element = document.getElementById(elementId);
  element.classList.toggle(className, set);
};
