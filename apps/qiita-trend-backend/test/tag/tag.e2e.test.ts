import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request, { Response } from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

import createJwt from '../helper/createJwt'
import { AppModule } from '@/app/module/app/app.module'
import { TagData } from '@/types/tagData'

describe('tagController (e2e)', () => {
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

  describe('gET /public/tags', () => {
    test('should return a list of tags from Qiita API', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/tags')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .expect(200)

      const body = response.body as unknown[]

      expect(Array.isArray(body)).toBe(true)
      expect(body.length).toBeGreaterThan(0)
      expect(body[0]).toSatisfy((tag: unknown) => {
        if (typeof tag !== 'object' || tag === null) {
          return false
        }

        const candidate = tag as Partial<TagData>

        return (
          typeof candidate.id === 'string' &&
          (typeof candidate.iconUrl === 'string' ||
            candidate.iconUrl === null) &&
          typeof candidate.itemsCount === 'number'
        )
      })
    })

    test('should return 403 when jwt is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .get('/public/tags')
        .set('Authorization', `Bearer invalid_jwt`)
        .expect(403)

      expect(response.status).toBe(403)
    })
  })
})
