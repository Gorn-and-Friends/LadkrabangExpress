import React from "react";

const ScrollToPage = ({ toId, toRef, duration, children }) => {
  const handleClick = () => scrollTo({ id: toId, ref: toRef, duration });

  return <button onClick={handleClick}>{children}</button>;
};

export default ScrollToPage;
