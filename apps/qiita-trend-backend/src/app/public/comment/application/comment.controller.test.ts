import { HttpModule } from '@nestjs/axios'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { Test, TestingModule } from '@nestjs/testing'
import { CommentSchemaType } from '@qiita-trend/schema'
import { describe, test, expect, vi, beforeEach } from 'vitest'

import { CommentController } from '@/public/comment/application/comment.controller'
import { CommentRepository } from '@/public/comment/domain/comment.repository'
import { CommentService } from '@/public/comment/domain/comment.service'
import { CommentRepositoryImpl } from '@/public/comment/infrastructure/comment.repositoryImpl'
const testCase1 = async (
  controller: CommentController,
  service: CommentService,
): Promise<boolean> => {
  expect.hasAssertions()

  const requestData = { itemsId: 'e37caf50776e00e733be' }
  const responseData: CommentSchemaType = [
    {
      body: `仕事でよく見かけるから気になってましたが、スッキリ納得しました
`,
      created_at: '2021-10-19T22:57:23+09:00',
      id: 'bf190e5c79a26f2391d0',
      rendered_body: `<p>仕事でよく見かけるから気になってましたがスッキリ納得しました</p>
`,
      updated_at: '2021-10-19T22:57:23+09:00',
      user: {
        description: null,
        facebook_id: null,
        followees_count: 1,
        followers_count: 1,
        github_login_name: null,
        id: 'ramenRizard',
        items_count: 0,
        linkedin_id: null,
        location: null,
        name: '',
        organization: null,
        permanent_id: 2122955,
        profile_image_url:
          'https://secure.gravatar.com/avatar/66291792cb053e83963a9a495530ad61',
        team_only: false,
        twitter_screen_name: null,
        website_url: null,
      },
    },
    {
      body: `とても分かりやすいです
今まで曖昧な理解だったのが、この記事のおかげでしっかり理解できました！
`,
      created_at: '2021-06-16T10:35:08+09:00',
      id: '226f6b79f14718193069',
      rendered_body: `<p>とても分かりやすいです<br>
今まで曖昧な理解だったのが、この記事のおかげでしっかり理解できました！</p>
`,
      updated_at: '2021-06-16T10:35:08+09:00',
      user: {
        description: `丹生ちゃん
`,
        facebook_id: '',
        followees_count: 0,
        followers_count: 1,
        github_login_name: null,
        id: 'mochi_nibuchan',
        items_count: 3,
        linkedin_id: '',
        location: '',
        name: '丹生ちゃん',
        organization: '',
        permanent_id: 690758,
        profile_image_url:
          'https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/690758/6098a4284188e2451cf71040eb79bc0583dc9542/large.png?1605070461',
        team_only: false,
        twitter_screen_name: null,
        website_url: '',
      },
    },
  ]
  vi.spyOn(service, 'getItemComment').mockResolvedValueOnce(responseData)
  const result = await controller.getItemComment(requestData)

  expect(service.getItemComment).toHaveBeenCalledWith(requestData.itemsId)
  expect(result).toBe(responseData)

  return true
}

describe('comment_controller', () => {
  let controller: CommentController
  let service: CommentService

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CommentController],
      providers: [
        CommentService,
        { provide: CommentRepository, useClass: CommentRepositoryImpl },
      ],
    }).compile()

    controller = module.get<CommentController>(CommentController)
    service = module.get<CommentService>(CommentService)

    const app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }))
    await app.init()
  })

  test('should be defined', async () => {
    expect.hasAssertions()
    await expect(testCase1(controller, service)).resolves.toBe(true)
  })
})
