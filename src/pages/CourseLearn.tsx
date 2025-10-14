import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  duration_minutes: number;
  order_index: number;
}

interface Course {
  id: string;
  title: string;
}

const CourseLearn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);

      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", id)
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!enrollmentData) {
        toast.error("You are not enrolled in this course");
        navigate(`/course/${id}`);
        return;
      }

      const { data: courseData } = await supabase
        .from("courses")
        .select("id, title")
        .eq("id", id)
        .single();

      if (courseData) {
        setCourse(courseData);
      }

      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", id)
        .order("order_index");

      if (lessonsData) {
        setLessons(lessonsData);
      }

      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", session.user.id)
        .eq("completed", true);

      if (progressData) {
        setCompletedLessons(new Set(progressData.map((p) => p.lesson_id)));
      }

      setLoading(false);
    };

    fetchData();
  }, [id, navigate]);

  const markLessonComplete = async (lessonId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("lesson_progress")
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      });

    if (!error) {
      setCompletedLessons((prev) => new Set([...prev, lessonId]));
      toast.success("Lesson marked as complete!");
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
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

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">No lessons available</h1>
        </div>
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">{course?.title}</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="overflow-hidden shadow-large gradient-card mb-6">
              <div className="aspect-video bg-black">
                <iframe
                  src={getYouTubeEmbedUrl(currentLesson.youtube_url)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                <p className="text-muted-foreground mb-4">{currentLesson.description}</p>
                <div className="flex items-center gap-4">
                  {!completedLessons.has(currentLesson.id) && (
                    <Button onClick={() => markLessonComplete(currentLesson.id)} className="bg-gradient-hero">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Complete
                    </Button>
                  )}
                  {completedLessons.has(currentLesson.id) && (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Completed</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentLessonIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentLessonIndex === 0}
                className="flex-1"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Button>
              <Button
                onClick={() => setCurrentLessonIndex((prev) => Math.min(lessons.length - 1, prev + 1))}
                disabled={currentLessonIndex === lessons.length - 1}
                className="flex-1 bg-gradient-hero"
              >
                Next Lesson
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="gradient-card shadow-medium">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">Course Content</h3>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonIndex(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === currentLessonIndex
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/50 hover:bg-background"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {completedLessons.has(lesson.id) ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : (
                            <PlayCircle className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{lesson.title}</div>
                          <div className="text-xs opacity-70">{lesson.duration_minutes} min</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
