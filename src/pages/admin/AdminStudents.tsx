import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Student {
  id: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  enrollments: number;
  role: string;
}

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url, created_at");

    if (profiles) {
      const studentsWithData = await Promise.all(
        profiles.map(async (profile) => {
          const { count } = await supabase
            .from("enrollments")
            .select("*", { count: "exact", head: true })
            .eq("user_id", profile.id);

          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", profile.id)
            .maybeSingle();

          return {
            ...profile,
            enrollments: count || 0,
            role: roleData?.role || "student",
          };
        })
      );

      setStudents(studentsWithData);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Students</h1>
      <Card className="gradient-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar_url} />
                        <AvatarFallback>
                          {student.full_name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.full_name || "Unknown"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>
                    <Badge variant={student.role === "admin" ? "default" : "secondary"}>
                      {student.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.enrollments}</TableCell>
                  <TableCell>
                    {new Date(student.created_at).toLocaleDateString()}
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

export default AdminStudents;
