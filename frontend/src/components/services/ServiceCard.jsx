import { iconMap } from "./../data/Const.js";

const ServiceCard = ({ title, description, icon }) => {
  const normalizedIcon =
    typeof icon === "string" ? icon.trim().toLowerCase() : "";
  const IconComponent =
    iconMap[normalizedIcon] || iconMap["check-circle"] || null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-violet-100">
        {IconComponent ? (
          <IconComponent color="#7c3aed" size={32} strokeWidth={2.3} />
        ) : (
          <span className="text-2xl text-purple-600 font-semibold">∞</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
