import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs/internal/observable/of'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagRepository } from '@/public/tag/domain/tag.repository'
import { TagRepositoryImpl } from '@/public/tag/infrastructure/tag.repositoryImpl'
import { TagData } from '@/types/tagData'

const mockData = [
  {
    followers_count: 186271,
    icon_url:
      'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/0ee2c162b0573701a6baf468f4d30549f8d03e9b/medium.jpg?1660803670',
    id: 'Python',
    items_count: 81889,
  },
  {
    followers_count: 161272,
    icon_url:
      'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/12ab79a9d2e703932a2c08dc6a4bcc9fb544f5c3/medium.jpg?1650353657',
    id: 'JavaScript',
    items_count: 56887,
  },
  {
    followers_count: 65229,
    icon_url:
      'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/e92cc40a9770111ffa5833b87b3fb7e04a0a2b5e/medium.jpg?1650353581',
    id: 'AWS',
    items_count: 42534,
  },
]

const testCase = async (
  httpService: HttpService,
  repository: TagRepository,
): Promise<boolean> => {
  expect.hasAssertions()

  const responseData: TagData[] = [
    {
      id: 'Python',
      iconUrl:
        'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/0ee2c162b0573701a6baf468f4d30549f8d03e9b/medium.jpg?1660803670',
      itemsCount: 81889,
    },
    {
      id: 'JavaScript',
      iconUrl:
        'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/12ab79a9d2e703932a2c08dc6a4bcc9fb544f5c3/medium.jpg?1650353657',
      itemsCount: 56887,
    },
    {
      id: 'AWS',
      iconUrl:
        'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/e92cc40a9770111ffa5833b87b3fb7e04a0a2b5e/medium.jpg?1650353581',
      itemsCount: 42534,
    },
  ]
  vi.spyOn(httpService, 'get').mockImplementationOnce(() => {
    return of({
      data: mockData,
    } as AxiosResponse)
  })
  const result = await repository.getTags()

  expect(result).toStrictEqual(responseData)
  expect(httpService.get).toHaveBeenCalledWith(
    'https://qiita.com/api/v2/tags?per_page=100&sort=count',
  )

  return true
}

describe('tag_service', () => {
  let repository: TagRepository
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [{ provide: TagRepository, useClass: TagRepositoryImpl }],
    }).compile()

    repository = module.get<TagRepository>(TagRepository)
    httpService = module.get<HttpService>(HttpService)
  })

  test('should be defined', async () => {
    expect.hasAssertions()
    await expect(testCase(httpService, repository)).resolves.toBe(true)
  })
})
