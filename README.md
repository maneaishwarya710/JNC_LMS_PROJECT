// src/quiz/quiz.service.ts
async submitQuiz(
  attemptData: { userId: number; quizId: number },
  answers: { questionId: number; selectedOptionId: number }[],
): Promise<{ score: number }> {
  const { userId, quizId } = attemptData;

  let score = 0;

  for (const answer of answers) {
    // Fetch the correct option for this question
    const correctOption = await this.optionRepository.findOne({
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
  const attempt = this.attemptRepository.create({
    userId,
    quizId,
    score,
    attemptDate: new Date(), // Add date explicitly
  });

  await this.attemptRepository.save(attempt);

  return { score };
}

