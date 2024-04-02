import React from "react";
import Point from "./Point";

const PointCard = ({ point, title, details }) => {
  return (
    <div className="space-y-2">
      <Point>{point}</Point>
      <h6 className="text-dark-blue">{title}</h6>
      <p className="text-dark-blue">{details}</p>
    </div>
  );
};

export default PointCard;
