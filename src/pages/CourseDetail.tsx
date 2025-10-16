import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, PlayCircle, Award, Clock, BookOpen } from "lucide-react";
import { PaystackButton } from "react-paystack";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  instructor_name: string;
  category: string;
  level: string;
  price: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  duration_minutes: number;
  order_index: number;
}

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (!courseError && courseData) {
        setCourse(courseData);
      }

      const { data: lessonsData, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", id)
        .order("order_index");

      if (!lessonsError && lessonsData) {
        setLessons(lessonsData);
      }

      if (session?.user) {
        const { data: enrollmentData } = await supabase
          .from("enrollments")
          .select("*")
          .eq("course_id", id)
          .eq("user_id", session.user.id)
          .maybeSingle();

        setIsEnrolled(!!enrollmentData);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/auth?tab=signup");
      return;
    }

    setEnrolling(true);

    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: id,
      payment_status: "completed",
    });

    if (error) {
      toast.error("Failed to enroll in course");
    } else {
      toast.success("Successfully enrolled!");
      setIsEnrolled(true);
      navigate("/dashboard");
    }

    setEnrolling(false);
  };

  const handlePaymentSuccess = async (reference: any) => {
    setEnrolling(true);

    const { error: transactionError } = await supabase
      .from("payment_transactions")
      .insert({
        user_id: user.id,
        course_id: id,
        amount: course?.price || 0,
        status: "completed",
        paystack_reference: reference.reference,
        currency: "NGN",
      });

    if (transactionError) {
      toast.error("Failed to record transaction");
      setEnrolling(false);
      return;
    }

    const { error: enrollmentError } = await supabase
      .from("enrollments")
      .insert({
        user_id: user.id,
        course_id: id,
        payment_status: "completed",
      });

    if (enrollmentError) {
      toast.error("Failed to enroll in course");
    } else {
      toast.success("Payment successful! You're enrolled!");
      setIsEnrolled(true);
      navigate("/dashboard");
    }

    setEnrolling(false);
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: user?.email || "",
    amount: Math.round((course?.price || 0) * 100),
    publicKey: "pk_test_xxxxxxxxxxxxx", // Replace with your PayStack public key
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
        </div>
      </div>
    );
  }

  const levelColors = {
    beginner: "bg-success/10 text-success",
    intermediate: "bg-primary/10 text-primary",
    advanced: "bg-accent/10 text-accent",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-lg overflow-hidden mb-6 shadow-large">
              <img
                src={course.thumbnail_url || ""}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={levelColors[course.level as keyof typeof levelColors]}>
                  {course.level}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5" />
                <span>Instructor: {course.instructor_name}</span>
              </div>
            </div>

            <Card className="gradient-card shadow-medium">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-background/50 hover:bg-background transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{lesson.duration_minutes} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <PlayCircle className="h-4 w-4" />
                            <span>Video</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 gradient-card shadow-large">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-6">
                  {course.price === 0 ? "Free" : `₦${course.price.toLocaleString()}`}
                </div>

                {isEnrolled ? (
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="w-full mb-4 bg-gradient-hero"
                    size="lg"
                  >
                    Go to My Courses
                  </Button>
                ) : course?.price === 0 ? (
                  <Button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full mb-4 bg-gradient-hero"
                    size="lg"
                  >
                    {enrolling ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>Enroll Free</>
                    )}
                  </Button>
                ) : (
                  <PaystackButton
                    {...paystackConfig}
                    text="Enroll Now - Pay with PayStack"
                    onSuccess={handlePaymentSuccess}
                    onClose={() => toast.error("Payment cancelled")}
                    className="w-full mb-4 bg-gradient-hero h-11 rounded-md text-sm font-medium px-8 inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  />
                )}

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <BookOpen className="h-5 w-5" />
                    <span>{lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>
                      {lessons.reduce((acc, lesson) => acc + lesson.duration_minutes, 0)} minutes total
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Award className="h-5 w-5" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
