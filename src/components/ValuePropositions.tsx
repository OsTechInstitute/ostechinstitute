import { BookOpen, Video, Award, Clock, Users, TrendingUp } from "lucide-react";

export const ValuePropositions = () => {
  const values = [
    {
      icon: Video,
      title: "Expert-Led Video Lessons",
      description: "Learn from industry professionals with years of real-world experience"
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Access courses 24/7 and progress at a speed that works for you"
    },
    {
      icon: Award,
      title: "Earn Certificates",
      description: "Get recognized with professional certificates upon course completion"
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "Connect with thousands of students and grow your network"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Advance your career with in-demand tech skills"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Content",
      description: "Deep-dive into topics with structured, well-organized curriculum"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose LearnHub?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed in your tech learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
