import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Amina Yusuf",
      role: "Full Stack Developer",
      content: "OsTech Institute transformed my career. The Cybersecurity course gave me the skills I needed to land my dream job. The instructors are incredibly knowledgeable!",
      rating: 5,
      initials: "SJ"
    },
    {
      name: "Kwame Mensah",
      role: "DevOps Engineer",
      content: "The DevOps course is outstanding! Practical, hands-on lessons that I could apply immediately. The certificate helped boost my professional credibility.",
      rating: 5,
      initials: "MC"
    },
    {
      name: "Zanele Dlamini",
      role: "Web Developer",
      content: "Best online learning platform I've used. The Web Development course is comprehensive and the video quality is excellent. Highly recommend!",
      rating: 5,
      initials: "EW"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful students who've transformed their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
