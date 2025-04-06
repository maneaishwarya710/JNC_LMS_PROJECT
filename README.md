import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-get-quiz-by-course-id',
  templateUrl: './get-quiz-by-course-id.component.html',
  styleUrls: ['./get-quiz-by-course-id.component.css']
})
export class GetQuizByCourseIdComponent {
  courseId: number = 19;
  userId: number = 14; // Replace with actual user ID logic
  quiz: any;
  answers: any[] = [];
  submitted = false;
  score: number | null = null;

  constructor(private quizService: QuizService) {}

  fetchQuiz() {
    this.quizService.getQuizByCourseId(this.courseId).subscribe((data) => {
      if (data.length > 0) {
        this.quiz = data[0];
        this.submitted = false;
        this.answers = this.quiz.questions.map((q: any) => ({
          questionId: q.questionId,
          selectedOptionId: null
        }));
      } else {
        this.quiz = null;
        this.answers = [];
        this.score = null;
        this.submitted = false;
        alert('No quiz found for the given course ID');
      }
    }, err => {
      console.error('Error fetching quiz:', err);
      alert('An error occurred while fetching the quiz');
    });
  }

  selectOption(questionId: number, optionId: number) {
    const answer = this.answers.find(a => a.questionId === questionId);
    if (answer) {
      answer.selectedOptionId = optionId;
    }
  }

  submitQuiz() {
    const attemptData = {
      userId: this.userId,
      quizId: this.quiz.quizId,
      attemptDate: new Date(),
    };
    this.quizService.submitQuiz(attemptData, this.answers).subscribe(res => {
      this.score = res.score;
      this.submitted = true;
      this.getResults();
    }, err => {
      console.error('Error submitting quiz:', err);
      alert('Error submitting the quiz');
    });
  }

  getResults() {
    this.quizService.getResultsByUserId(this.userId).subscribe(results => {
      console.log('Your past results:', results);
    });
  }
}



<div class="container p-4">
  <h2 class="text-xl font-bold mb-4">Take Quiz</h2>

  <label for="courseId" class="block mb-2 font-medium">Enter Course ID:</label>
  <input [(ngModel)]="courseId" type="number" class="border p-2 mb-4 w-full" placeholder="e.g. 1" />

  <button (click)="fetchQuiz()" class="bg-blue-600 text-white px-4 py-2 rounded">
    Get Quiz
  </button>

  <div *ngIf="quiz">
    <h3 class="text-lg font-semibold mt-4">{{ quiz.quizName }}</h3>
    <p>{{ quiz.description }}</p>

    <form *ngFor="let q of quiz.questions">
      <div class="mt-4">
        <p class="font-medium">{{ q.questionText }}</p>
        <div *ngFor="let opt of q.options">
          <input
            type="radio"
            [name]="'question_' + q.questionId"
            [value]="opt.optionId"
            (change)="selectOption(q.questionId, opt.optionId)"
            [disabled]="submitted"
          />
          <label>{{ opt.optionText }}</label>
        </div>
      </div>
    </form>

    <button
      *ngIf="!submitted"
      (click)="submitQuiz()"
      class="mt-4 bg-green-600 text-white px-4 py-2 rounded"
    >
      Submit Quiz
    </button>

    <div *ngIf="submitted" class="mt-4 text-green-700">
      <p>✅ Quiz submitted!</p>
      <p>Your score: {{ score }}/{{ quiz.questions.length }}</p>
    </div>
  </div>
</div>
