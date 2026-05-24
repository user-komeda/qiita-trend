import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request, { Response } from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

import createJwt from '../helper/createJwt'
import { AppModule } from '@/app/module/app/app.module'

describe('loginController (e2e)', () => {
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

  describe('pOST /public/login', () => {
    test('should return 401 or 400 when invalid code is provided', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .post('/public/login')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .send({ code: 'invalid-code' })

      // Qiita APIへの問い合わせで失敗するため、実装によるが 400 や 401 が返ることが期待される
      // モックを使わないため、実際にQiitaに問い合わせが行われる
      expect([400, 401]).toContain(response.status)
    })

    test('should return 400 when code is missing', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .post('/public/login')
        .set('Authorization', `Bearer ${await createJwt()}`)
        .send({})

      expect(response.status).toBe(400)
    })

    test('should return 403 when jwt is invalid', async () => {
      expect.hasAssertions()

      const response: Response = await request(app.getHttpServer() as string)
        .post('/public/login')
        .set('Authorization', `Bearer jwt_invalid`)
        .send({})

      expect(response.status).toBe(403)
    })
  })
})
