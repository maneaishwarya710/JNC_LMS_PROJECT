import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Question } from "./question";

@Entity({name:"OPTION_LMS"})
export class Option {
@PrimaryGeneratedColumn()
optionId: number;
@Column()
questionId: number;
@Column()
optionText: string;
@ManyToOne(() => Question, (question) => question.options)
@JoinColumn({ name: "questionId" })
question: Question;
}


async submitQuiz(
    attemptData: { userId: number; quizId: number },
    answers: { questionId: number; selectedOptionId: number }[],
  ): Promise<{ score: number }> {
    const { userId, quizId } = attemptData;

    let score = 0;

    for (const answer of answers) {
      // Fetch the correct option for this question
      const correctOption = await optionRepository.findOne({
        where: {
          question: { questionId: answer.questionId },
          isCorrect: true,
        },
        relations: ['question'], // Ensure relation is loaded
      });

      // Compare selectedOptionId with the correct one
      if (
        correctOption &&
        correctOption.optionId === answer.selectedOptionId
      ) {
        score++;
      }
    }

    // Create and save the attempt
    const attempt = QuizAttemptRepository.create({
      userId,
      quizId,
      score,
      attemptDate: new Date(), // Add date explicitly
    });

    await QuizAttemptRepository.save(attempt);

    return { score };
  }
