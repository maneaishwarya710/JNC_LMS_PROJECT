// src/app/services/quiz.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private baseUrl = 'http://localhost:3000/api/quiz';

  constructor(private http: HttpClient) {}

  getQuizByCourseId(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${courseId}`);
  }

  submitQuiz(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, data);
  }

  getResultsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/results/${userId}`);
  }
}


// src/app/components/quiz-attempt/quiz-attempt.component.ts
import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
})
export class QuizAttemptComponent {
  courseId: number = 0;
  userId: number = 1; // Simulate login
  quizzes: any[] = [];
  selectedAnswers: { [questionId: number]: number } = {};
  submitted = false;
  score: number | null = null;

  constructor(private quizService: QuizService) {}

  fetchQuiz() {
    this.quizService.getQuizByCourseId(this.courseId).subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  submitQuiz() {
    const quizId = this.quizzes[0]?.quizId;
    const answers = Object.keys(this.selectedAnswers).map((questionId) => ({
      questionId: +questionId,
      selectedOptionId: this.selectedAnswers[+questionId],
    }));

    const attemptData = {
      quizId,
      userId: this.userId,
      attemptDate: new Date(),
    };

    this.quizService.submitQuiz({ attemptData, answers }).subscribe((result) => {
      this.submitted = true;
      this.score = result.score;
    });
  }
}


// src/app/components/quiz-attempt/quiz-attempt.component.html
<div class="p-4 max-w-xl mx-auto">
  <h2 class="text-xl font-bold mb-4">Attempt Quiz</h2>
  <input [(ngModel)]="courseId" type="number" class="border p-2 mb-4 w-full" placeholder="Enter Course ID" />
  <button (click)="fetchQuiz()" class="bg-blue-500 text-white px-4 py-2 mb-4">Fetch Quiz</button>

  <div *ngIf="quizzes.length">
    <form (ngSubmit)="submitQuiz()">
      <div *ngFor="let question of quizzes[0]?.questions">
        <p class="font-semibold">{{ question.questionText }}</p>
        <div *ngFor="let option of question.options">
          <label>
            <input type="radio" [value]="option.optionId" [name]="question.questionId" [(ngModel)]="selectedAnswers[question.questionId]" required />
            {{ option.optionText }}
          </label>
        </div>
      </div>
      <button type="submit" class="mt-4 bg-green-600 text-white px-4 py-2" [disabled]="submitted">Submit Quiz</button>
    </form>
    <div *ngIf="submitted">
      <p class="mt-4 text-lg">Score: {{ score }}</p>
    </div>
  </div>
</div>


// src/app/components/quiz-result/quiz-result.component.ts
import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
})
export class QuizResultComponent {
  userId: number = 1;
  results: any[] = [];

  constructor(private quizService: QuizService) {}

  fetchResults() {
    this.quizService.getResultsByUserId(this.userId).subscribe((res) => {
      this.results = res;
    });
  }
}


// src/app/components/quiz-result/quiz-result.component.html
<div class="p-4 max-w-xl mx-auto">
  <h2 class="text-xl font-bold mb-4">Your Quiz Results</h2>
  <button (click)="fetchResults()" class="bg-purple-600 text-white px-4 py-2">Get Results</button>
  <div *ngFor="let result of results" class="mt-4 border p-2 rounded">
    <p><strong>Quiz:</strong> {{ result.quiz.quizName }}</p>
    <p><strong>Score:</strong> {{ result.score }}</p>
    <p><strong>Date:</strong> {{ result.attemptDate | date }}</p>
  </div>
</div>


// app.module.ts - Add FormsModule
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [FormsModule]
})
export class AppModule {}
