const Feature = ({ icon, title, details }) => {
  return (
    <div className="space-y-2">
      <div className="text-royal-blue">{icon}</div>
      <h6>{title}</h6>
      <p>{details}</p>
    </div>
  );
};

export default Feature;
