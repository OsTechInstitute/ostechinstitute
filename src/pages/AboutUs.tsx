import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Users, Target, Award, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About LearnHub</h1>
          
          <section className="mb-12">
            <p className="text-lg text-muted-foreground mb-6">
              LearnHub is a premier online learning platform dedicated to empowering individuals 
              with cutting-edge tech skills. Founded with the mission to make quality education 
              accessible to everyone, we've helped thousands of students worldwide achieve their 
              career goals.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border rounded-lg">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-muted-foreground">
                To democratize tech education by providing high-quality, affordable courses 
                that prepare learners for real-world challenges in the technology industry.
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the world's most trusted platform for tech education, bridging the 
                gap between ambition and achievement for millions of learners globally.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose LearnHub?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Instructors</h3>
                <p className="text-sm text-muted-foreground">
                  Learn from industry professionals with years of real-world experience
                </p>
              </div>
              
              <div className="text-center p-6">
                <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Industry-Recognized Certificates</h3>
                <p className="text-sm text-muted-foreground">
                  Earn certificates that boost your career prospects
                </p>
              </div>
              
              <div className="text-center p-6">
                <Target className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Practical Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Hands-on projects and real-world scenarios in every course
                </p>
              </div>
            </div>
          </section>

          <section className="bg-muted/30 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-muted-foreground">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Expert Courses</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;