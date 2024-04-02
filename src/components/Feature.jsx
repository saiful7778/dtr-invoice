const Feature = ({ icon, title, details }) => {
  return (
    <div className="space-y-2">
      <div className="text-royal-blue">{icon}</div>
      <h6 className="text-dark-blue">{title}</h6>
      <p className="text-dark-blue">{details}</p>
    </div>
  );
};

export default Feature;
