import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { ItemsDetailSchemaType } from '@qiita-trend/schema'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'
import { ItemsDetailRepositoryImpl } from '@/public/itemsdetail/infrastructure/itemsDetail.repositoryImpl'

const testCase = async (
  itemsDetailRepository: ItemsDetailRepository,
  itemsDetailService: ItemsDetailService,
): Promise<boolean> => {
  expect.hasAssertions()

  const requestData = 'e37caf50776e00e733be'
  const mockData: ItemsDetailSchemaType = {
    rendered_body: 'hello world',
    body: 'hello world',
    coediting: false,
    comments_count: 1,
    created_at: '2024-01-01',
    group: null,
    id: 'e37caf50776e00e733be',
    likes_count: 1,
    private: false,
    reactions_count: 1,
    stocks_count: 1,
    tags: [
      { name: 'tagA', versions: [] },
      { name: 'tagB', versions: [] },
    ],
    title: 'hello world',
    updated_at: '2024-01-01',
    url: 'https://github.com/',
    user: {
      description: 'description',
      facebook_id: 'facebook_id',
      followees_count: 1,
      followers_count: 1,
      github_login_name: 'github_login_name',
      id: 'id',
      items_count: 1,
      linkedin_id: 'linkedin_id',
      location: 'location',
      name: 'name',
      organization: 'organization',
      permanent_id: 1,
      profile_image_url: 'profile_image_url',
      team_only: false,
      twitter_screen_name: 'twitter_screen_name',
      website_url: 'website_url',
    },
    page_views_count: 1,
    team_membership: null,
    organization_url_name: null,
    slide: false,
  }
  vi.spyOn(itemsDetailRepository, 'getDetailItems').mockResolvedValueOnce(
    mockData,
  )
  const result = await itemsDetailService.getDetailItems(requestData)

  expect(itemsDetailRepository.getDetailItems).toHaveBeenCalledWith(requestData)
  expect(result).toStrictEqual(mockData)

  return true
}

describe('itemDetailService', () => {
  let itemDetailService: ItemsDetailService
  let itemsDetailRepository: ItemsDetailRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ItemsDetailService,
        { provide: ItemsDetailRepository, useClass: ItemsDetailRepositoryImpl },
      ],
    }).compile()

    itemDetailService = app.get<ItemsDetailService>(ItemsDetailService)
    itemsDetailRepository = app.get<ItemsDetailRepository>(
      ItemsDetailRepository,
    )
  })

  test('should return "Hello World!"', async () => {
    expect.hasAssertions()
    await expect(
      testCase(itemsDetailRepository, itemDetailService),
    ).resolves.toBe(true)
  })
})
