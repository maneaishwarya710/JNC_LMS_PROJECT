<h3>Create Quiz</h3>
<form [formGroup]="quizForm" (ngSubmit)="createQuiz()">
  <div>
    <label for="quizName">Quiz Name:</label>
    <input id="quizName" formControlName="quizName" type="text" />
  </div>
  <div>
    <label for="description">Description:</label>
    <input id="description" formControlName="description" type="text" />
  </div>
  <div>
    <label for="totalmarks">Total Marks:</label>
    <input id="totalmarks" formControlName="totalmarks" type="number" />
  </div>
  <div>
    <label for="courseId">Course ID:</label>
    <input id="courseId" formControlName="courseId" type="number" />
  </div>

  <div formArrayName="questions">
    <div *ngFor="let question of questions.controls; let i = index" [formGroupName]="i">
      <h4>Question {{ i + 1 }}</h4>
      <label for="questionText-{{ i }}">Question Text:</label>
      <input id="questionText-{{ i }}" formControlName="questionText" type="text" />

      <label for="correctOptionId-{{ i }}">Correct Option ID:</label>
      <input id="correctOptionId-{{ i }}" formControlName="correctOptionId" type="number" />

      <div formArrayName="options">
        <div *ngFor="let option of options(i).controls; let j = index" [formGroupName]="j">
          <label for="optionText-{{ i }}-{{ j }}">Option {{ j + 1 }}:</label>
          <input id="optionText-{{ i }}-{{ j }}" formControlName="optionText" type="text" />
        </div>
        <button type="button" (click)="addOption(i)">Add Option</button>
      </div>
    </div>
  </div>

  <button type="button" (click)="addQuestion()">Add Question</button>
  <br />
  <button type="submit" [disabled]="quizForm.invalid">Create Quiz</button>
</form>


