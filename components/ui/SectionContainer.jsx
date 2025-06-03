const SectionContainer = ({ 
  icon, 
  title, 
  description, 
  children, 
  gradient = "from-yellow-300 to-orange-500 dark:from-indigo-500 dark:to-indigo-600",
  className = "" 
}) => {
  return (
    <div className={`bg-beige2/95 dark:bg-black2/95 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-xl ${className}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-md`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
        <div>
          <h3 className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default SectionContainer; 