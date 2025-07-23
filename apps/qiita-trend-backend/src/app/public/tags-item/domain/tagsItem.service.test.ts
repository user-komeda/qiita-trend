import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { TagsItemService } from '@/public/tags-item/domain/tagsItem.service'
import { TagsItemRepositoryImpl } from '@/public/tags-item/infrastructure/tagsItem.repositoryImpl'
import { ItemsData } from '@/types/itemsData'

const mockData: ItemsData[] = [
  {
    body: 'hello world',
    id: 'e37caf50776e00e733be',
    likesCount: 1,
    private: false,
    stocksCount: 1,
    reactionsCount: 1,
    tags: ['tagA', 'tagB', 'wifi'],
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
    tags: ['tagC', 'tagD', 'wifi'],
    title: 'foo bar',
    url: 'https://github.com/',
    pageViewsCount: 2,
  },
]

const testCase = async (
  service: TagsItemService,
  repository: TagsItemRepository,
): Promise<boolean> => {
  expect.hasAssertions()

  const requestData = 'wifi'
  vi.spyOn(repository, 'getItemsFromTag').mockResolvedValueOnce(mockData)
  const result = await service.getItemsFromTag(requestData)

  expect(repository.getItemsFromTag).toHaveBeenCalledWith(requestData)
  expect(result).toStrictEqual(mockData)

  return true
}

describe('tags_item_service', () => {
  let service: TagsItemService
  let repository: TagsItemRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TagsItemService,
        { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
      ],
    }).compile()

    service = module.get<TagsItemService>(TagsItemService)
    repository = module.get<TagsItemRepository>(TagsItemRepository)
  })

  test('should be defined', async () => {
    expect.hasAssertions()
    await expect(testCase(service, repository)).resolves.toBe(true)
  })
})
