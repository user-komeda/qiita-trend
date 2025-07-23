import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { CommentModule } from '@/public/comment/comment.module'
import { ItemsModule } from '@/public/items/items.module'
import { PublicModule } from '@/public/public.module'
import { TagModule } from '@/public/tag/tag.module'
import { TagsItemModule } from '@/public/tags-item/tagsItens.module'

describe('publicModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [PublicModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(ItemsModule)).toBeInstanceOf(ItemsModule)
    expect(module.get(CommentModule)).toBeInstanceOf(CommentModule)
    expect(module.get(TagModule)).toBeInstanceOf(TagModule)
    expect(module.get(TagsItemModule)).toBeInstanceOf(TagsItemModule)
  })
})
