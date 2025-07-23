import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { TagsItemController } from '@/public/tags-item/application/tagsItem.controller'
import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { TagsItemService } from '@/public/tags-item/domain/tagsItem.service'
import { TagsItemRepositoryImpl } from '@/public/tags-item/infrastructure/tagsItem.repositoryImpl'
import { TagsItemModule } from '@/public/tags-item/tagsItens.module'

describe('tagsItemModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [TagsItemModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(TagsItemController)).toBeInstanceOf(TagsItemController)
    expect(module.get(TagsItemService)).toBeInstanceOf(TagsItemService)
    expect(module.get(TagsItemRepository)).toBeInstanceOf(
      TagsItemRepositoryImpl,
    )
  })
})
