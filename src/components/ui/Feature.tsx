interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export const Feature = ({ icon, title, description, className = "" }: FeatureProps) => {
  return (
    <div className={`text-center p-6 ${className}`}>
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

interface FeaturesGridProps {
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export const FeaturesGrid = ({ features }: FeaturesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          className="hover:transform hover:scale-105 transition-all duration-300"
        />
      ))}
    </div>
  );
};