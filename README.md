import { Quiz } from '../entities/quiz';
import { Question } from '../entities/question';
import { Option } from '../entities/option';
import { QuizRepository } from '../repositories/quiz.repository';
import { questionRepository } from '../repositories/question.repository';
import { optionRepository } from '../repositories/option.repository';
import { CourseRepository } from '../repositories/course.repository';

export class QuizService {
  async createQuiz(quizData: Partial<Quiz>, questions: any[]): Promise<Quiz> {
    // Fetch course from DB to avoid NULL courseId
    const course = await CourseRepository.findOne({ where: { courseId: quizData.courseId } });
    if (!course) {
      throw new Error('Course not found');
    }

    const quiz = QuizRepository.create({
      quizName: quizData.quizName,
      description: quizData.description,
      totalmarks: quizData.totalmarks,
      course: course // ✅ Set course relation properly
    });

    const savedQuiz = await QuizRepository.save(quiz);

    for (const q of questions) {
      const question = questionRepository.create({
        questionText: q.questionText,
        correctOptionId: q.correctOptionId,
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
}
