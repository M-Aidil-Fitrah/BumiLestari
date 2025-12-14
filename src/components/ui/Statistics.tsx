interface StatisticProps {
  value: string | number;
  label: string;
  icon?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const Statistic = ({
  value,
  label,
  icon,
  prefix = "",
  suffix = "",
  className = ""
}: StatisticProps) => {
  return (
    <div className={`text-center p-6 ${className}`}>
      {icon && (
        <div className="text-4xl mb-3">{icon}</div>
      )}
      <div className="text-3xl md:text-4xl font-bold text-[#8B7355] mb-2">
        {prefix}{value}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

interface StatisticsGridProps {
  statistics: Array<{
    value: string | number;
    label: string;
    icon?: string;
    prefix?: string;
    suffix?: string;
  }>;
}

export const StatisticsGrid = ({ statistics }: StatisticsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {statistics.map((stat, index) => (
        <Statistic
          key={index}
          value={stat.value}
          label={stat.label}
          icon={stat.icon}
          prefix={stat.prefix}
          suffix={stat.suffix}
          className="hover:transform hover:scale-105 transition-all duration-300"
        />
      ))}
    </div>
  );
};
