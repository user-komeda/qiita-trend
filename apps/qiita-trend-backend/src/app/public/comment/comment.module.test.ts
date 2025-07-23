import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { CommentController } from '@/public/comment/application/comment.controller'
import { CommentModule } from '@/public/comment/comment.module'
import { CommentRepository } from '@/public/comment/domain/comment.repository'
import { CommentService } from '@/public/comment/domain/comment.service'
import { CommentRepositoryImpl } from '@/public/comment/infrastructure/comment.repositoryImpl'

describe('commentModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [CommentModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(CommentController)).toBeInstanceOf(CommentController)
    expect(module.get(CommentService)).toBeInstanceOf(CommentService)
    expect(module.get(CommentRepository)).toBeInstanceOf(CommentRepositoryImpl)
  })
})
