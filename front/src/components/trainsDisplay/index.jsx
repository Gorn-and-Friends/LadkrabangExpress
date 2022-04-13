import React from "react";

const TrainsDisplay = (data) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default TrainsDisplay;
