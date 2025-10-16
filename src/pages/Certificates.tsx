import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, Award } from "lucide-react";

interface Certificate {
  id: string;
  issued_at: string;
  certificate_url: string;
  course: {
    title: string;
    instructor_name: string;
  };
}

const Certificates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("certificates")
        .select(`
          id,
          issued_at,
          certificate_url,
          course_id
        `)
        .eq("user_id", session.user.id)
        .order("issued_at", { ascending: false });

      if (data) {
        const enrichedData = await Promise.all(
          data.map(async (cert) => {
            const { data: course } = await supabase
              .from("courses")
              .select("title, instructor_name")
              .eq("id", cert.course_id)
              .single();

            return {
              ...cert,
              course: course || { title: "Unknown", instructor_name: "Unknown" },
            };
          })
        );

        setCertificates(enrichedData as any);
      }

      setLoading(false);
    };

    fetchCertificates();
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Certificates</h1>
          <p className="text-muted-foreground">
            View and download your course completion certificates
          </p>
        </div>

        {certificates.length === 0 ? (
          <Card className="gradient-card shadow-medium">
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No certificates yet</h2>
              <p className="text-muted-foreground mb-6">
                Complete courses to earn certificates
              </p>
              <Button onClick={() => navigate("/")} className="bg-gradient-hero">
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="gradient-card shadow-medium hover:shadow-large transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-6 w-6 text-primary" />
                    <CardTitle className="line-clamp-2">{cert.course.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-1">
                    Instructor: {cert.course.instructor_name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Issued: {new Date(cert.issued_at).toLocaleDateString()}
                  </p>
                  <Button className="w-full bg-gradient-hero" asChild>
                    <a href={cert.certificate_url} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </a>
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

export default Certificates;
