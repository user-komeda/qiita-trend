import { HttpModule } from '@nestjs/axios'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsController } from '@/public/items/application/items.controller'
import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'
import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'
import { ItemsData } from '@/types/itemsData'

const FIRST_MOCK_DATA_INDEX = 0

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
  itemsController: ItemsController,
  itemService: ItemsService,
): Promise<boolean> => {
  expect.hasAssertions()

  vi.spyOn(itemService, 'getItems').mockResolvedValueOnce(mockData)
  const result = await itemsController.getAllItems('2021-01-01', '2021-01-31')

  expect(itemService.getItems).toHaveBeenCalledWith('2021-01-01', '2021-01-31')
  expect(result).toStrictEqual(result)

  return true
}
const testCase2 = async (
  itemsController: ItemsController,
  itemDetailService: ItemsDetailService,
): Promise<boolean> => {
  expect.hasAssertions()

  const requestData = { itemsId: 'e37caf50776e00e733be' }

  vi.spyOn(itemDetailService, 'getDetailItems').mockResolvedValueOnce(
    mockData[FIRST_MOCK_DATA_INDEX],
  )
  const result = await itemsController.getItem(requestData)

  expect(itemDetailService.getDetailItems).toHaveBeenCalledWith(
    requestData.itemsId,
  )
  expect(result).toStrictEqual(result)

  return true
}

describe('itemController', () => {
  let itemsController: ItemsController
  let itemService: ItemsService
  let itemDetailService: ItemsDetailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ItemsController],
      providers: [
        ItemsService,
        ItemsDetailService,
        { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
        { provide: ItemsDetailRepository, useClass: ItemsRepositoryImpl },
      ],
    }).compile()

    itemsController = module.get<ItemsController>(ItemsController)
    itemService = module.get<ItemsService>(ItemsService)
    itemDetailService = module.get<ItemsDetailService>(ItemsDetailService)
    const app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }))
    await app.init()
  })

  test('should return "Hello World!"', async () => {
    expect.hasAssertions()
    await expect(testCase(itemsController, itemService)).resolves.toBe(true)
  })

  test('2should return "Hello World!"', async () => {
    expect.hasAssertions()
    await expect(testCase2(itemsController, itemDetailService)).resolves.toBe(
      true,
    )
  })
})
