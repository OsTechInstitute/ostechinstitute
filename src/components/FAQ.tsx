import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "How do I get started with OsTech Institute?",
      answer: "Simply create a free account, browse our course catalog, and enroll in the courses that interest you. You can start learning immediately after enrollment!"
    },
    {
      question: "Do I receive a certificate upon completion?",
      answer: "Yes! Upon successfully completing a course, you'll receive a professional certificate that you can download and share on your LinkedIn profile or resume."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept card payments and bank transfers through Paystack, ensuring secure and convenient transactions for all students."
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely! All courses are self-paced, allowing you to learn whenever and wherever suits you best. Your progress is automatically saved."
    },
    {
      question: "Are the courses beginner-friendly?",
      answer: "We offer courses for all skill levels - beginner, intermediate, and advanced. Each course clearly indicates its level so you can choose accordingly."
    },
    {
      question: "How long do I have access to a course?",
      answer: "Once you enroll in a course, you get lifetime access to all course materials, including any future updates and improvements."
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
