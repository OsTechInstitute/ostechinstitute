import { BookOpen, Users, Award, Star } from "lucide-react";

export const Metrics = () => {
  const metrics = [
    {
      icon: BookOpen,
      value: "500+",
      label: "Expert Courses",
      color: "text-primary"
    },
    {
      icon: Users,
      value: "50K+",
      label: "Active Students",
      color: "text-accent"
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      color: "text-success"
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "Average Rating",
      color: "text-warning"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                {metric.value}
              </div>
              <div className="text-sm md:text-base text-foreground/80 front-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
