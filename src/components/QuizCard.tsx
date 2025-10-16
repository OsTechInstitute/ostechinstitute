import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  order_index: number;
}

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    description: string;
    passing_score: number;
  };
  questions: QuizQuestion[];
  onComplete: (score: number, answers: Record<string, string>) => void;
}

export const QuizCard = ({ quiz, questions, onComplete }: QuizCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore, answers);
  };

  if (showResults) {
    const passed = score >= quiz.passing_score;
    return (
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {passed ? (
            <CheckCircle className="h-24 w-24 text-green-600 mx-auto" />
          ) : (
            <XCircle className="h-24 w-24 text-red-600 mx-auto" />
          )}
          <div>
            <p className="text-4xl font-bold mb-2">{score}%</p>
            <p className="text-muted-foreground">
              {passed ? "Congratulations! You passed!" : "Keep practicing!"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Passing score: {quiz.passing_score}%
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="gradient-card">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <RadioGroup
            value={answers[question.id]}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button
          onClick={handleNext}
          disabled={!answers[question.id]}
          className="w-full"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Submit Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
};
