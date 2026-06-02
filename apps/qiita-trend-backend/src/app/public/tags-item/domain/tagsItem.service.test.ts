import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { ItemsSchemaType } from '@qiita-trend/schema'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { TagsItemService } from '@/public/tags-item/domain/tagsItem.service'
import { TagsItemRepositoryImpl } from '@/public/tags-item/infrastructure/tagsItem.repositoryImpl'

const mockData: ItemsSchemaType = [
  {
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
      { name: 'wifi', versions: [] },
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
  },
  {
    rendered_body: 'foo bar',
    body: 'foo bar',
    coediting: false,
    comments_count: 2,
    created_at: '2024-01-01',
    group: null,
    id: 'e37caf50776e00e733be',
    likes_count: 2,
    private: false,
    reactions_count: 2,
    stocks_count: 2,
    tags: [
      { name: 'tagC', versions: [] },
      { name: 'tagD', versions: [] },
      { name: 'wifi', versions: [] },
    ],
    title: 'foo bar',
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
    page_views_count: 2,
    team_membership: null,
    organization_url_name: null,
    slide: false,
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
