async createQuiz(quizDto: CreateQuizDto): Promise<Quiz> {
  const { questions, ...quizData } = quizDto;

  const quiz = this.quizRepository.create(quizData);
  const savedQuiz = await this.quizRepository.save(quiz);

  for (const q of questions) {
    const question = this.questionRepository.create({
      quizId: savedQuiz.quizId,
      questionText: q.questionText,
    });
    const savedQuestion = await this.questionRepository.save(question);

    const savedOptions = [];
    for (const opt of q.options) {
      const option = this.optionRepository.create({
        questionId: savedQuestion.questionId,
        optionText: opt.optionText,
      });
      const savedOption = await this.optionRepository.save(option);
      savedOptions.push(savedOption);
    }

    // Set correctOptionId after options are saved
    const correctOption = savedOptions[q.correctOptionIndex];
    savedQuestion.correctOptionId = correctOption.optionId;
    await this.questionRepository.save(savedQuestion);
  }

  return savedQuiz;
}
