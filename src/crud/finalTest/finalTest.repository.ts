import { PostgresService } from '../../db/postgres/postgres.service'
import { CreateFinalTestDto } from './dto/create-final-test.dto'

/**
 * Репозиторий для работы с финальными тестами (FinalTestRepository).
 *
 * Этот класс управляет взаимодействием с базой данных для операций с финальными тестами.
 */
export class FinalTestRepository {
  constructor(private readonly postgres: PostgresService) {}

  /**
   * Создает новый финальный тест.
   *
   * @param {CreateFinalTestDto} dto - Данные для создания теста.
   * @returns {Promise<any>} - Возвращает созданный финальный тест.
   */
  async create(dto: CreateFinalTestDto) {
    const questionGroups = []

    for (const questionGroupId of dto.questionGroupId) {
      const questionGroup = await this.postgres.questionGroup.findUnique({
        where: { id: questionGroupId },
        include: { questions: true },
      })

      const filteredQuestions = questionGroup.questions.filter(
        (question) => !dto.excludeTaskIds?.includes(question.id)
      )

      questionGroups.push({
        id: questionGroupId,
        questions: filteredQuestions,
      })
    }

    return this.postgres.finalTest.create({
      data: {
        title: dto.title,
        description: dto.description,
        QuestionGroup: {
          connect: questionGroups.map((group) => ({ id: group.id })),
        },
      },
    })
  }

  /**
   * Обновляет данные финального теста по ID.
   *
   * @param {string} id - ID теста для обновления.
   * @param {CreateFinalTestDto} dto - Данные для обновления теста.
   * @returns {Promise<any>} - Возвращает обновленный финальный тест.
   */
  async update(id: string, dto: CreateFinalTestDto) {
    return this.postgres.finalTest.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        QuestionGroup: {
          connect: dto.questionGroupId.map((groupId) => ({ id: groupId })),
        },
      },
    })
  }

  /**
   * Получает список всех финальных тестов с пагинацией и поиском.
   *
   * @param {number} page - Номер страницы для пагинации (по умолчанию 1).
   * @param {number} limit - Количество тестов на странице (по умолчанию 10).
   * @param {string} search - Строка для поиска по заголовкам тестов (необязательный).
   * @returns {Promise<any>} - Возвращает список финальных тестов.
   */
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit

    const [finalTests, totalCount] = await Promise.all([
      this.postgres.finalTest.findMany({
        skip,
        take: limit,
        where: search
          ? {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {},
        include: {
          QuestionGroup: false,
        },
      }),
      this.postgres.finalTest.count({
        where: search
          ? {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {},
      }),
    ])

    return {
      data: finalTests,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    }
  }

  /**
   * Получает финальный тест по ID.
   *
   * @param {string} id - ID теста для получения информации.
   * @returns {Promise<any>} - Возвращает информацию о финальном тесте.
   */
  async findById(id: string) {
    return this.postgres.finalTest.findUnique({
      where: { id },
      include: {
        QuestionGroup: true,
      },
    })
  }

  /**
   * Удаляет финальный тест по ID.
   *
   * @param {string} id - ID теста для удаления.
   * @returns {Promise<any>} - Возвращает результат удаления.
   */
  async delete(id: string) {
    return this.postgres.finalTest.delete({
      where: { id },
    })
  }
}
