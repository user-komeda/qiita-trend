import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagController } from '@/public/tag/application/tag.controller'
import { TagRepository } from '@/public/tag/domain/tag.repository'
import { TagService } from '@/public/tag/domain/tag.service'
import { TagRepositoryImpl } from '@/public/tag/infrastructure/tag.repositoryImpl'
import { TagData } from '@/types/tagData'

const testCase = async (
  controller: TagController,
  service: TagService,
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
  vi.spyOn(service, 'getTags').mockResolvedValueOnce(mockData)
  const result = await controller.getTags()

  expect(result).toStrictEqual(mockData)
  expect(service.getTags).toHaveBeenCalledWith()

  return true
}

describe('tag_controller', () => {
  let controller: TagController
  let service: TagService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TagController],
      providers: [
        TagService,
        { provide: TagRepository, useClass: TagRepositoryImpl },
      ],
    }).compile()

    controller = module.get<TagController>(TagController)
    service = module.get<TagService>(TagService)
  })

  test('should be defined', async () => {
    expect.hasAssertions()
    await expect(testCase(controller, service)).resolves.toBe(true)
  })
})
