import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagsItemController } from '@/public/tags-item/application/tagsItem.controller'
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
  controller: TagsItemController,
  service: TagsItemService,
): Promise<boolean> => {
  expect.hasAssertions()

  const requestData = { tagId: 'wifi' }
  vi.spyOn(service, 'getItemsFromTag').mockResolvedValueOnce(mockData)
  const result = await controller.getItemsFromTag(requestData)

  expect(service.getItemsFromTag).toHaveBeenCalledWith(requestData.tagId)
  expect(result).toStrictEqual(mockData)

  return true
}

describe('tags_item_controller', () => {
  let controller: TagsItemController
  let service: TagsItemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TagsItemController],
      providers: [
        TagsItemService,
        { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
      ],
    }).compile()

    controller = module.get<TagsItemController>(TagsItemController)
    service = module.get<TagsItemService>(TagsItemService)
  })

  test('should be defined', async () => {
    expect.hasAssertions()
    await expect(testCase(controller, service)).resolves.toBe(true)
  })
})
