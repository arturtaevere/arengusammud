
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Feedback {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  type: string;
  preview: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  return (
    <div className="grid gap-4">
      {feedbacks.map((feedback) => (
        <Card key={feedback.id} className="transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-lg">{feedback.teacher}</CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full ${
                feedback.type === 'Kiitus'
                  ? 'bg-green-100 text-green-800'
                  : feedback.type === 'Soovitus'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
              }`}>
                {feedback.type}
              </span>
            </div>
            <CardDescription>{feedback.subject} • {feedback.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{feedback.preview}</p>
          </CardContent>
          <CardFooter>
            <div className="flex justify-end w-full">
              <Link to={`/feedback/${feedback.id}`}>
                <Button variant="outline" size="sm">Vaata</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackList;
