import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using LearnHub, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these terms, please do 
              not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily access the materials on LearnHub for personal, 
              non-commercial use only. This license shall automatically terminate if you violate 
              any of these restrictions.
            </p>
            <p className="text-muted-foreground">Under this license you may not:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Transfer the materials to another person</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Course Enrollment and Access</h2>
            <p className="text-muted-foreground mb-4">
              When you enroll in a course, you are granted access to course materials for the 
              duration specified at the time of purchase. Access may be:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Lifetime access for certain courses</li>
              <li>Time-limited access as specified</li>
              <li>Subject to revocation if terms are violated</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Payment and Refunds</h2>
            <p className="text-muted-foreground mb-4">
              All payments are processed securely through our payment provider. Refund policies 
              are as follows:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>30-day money-back guarantee for most courses</li>
              <li>Refunds processed within 5-7 business days</li>
              <li>No refunds for completed courses with certificates issued</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All course content, including videos, text, graphics, and other materials, are 
              owned by LearnHub or our content providers and are protected by copyright laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              LearnHub shall not be liable for any damages arising from the use or inability 
              to use our services, even if we have been notified of the possibility of such damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting to the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p className="text-muted-foreground">
              Questions about the Terms of Service should be sent to legal@learnhub.com.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;