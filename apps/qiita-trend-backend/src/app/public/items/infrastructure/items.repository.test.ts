import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { ItemsSchemaType } from '@qiita-trend/schema'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs/internal/observable/of'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'

const httpServiceMockData: ItemsSchemaType = [
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
    created_at: '2021-01-01T00:00:00+09:00',
    group: null,
    updated_at: '2021-01-01T00:00:00+09:00',
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
    created_at: '2021-01-02T00:00:00+09:00',
    group: null,
    updated_at: '2021-01-02T00:00:00+09:00',
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

const responseData: ItemsSchemaType = [
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
    created_at: '2021-01-01T00:00:00+09:00',
    group: null,
    updated_at: '2021-01-01T00:00:00+09:00',
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
    created_at: '2021-01-02T00:00:00+09:00',
    group: null,
    updated_at: '2021-01-02T00:00:00+09:00',
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

describe('itemsRepository', () => {
  let repository: ItemsRepository
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [{ provide: ItemsRepository, useClass: ItemsRepositoryImpl }],
    }).compile()

    repository = module.get<ItemsRepository>(ItemsRepository)
    httpService = module.get<HttpService>(HttpService)
  })

  test('should get items with date range and first page', async () => {
    expect.hasAssertions()

    const startDate = '2021-01-01'
    const endDate = '2021-01-31'
    const page = '1'

    vi.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return of({
        data: httpServiceMockData,
      } as AxiosResponse)
    })

    const result = await repository.getItems(startDate, endDate, page)

    expect(httpService.get).toHaveBeenCalledWith(
      `https://qiita.com/api/v2/items?sort=stock&page=${page}&per_page=100&query=created%3A%3E%3D${startDate}+created%3A%3C%3D${endDate}+stocks%3A%3E%3D100`,
    )
    expect(result).toStrictEqual(responseData)
  })

  test('should get items without date range and first page', async () => {
    expect.hasAssertions()

    const page = '1'

    vi.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return of({
        data: httpServiceMockData,
      } as AxiosResponse)
    })

    const result = await repository.getItems('', '', page)

    expect(httpService.get).toHaveBeenCalledWith(
      `https://qiita.com/api/v2/items?sort=stock&page=${page}&per_page=100&query=stocks%3A%3E%3D100`,
    )
    expect(result).toStrictEqual(responseData)
  })

  test('should get items with specified page', async () => {
    expect.hasAssertions()

    const startDate = '2021-01-01'
    const endDate = '2021-01-31'
    const page = '2'

    vi.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return of({
        data: httpServiceMockData,
      } as AxiosResponse)
    })

    const result = await repository.getItems(startDate, endDate, page)

    expect(httpService.get).toHaveBeenCalledWith(
      `https://qiita.com/api/v2/items?sort=stock&page=${page}&per_page=100&query=created%3A%3E%3D${startDate}+created%3A%3C%3D${endDate}+stocks%3A%3E%3D100`,
    )
    expect(result).toStrictEqual(responseData)
  })
})
