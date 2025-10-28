import { BookOpen, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">OsTech Institute</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering tech learners worldwide with expert-led courses and industry-recognized certificates.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/learnhub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/learnhub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/learnhub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/learnhub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/course/0b400db2-ff6f-4bfa-b2d6-e0134e474643" className="hover:text-primary transition-colors">Cybersecurity</Link></li>
              <li><Link to="/course/4902864c-a876-4e79-a4a8-c3a5c441e110" className="hover:text-primary transition-colors">DevOps</Link></li>
              <li><Link to="/course/acc6f411-27ce-4e42-bfaa-fd4f32c51975" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/course/79c4b959-381b-40ed-a16c-b4ebe4a1faee" className="hover:text-primary transition-colors">Cloud Computing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="https://careers.learnhub.com" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="https://blog.learnhub.com" className="hover:text-primary transition-colors">Blog</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OsTech Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
