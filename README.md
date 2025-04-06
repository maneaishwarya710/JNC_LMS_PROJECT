// 📁 backend/src/services/quiz.service.ts

import { getRepository } from 'typeorm';
import { Quiz } from '../entities/quiz';
import { Question } from '../entities/question';
import { questionRepository } from '../repositories/question.repository';
import { QuizRepository } from '../repositories/quiz.repository';
import { ResultRepository } from '../repositories/result.repository';
import { QuizAttemptRepository } from '../repositories/quizAttempt.repository';
import { Answer } from '../entities/answer';
import { QuizAttempt } from '../entities/quizAttempt';
import { answerRepository } from '../repositories/answer.repository';
import { Result } from '../entities/result';
import { optionRepository } from '../repositories/option.repository';
import { courseRepository } from '../repositories/course.repository';

export class QuizService {
  async createQuiz(quizData: Partial<Quiz>, questions: any[]): Promise<Quiz> {
    const course = await courseRepository.findOne({ where: { courseId: quizData.course?.courseId } });

    if (!course) {
      throw new Error('Course not found');
    }

    const quiz = QuizRepository.create({
      quizName: quizData.quizName,
      description: quizData.description,
      totalmarks: quizData.totalmarks,
      course: course
    });

    const savedQuiz = await QuizRepository.save(quiz);

    for (const q of questions) {
      const question = questionRepository.create({
        questionText: q.questionText,
        correctOptionId: q.correctOptionId, // ✅ Make sure this is provided when creating quiz
        quiz: savedQuiz
      });

      const savedQuestion = await questionRepository.save(question);

      for (const opt of q.options) {
        const option = optionRepository.create({
          optionText: opt.optionText,
          question: savedQuestion
        });
        await optionRepository.save(option);
      }
    }

    return savedQuiz;
  }

  async getQuizByCourseId(courseId: number): Promise<Quiz[]> {
    return await QuizRepository.find({
      where: { course: { courseId } },
      relations: ['questions', 'questions.options']
    });
  }

  async submitQuiz(
    attemptData: { userId: number; quizId: number },
    answers: { questionId: number; selectedOptionId: number }[]
  ): Promise<{ score: number }> {
    const { userId, quizId } = attemptData;

    let score = 0;

    for (const answer of answers) {
      // ✅ Fetch the question and compare selected option with correct one
      const question = await questionRepository.findOne({ where: { questionId: answer.questionId } });

      if (question && question.correctOptionId === answer.selectedOptionId) {
        score++;
      }
    }

    // ✅ Save attempt
    const attempt = QuizAttemptRepository.create({
      userId,
      quizId,
      score,
      attemptDate: new Date()
    });

    await QuizAttemptRepository.save(attempt);

    // ✅ Save result entry
    const result = ResultRepository.create({
      score,
      quiz: { quizId },
      user: { userId },
      attemptDate: new Date()
    });

    await ResultRepository.save(result);

    return { score };
  }

  async getResultsByUserId(userId: number): Promise<Result[]> {
    return await ResultRepository.find({
      where: { user: { userId } },
      relations: ['quiz', 'course']
    });
  }
}
