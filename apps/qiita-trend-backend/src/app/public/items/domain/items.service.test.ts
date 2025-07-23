import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'
import { ItemsData } from '@/types/itemsData'

const mockData: ItemsData[] = [
  {
    body: 'hello world',
    id: 'e37caf50776e00e733be',
    likesCount: 1,
    private: false,
    stocksCount: 1,
    reactionsCount: 1,
    tags: ['tagA', 'tagB'],
    title: 'hello world',
    url: 'https://github.com/',
    pageViewsCount: 1,
  },
  {
    body: 'foo bar',
    id: 'e37caf50776e00e733be',
    likesCount: 2,
    private: false,
    stocksCount: 2,
    reactionsCount: 2,
    tags: ['tagC', 'tagD'],
    title: 'foo bar',
    url: 'https://github.com/',
    pageViewsCount: 2,
  },
]

const testCase = async (
  itemService: ItemsService,
  itemsRepository: ItemsRepository,
): Promise<boolean> => {
  expect.hasAssertions()

  const startDate = '2021-01-01'
  const endDate = '2021-01-31'
  vi.spyOn(itemsRepository, 'getItems').mockResolvedValueOnce(mockData)
  const result = await itemService.getItems(startDate, endDate)

  expect(itemsRepository.getItems).toHaveBeenCalledWith(startDate, endDate)
  expect(result).toStrictEqual(result)

  return true
}

describe('itemService', () => {
  let itemService: ItemsService
  let itemsRepository: ItemsRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ItemsService,
        { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
      ],
    }).compile()

    itemService = app.get<ItemsService>(ItemsService)
    itemsRepository = app.get<ItemsRepository>(ItemsRepository)
  })

  test('should return "Hello World!"', async () => {
    expect.hasAssertions()
    await expect(testCase(itemService, itemsRepository)).resolves.toBe(true)
  })
})
