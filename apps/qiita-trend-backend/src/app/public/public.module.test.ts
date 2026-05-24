import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { SharedHttpModule } from '../module/util/sharedHttp.module'
import { CommentModule } from '@/public/comment/comment.module'
import { ItemsModule } from '@/public/items/items.module'
import { LoginModule } from '@/public/login/login.module'
import { PublicModule } from '@/public/public.module'
import { TagModule } from '@/public/tag/tag.module'
import { TagsItemModule } from '@/public/tags-item/tagsItens.module'

describe('publicModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [PublicModule, SharedHttpModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(LoginModule)).toBeInstanceOf(LoginModule)
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(ItemsModule)).toBeInstanceOf(ItemsModule)
    expect(module.get(CommentModule)).toBeInstanceOf(CommentModule)
    // eslint-disable-next-line vitest/max-expects
    expect(module.get(TagModule)).toBeInstanceOf(TagModule)
    // eslint-disable-next-line vitest/max-expects
    expect(module.get(TagsItemModule)).toBeInstanceOf(TagsItemModule)
  })
})
