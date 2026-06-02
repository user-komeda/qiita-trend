import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { ItemsSchemaType } from '@qiita-trend/schema'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'

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
    id: 'e37caf50776e00e733be',
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

const testCase = async (
  itemService: ItemsService,
  itemsRepository: ItemsRepository,
): Promise<boolean> => {
  expect.hasAssertions()

  const startDate = '2021-01-01'
  const endDate = '2021-01-31'
  const page = '1'
  vi.spyOn(itemsRepository, 'getItems').mockResolvedValueOnce(mockData)
  const result = await itemService.getItems(startDate, endDate, page)

  expect(itemsRepository.getItems).toHaveBeenCalledWith(
    startDate,
    endDate,
    page,
  )
  expect(result).toStrictEqual(mockData)

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
