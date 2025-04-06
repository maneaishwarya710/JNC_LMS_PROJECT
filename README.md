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
      quiz: savedQuiz
    });

    const savedQuestion = await questionRepository.save(question);

    for (const opt of q.options) {
      const optionData = optionRepository.create({
        optionText: opt.optionText,
        isCorrect: opt.isCorrect, // must be part of frontend input
        question: savedQuestion
      });

      await optionRepository.save(optionData);
    }
  }

  return savedQuiz;
}
