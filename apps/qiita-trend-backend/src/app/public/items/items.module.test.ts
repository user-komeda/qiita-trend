import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { ItemsController } from '@/public/items/application/items.controller'
import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'
import { ItemsModule } from '@/public/items/items.module'

describe('itemsModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [ItemsModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(ItemsController)).toBeInstanceOf(ItemsController)
    expect(module.get(ItemsService)).toBeInstanceOf(ItemsService)
    expect(module.get(ItemsRepository)).toBeInstanceOf(ItemsRepositoryImpl)
  })
})
