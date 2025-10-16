import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Certificate {
  id: string;
  issued_at: string;
  certificate_url: string;
  user: {
    full_name: string;
  };
  course: {
    title: string;
  };
}

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const { data } = await supabase
      .from("certificates")
      .select(`
        id,
        issued_at,
        certificate_url,
        user_id,
        course_id
      `)
      .order("issued_at", { ascending: false });

    if (data) {
      const enrichedData = await Promise.all(
        data.map(async (cert) => {
          const { data: user } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", cert.user_id)
            .single();

          const { data: course } = await supabase
            .from("courses")
            .select("title")
            .eq("id", cert.course_id)
            .single();

          return {
            ...cert,
            user: user || { full_name: "Unknown" },
            course: course || { title: "Unknown" },
          };
        })
      );

      setCertificates(enrichedData as any);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Certificates</h1>
      <Card className="gradient-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.user.full_name}</TableCell>
                  <TableCell>{cert.course.title}</TableCell>
                  <TableCell>
                    {new Date(cert.issued_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" asChild>
                      <a href={cert.certificate_url} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCertificates;
