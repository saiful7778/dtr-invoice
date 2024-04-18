import Point from "./Point";

const PointCard = ({ point, title, details }) => {
  return (
    <div className="space-y-2">
      <Point>{point}</Point>
      <h6>{title}</h6>
      <p>{details}</p>
    </div>
  );
};

export default PointCard;
