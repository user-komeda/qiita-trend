import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { TagController } from '@/public/tag/application/tag.controller'
import { TagRepository } from '@/public/tag/domain/tag.repository'
import { TagService } from '@/public/tag/domain/tag.service'
import { TagRepositoryImpl } from '@/public/tag/infrastructure/tag.repositoryImpl'
import { TagModule } from '@/public/tag/tag.module'

describe('tagModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [TagModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(TagController)).toBeInstanceOf(TagController)
    expect(module.get(TagService)).toBeInstanceOf(TagService)
    expect(module.get(TagRepository)).toBeInstanceOf(TagRepositoryImpl)
  })
})
