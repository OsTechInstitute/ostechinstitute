import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ValuePropositions } from "@/components/ValuePropositions";
import { Metrics } from "@/components/Metrics";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import { CourseGrid } from "@/components/CourseGrid";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ValuePropositions />
      <Metrics />
      <FeaturedCourses />
      <CourseGrid />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
