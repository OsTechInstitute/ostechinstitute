import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalCertificates: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [courses, students, certificates, transactions] = await Promise.all([
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("certificates").select("id", { count: "exact", head: true }),
        supabase.from("payment_transactions").select("amount").eq("status", "completed"),
      ]);

      const revenue = transactions.data?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;

      setStats({
        totalCourses: courses.count || 0,
        totalStudents: students.count || 0,
        totalCertificates: certificates.count || 0,
        totalRevenue: revenue,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Certificates Issued",
      value: stats.totalCertificates,
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Total Revenue",
      value: `₦${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-orange-600",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="gradient-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
