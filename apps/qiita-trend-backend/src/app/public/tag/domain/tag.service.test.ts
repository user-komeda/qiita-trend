import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagRepository } from '@/public/tag/domain/tag.repository'
import { TagService } from '@/public/tag/domain/tag.service'
import { TagRepositoryImpl } from '@/public/tag/infrastructure/tag.repositoryImpl'
import { TagData } from '@/types/tagData'

const testCase = async (
  service: TagService,
  repository: TagRepository,
): Promise<boolean> => {
  expect.hasAssertions()

  const mockData: TagData[] = [
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
  vi.spyOn(repository, 'getTags').mockResolvedValueOnce(mockData)
  const result = await service.getTags()

  expect(result).toStrictEqual(mockData)
  expect(repository.getTags).toHaveBeenCalledWith()

  return true
}

describe('tag_service', () => {
  let service: TagService
  let repository: TagRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TagService,
        { provide: TagRepository, useClass: TagRepositoryImpl },
      ],
    }).compile()

    service = module.get<TagService>(TagService)
    repository = module.get<TagRepository>(TagRepository)
  })

  test('should be defined', async () => {
    expect.hasAssertions()
    await expect(testCase(service, repository)).resolves.toBe(true)
  })
})
