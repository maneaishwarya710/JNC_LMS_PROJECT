async createQuiz(quizData: Partial<Quiz>, questions: any[]): Promise<Quiz> {
  const course = await courseRepository.findOne({
    where: { courseId: quizData.course?.courseId },
  });

  if (!course) {
    throw new Error('Course not found');
  }

  // Create the quiz object
  const quiz = QuizRepository.create({
    quizName: quizData.quizName,
    description: quizData.description,
    totalmarks: quizData.totalmarks,
    course: course,
  });

  const savedQuiz = await QuizRepository.save(quiz);

  for (const q of questions) {
    const question = questionRepository.create({
      questionText: q.questionText,
      correctOptionId: q.correctOptionId,
      quiz: savedQuiz,
    });

    const savedQuestion = await questionRepository.save(question);

    for (const opt of q.options) {
      const option = optionRepository.create({
        optionText: opt.optionText,
        isCorrect: opt.optionId === q.correctOptionId, // flag correct
        question: savedQuestion,
      });

      await optionRepository.save(option);
    }
  }

  return savedQuiz;
}
