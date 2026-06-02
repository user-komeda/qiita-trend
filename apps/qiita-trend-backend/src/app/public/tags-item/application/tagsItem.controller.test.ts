import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { ItemsSchemaType } from '@qiita-trend/schema'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagsItemController } from '@/public/tags-item/application/tagsItem.controller'
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
