import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, BookOpen, PlayCircle, CheckCircle } from "lucide-react";

interface EnrolledCourse {
  id: string;
  course: {
    id: string;
    title: string;
    thumbnail_url: string;
    instructor_name: string;
    category: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);

      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          id,
          course:courses(
            id,
            title,
            thumbnail_url,
            instructor_name,
            category
          )
        `)
        .eq("user_id", session.user.id);

      if (!error && data) {
        setEnrolledCourses(data as EnrolledCourse[]);
      }

      setLoading(false);
    };

    checkUser();
  }, [navigate]);

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Learning Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and continue learning</p>
        </div>

        {enrolledCourses.length === 0 ? (
          <Card className="gradient-card shadow-medium">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No courses yet</h2>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Button onClick={() => navigate("/")} className="bg-gradient-hero">
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment) => (
              <Card
                key={enrollment.id}
                className="group overflow-hidden hover:shadow-large transition-all duration-300 cursor-pointer gradient-card"
                onClick={() => navigate(`/course/${enrollment.course.id}/learn`)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={enrollment.course.thumbnail_url}
                    alt={enrollment.course.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {enrollment.course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{enrollment.course.instructor_name}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <Button className="w-full mt-4 bg-gradient-hero" onClick={() => navigate(`/course/${enrollment.course.id}/learn`)}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
