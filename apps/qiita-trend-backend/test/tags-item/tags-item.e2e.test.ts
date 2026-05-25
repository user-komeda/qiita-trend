import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request, { Response } from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

import createJwt from '../helper/createJwt'
import { AppModule } from '@/app/module/app/app.module'
import { ItemsData } from '@/types/itemsData'
import { TagData } from '@/types/tagData'

describe('tagsItemController (e2e)', () => {
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

  describe('gET /public/tags/:tagId/items', () => {
    test('should return a list of items for a specific tag', async () => {
      expect.hasAssertions()

      // まず、有効なタグIDを取得
      const tagsResponse: Response = await request(
        app.getHttpServer() as string,
      )
        .get('/public/tags')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const tags = tagsResponse.body as TagData[]

      expect(tags.length).toBeGreaterThan(0)

      const tagId = tags[0].id
      const response: Response = await request(app.getHttpServer() as string)
        .get(`/public/tags/${tagId}/items`)
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const body = response.body as ItemsData[]

      expect(Array.isArray(body)).toBe(true)
      // タグに関連する記事は存在するはず
      expect(body.length).toBeGreaterThan(0)
      expect(body[0]).toSatisfy((item: ItemsData) => {
        return (
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          typeof item.url === 'string'
        )
      })
    })

    test('should return 400 when tagId is empty', async () => {
      expect.hasAssertions()

      // 実際にはルート定義により 404 になる可能性があるが、バリデーションが効くか確認
      // /public/tags//items のようなリクエスト
      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/tags/%20/items')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(400)

      // 200で空配列が返るか、400になるか確認（通常はバリデーションエラーなら400）
      expect(response.status).toBe(400)
    })

    test('should return 403 when jwt is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/tags/%20/items')
        .set('Authorization', `Bearer invalid_jwt`)
        .expect(403)

      expect(response.status).toBe(403)
    })
  })
})
