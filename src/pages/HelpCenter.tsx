import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, Book, CreditCard, Award, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Help Center</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Find answers to common questions and get the help you need
          </p>

          <div className="relative mb-12">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link to="/contact" className="p-6 border rounded-lg hover:border-primary transition-colors">
              <MessageCircle className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Get in touch with our support team</p>
            </Link>

            <div className="p-6 border rounded-lg">
              <Book className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Course Resources</h3>
              <p className="text-sm text-muted-foreground">Access guides and tutorials</p>
            </div>

            <div className="p-6 border rounded-lg">
              <CreditCard className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Billing & Payments</h3>
              <p className="text-sm text-muted-foreground">Manage your subscriptions</p>
            </div>

            <div className="p-6 border rounded-lg">
              <Award className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Certificates</h3>
              <p className="text-sm text-muted-foreground">Learn about course completion</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I enroll in a course?</AccordionTrigger>
              <AccordionContent>
                To enroll in a course, browse our course catalog, select the course you're interested in, 
                and click the "Enroll Now" button. For paid courses, you'll be directed to our secure 
                payment page. Once payment is complete, you'll have immediate access to the course materials.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, debit cards, and various local payment methods through 
                our secure payment processor. All transactions are encrypted and secure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do I access my courses?</AccordionTrigger>
              <AccordionContent>
                After enrolling, you can access your courses from the "My Courses" section in your dashboard. 
                Simply log in to your account and click on any course to start learning.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I get a refund?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 30-day money-back guarantee for most courses. If you're not satisfied with 
                a course, contact our support team within 30 days of purchase for a full refund.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I earn a certificate?</AccordionTrigger>
              <AccordionContent>
                To earn a certificate, you must complete all lessons in a course and pass any required quizzes 
                or assessments. Once you've completed all requirements, your certificate will be automatically 
                generated and available in your "Certificates" section.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Is there a mobile app?</AccordionTrigger>
              <AccordionContent>
                Our platform is fully responsive and works great on mobile browsers. We're currently developing 
                native mobile apps for iOS and Android, which will be available soon.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>How long do I have access to a course?</AccordionTrigger>
              <AccordionContent>
                Most courses offer lifetime access, meaning you can learn at your own pace and revisit the 
                materials whenever you need. Some specialized courses may have time-limited access, which 
                will be clearly indicated on the course page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>Can I download course materials?</AccordionTrigger>
              <AccordionContent>
                Selected course materials such as PDFs, code files, and resources are available for download. 
                Video content is available for streaming only to protect instructor intellectual property.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
            <h3 className="font-semibold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you with any questions
            </p>
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;