import { HttpModule } from '@nestjs/axios'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { Test, TestingModule } from '@nestjs/testing'
import { describe, test, expect, vi, beforeEach } from 'vitest'

import { CommentController } from '@/public/comment/application/comment.controller'
import { CommentRepository } from '@/public/comment/domain/comment.repository'
import { CommentService } from '@/public/comment/domain/comment.service'
import { CommentRepositoryImpl } from '@/public/comment/infrastructure/comment.repositoryImpl'
const testCase1 = async (
  controller: CommentController,
  service: CommentService,
): Promise<boolean> => {
  expect.hasAssertions()

  const requestData = { itemsId: 'e37caf50776e00e733be' }
  const responseData = ['comment', 'comment2', 'comment3']
  vi.spyOn(service, 'getItemComment').mockResolvedValueOnce(responseData)
  const result = await controller.getItemComment(requestData)

  expect(service.getItemComment).toHaveBeenCalledWith(requestData.itemsId)
  expect(result).toBe(responseData)

  return true
}

describe('comment_controller', () => {
  let controller: CommentController
  let service: CommentService

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CommentController],
      providers: [
        CommentService,
        { provide: CommentRepository, useClass: CommentRepositoryImpl },
      ],
    }).compile()

    controller = module.get<CommentController>(CommentController)
    service = module.get<CommentService>(CommentService)

    const app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }))
    await app.init()
  })

  test('should be defined', async () => {
    expect.hasAssertions()
    await expect(testCase1(controller, service)).resolves.toBe(true)
  })
})
