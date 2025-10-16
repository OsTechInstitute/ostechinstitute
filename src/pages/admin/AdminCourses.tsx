import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_name: string;
  category: string;
  level: string;
  price: number;
  is_published: boolean;
  thumbnail_url: string;
}

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
    if (data) setCourses(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const courseData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      instructor_name: formData.get("instructor_name") as string,
      category: formData.get("category") as string,
      level: formData.get("level") as string,
      price: Number(formData.get("price")),
      thumbnail_url: formData.get("thumbnail_url") as string,
      is_published: formData.get("is_published") === "true",
    };

    if (editingCourse) {
      const { error } = await supabase
        .from("courses")
        .update(courseData)
        .eq("id", editingCourse.id);
      
      if (error) {
        toast({ title: "Error updating course", variant: "destructive" });
      } else {
        toast({ title: "Course updated successfully" });
      }
    } else {
      const { error } = await supabase.from("courses").insert(courseData);
      
      if (error) {
        toast({ title: "Error creating course", variant: "destructive" });
      } else {
        toast({ title: "Course created successfully" });
      }
    }

    setOpen(false);
    setEditingCourse(null);
    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      
      if (error) {
        toast({ title: "Error deleting course", variant: "destructive" });
      } else {
        toast({ title: "Course deleted successfully" });
        fetchCourses();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCourse(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingCourse?.title} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingCourse?.description} required />
              </div>
              <div>
                <Label htmlFor="instructor_name">Instructor Name</Label>
                <Input id="instructor_name" name="instructor_name" defaultValue={editingCourse?.instructor_name} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" defaultValue={editingCourse?.category} required />
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select name="level" defaultValue={editingCourse?.level || "Beginner"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₦)</Label>
                  <Input id="price" name="price" type="number" defaultValue={editingCourse?.price} required />
                </div>
                <div>
                  <Label htmlFor="is_published">Status</Label>
                  <Select name="is_published" defaultValue={editingCourse?.is_published ? "true" : "false"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Published</SelectItem>
                      <SelectItem value="false">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input id="thumbnail_url" name="thumbnail_url" defaultValue={editingCourse?.thumbnail_url} required />
              </div>
              <Button type="submit" className="w-full">
                {editingCourse ? "Update Course" : "Create Course"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="gradient-card">
            <img src={course.thumbnail_url} alt={course.title} className="w-full h-48 object-cover rounded-t-lg" />
            <CardHeader>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{course.instructor_name}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">₦{course.price.toLocaleString()}</span>
                <span className={`px-2 py-1 rounded text-xs ${course.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {course.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setEditingCourse(course);
                    setOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDelete(course.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
