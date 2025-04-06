async createQuiz(quizData: Partial<Quiz>, questions: any[]): Promise<Quiz> {
  const quiz = this.quizRepository.create(quizData);

  quiz.questions = questions.map((q) => {
    const question = new Question();
    question.questionText = q.questionText;
    question.correctOptionId = q.correctOptionId;
    question.options = q.options.map((opt: any) => {
      const option = new Option();
      option.optionText = opt.optionText;
      return option;
    });
    return question;
  });

  return await this.quizRepository.save(quiz);
}




async getQuizByCourseId(courseId: number): Promise<Quiz[]> {
  return await this.quizRepository.find({
    where: { courseId },
    relations: ['questions', 'questions.options'],
  });
}





