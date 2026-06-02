import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ItemsSchemaType } from '@qiita-trend/schema'
import request, { Response } from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

import createJwt from '../helper/createJwt'
import { AppModule } from '@/app/module/app/app.module'

describe('commentController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({ stopAtFirstError: true, forbidUnknownValues: true }),
    )
    await app.init()
  })

  describe('gET /public/items/:itemsId/comments', () => {
    test('should return a list of comments for a specific item', async () => {
      expect.hasAssertions()

      // まず、コメントがある可能性の高い最新の記事IDを取得
      const itemsResponse: Response = await request(
        app.getHttpServer() as string,
      )
        .get('/public/items')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const items = itemsResponse.body as ItemsSchemaType

      expect(items.length).toBeGreaterThan(0)

      const itemId = items[0].id
      const response: Response = await request(app.getHttpServer() as string)
        .get(`/public/items/${itemId}/comments`)
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const body = response.body as unknown

      expect(Array.isArray(body)).toBe(true)
    })

    test('should return 400 when itemsId is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/items/invalid-item-id/comments')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(400)

      expect(response.status).toBe(400)
    })

    test('should return 403 when jwt is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/items/invalid-item-id/comments')
        .set('Authorization', `Bearer invalid_jwt`)
        .expect(403)

      expect(response.status).toBe(403)
    })
  })
})
