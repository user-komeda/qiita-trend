import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import {
  ItemsDetailSchemaType,
  PaginatedItemsSchemaType,
} from '@qiita-trend/schema'
import request, { Response } from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

import createJwt from '../helper/createJwt'
import { AppModule } from '@/app/module/app/app.module'

// eslint-disable-next-line max-lines-per-function
describe('itemsController (e2e)', () => {
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

  describe('get /public/items', () => {
    test('should return a list of items from Qiita API', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/items')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const body = response.body as unknown as PaginatedItemsSchemaType

      expect(Array.isArray(body.items)).toBe(true)
      expect(body.items.length).toBeGreaterThan(0)
      expect(body.totalCount).toBeTypeOf('number')
      expect(body.items[0]).toSatisfy((item: ItemsDetailSchemaType) => {
        return (
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          typeof item.url === 'string' &&
          typeof item.body === 'string' &&
          typeof item.likes_count === 'number'
        )
      })
    })

    test('should return 403 when jwt is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/items')
        .set('Authorization', `Bearer invalid_jwt`)
        .expect(403)

      expect(response.status).toBe(403)
    })

    test('should return filtered items when startDate and endDate are provided', async () => {
      expect.hasAssertions()

      const startDate = '2024-01-01'
      const endDate = '2024-01-02'
      const response: Response = await request(app.getHttpServer() as string)
        .get(`/public/items?startDate=${startDate}&endDate=${endDate}`)
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const body = response.body as unknown as PaginatedItemsSchemaType

      expect(Array.isArray(body.items)).toBe(true)
      expect(body.totalCount).toBeTypeOf('number')
    })

    test('should return items for a specific page', async () => {
      expect.hasAssertions()

      const page = '2'
      const response: Response = await request(app.getHttpServer() as string)
        .get(
          `/public/items?page=${page}&startDate=2024-01-01&endDate=2024-01-02`,
        )
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const body = response.body as unknown as PaginatedItemsSchemaType

      expect(Array.isArray(body.items)).toBe(true)
      expect(body.totalCount).toBeTypeOf('number')
    })
  })

  describe('get /public/items/:itemsId', () => {
    test('should return a specific item detail from Qiita API', async () => {
      expect.hasAssertions()

      const listResponse: Response = await request(
        app.getHttpServer() as string,
      )
        .get('/public/items')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const listBody = listResponse.body as unknown as PaginatedItemsSchemaType

      expect(listBody.items.length).toBeGreaterThan(0)

      const itemId = listBody.items[0].id
      const response: Response = await request(app.getHttpServer() as string)
        .get(`/public/items/${itemId}`)
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const body = response.body as unknown as ItemsDetailSchemaType

      expect(body).toSatisfy((item: ItemsDetailSchemaType) => {
        return (
          item.id === itemId &&
          typeof item.title === 'string' &&
          typeof item.body === 'string'
        )
      })
    })

    test('should return 400 when itemsId is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/items/invalid-item-id')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(400)

      expect(response.status).toBe(400)
    })

    test('should return 403 when jwt is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/items/invalid-item-id')
        .set('Authorization', `Bearer invalid_jwt`)
        .expect(403)

      expect(response.status).toBe(403)
    })
  })
})
