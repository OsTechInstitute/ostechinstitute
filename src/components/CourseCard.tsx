import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  instructor_name: string;
  category: string;
  level: string;
  price: number;
  lessonCount?: number;
}

export const CourseCard = ({
  id,
  title,
  description,
  thumbnail_url,
  instructor_name,
  category,
  level,
  price,
  lessonCount = 0,
}: CourseCardProps) => {
  const navigate = useNavigate();

  const levelColors = {
    beginner: "bg-success/10 text-success",
    intermediate: "bg-primary/10 text-primary",
    advanced: "bg-accent/10 text-accent",
  };

  return (
    <Card className="group overflow-hidden hover:shadow-large transition-all duration-300 cursor-pointer gradient-card border-border/50" onClick={() => navigate(`/course/${id}`)}>
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumbnail_url}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className={levelColors[level as keyof typeof levelColors]}>
            {level}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <Badge variant="outline" className="mb-3">
          {category}
        </Badge>
        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Award className="h-4 w-4" />
          <span>{instructor_name}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{lessonCount} lessons</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(price)}
        </div>
        <Button className="rounded-full bg-gradient-hero hover:opacity-90 transition-opacity">
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
};
