const classRemove = (type, element, className) => {
  if (type === "tag") {
    document.getElementsByTagName(element)[0].classList.remove(className);
  } else if (type === "id") {
    document.getElementById(element).classList.remove(className);
  } else if (type === "class") {
    document.getElementsByClassName(element).classList.remove(className);
  }
};

export default classRemove;
