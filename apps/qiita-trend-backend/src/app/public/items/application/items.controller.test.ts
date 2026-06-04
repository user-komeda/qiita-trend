import { HttpModule } from '@nestjs/axios'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { Test, TestingModule } from '@nestjs/testing'
import { ItemsSchemaType, PaginatedItemsSchemaType } from '@qiita-trend/schema'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsController } from '@/public/items/application/items.controller'
import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'
import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'

const FIRST_MOCK_DATA_INDEX = 0

const mockData: ItemsSchemaType = [
  {
    body: 'hello world',
    id: 'e37caf50776e00e733be',
    likes_count: 1,
    private: false,
    stocks_count: 1,
    reactions_count: 1,
    tags: [
      { name: 'tagA', versions: [] },
      { name: 'tagB', versions: [] },
    ],
    title: 'hello world',
    url: 'https://github.com/',
    page_views_count: 1,
    rendered_body: '',
    coediting: false,
    comments_count: 0,
    created_at: '',
    group: null,
    updated_at: '',
    user: {
      description: null,
      facebook_id: null,
      followees_count: 0,
      followers_count: 0,
      github_login_name: null,
      id: '',
      items_count: 0,
      linkedin_id: null,
      location: null,
      name: null,
      organization: null,
      permanent_id: 0,
      profile_image_url: '',
      team_only: false,
      twitter_screen_name: null,
      website_url: null,
    },
    team_membership: null,
    organization_url_name: null,
    slide: false,
  },
  {
    body: 'foo bar',
    id: '7244eb5869024651548a',
    likes_count: 2,
    private: false,
    stocks_count: 2,
    reactions_count: 2,
    tags: [
      { name: 'tagC', versions: [] },
      { name: 'tagD', versions: [] },
    ],
    title: 'foo bar',
    url: 'https://github.com/',
    page_views_count: 2,
    rendered_body: '',
    coediting: false,
    comments_count: 0,
    created_at: '',
    group: null,
    updated_at: '',
    user: {
      description: null,
      facebook_id: null,
      followees_count: 0,
      followers_count: 0,
      github_login_name: null,
      id: '',
      items_count: 0,
      linkedin_id: null,
      location: null,
      name: null,
      organization: null,
      permanent_id: 0,
      profile_image_url: '',
      team_only: false,
      twitter_screen_name: null,
      website_url: null,
    },
    team_membership: null,
    organization_url_name: null,
    slide: false,
  },
]

const mockPaginatedData: PaginatedItemsSchemaType = {
  items: mockData,
  totalCount: 200,
}

const getAllItemsTestCase = async (
  itemsController: ItemsController,
  itemService: ItemsService,
): Promise<boolean> => {
  expect.hasAssertions()

  const startDate = '2021-01-01'
  const endDate = '2021-01-31'
  const page = '1'

  vi.spyOn(itemService, 'getItems').mockResolvedValueOnce(mockPaginatedData)

  const result = await itemsController.getAllItems(startDate, endDate, page)

  expect(itemService.getItems).toHaveBeenCalledWith(startDate, endDate, page)
  expect(result).toStrictEqual(mockPaginatedData)

  return true
}

const getAllItemsDefaultPageTestCase = async (
  itemsController: ItemsController,
  itemService: ItemsService,
): Promise<boolean> => {
  expect.hasAssertions()

  const startDate = '2021-01-01'
  const endDate = '2021-01-31'

  vi.spyOn(itemService, 'getItems').mockResolvedValueOnce(mockPaginatedData)

  const result = await itemsController.getAllItems(startDate, endDate, '1')

  expect(itemService.getItems).toHaveBeenCalledWith(startDate, endDate, '1')
  expect(result).toStrictEqual(mockPaginatedData)

  return true
}

const getAllItemsPaginationTestCase = async (
  itemsController: ItemsController,
  itemService: ItemsService,
): Promise<boolean> => {
  expect.hasAssertions()

  const startDate = '2021-01-01'
  const endDate = '2021-01-31'
  const page = '2'

  vi.spyOn(itemService, 'getItems').mockResolvedValueOnce(mockPaginatedData)

  const result = await itemsController.getAllItems(startDate, endDate, page)

  expect(itemService.getItems).toHaveBeenCalledWith(startDate, endDate, page)
  expect(result).toStrictEqual(mockPaginatedData)

  return true
}

const getItemTestCase = async (
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
  expect(result).toStrictEqual(mockData[FIRST_MOCK_DATA_INDEX])

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

  test('should get all items with date range and first page', async () => {
    expect.hasAssertions()

    await expect(
      getAllItemsTestCase(itemsController, itemService),
    ).resolves.toBe(true)
  })

  test('should get all items with default page', async () => {
    expect.hasAssertions()

    await expect(
      getAllItemsDefaultPageTestCase(itemsController, itemService),
    ).resolves.toBe(true)
  })

  test('should get all items with specified page', async () => {
    expect.hasAssertions()

    await expect(
      getAllItemsPaginationTestCase(itemsController, itemService),
    ).resolves.toBe(true)
  })

  test('should get item detail', async () => {
    expect.hasAssertions()

    await expect(
      getItemTestCase(itemsController, itemDetailService),
    ).resolves.toBe(true)
  })
})
