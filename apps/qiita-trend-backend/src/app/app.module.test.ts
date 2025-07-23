import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { AdminModule } from '@/admin/admin.module'
import { AppModule } from '@/app/app.module'
import { PublicModule } from '@/public/public.module'

describe('appModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(PublicModule)).toBeInstanceOf(PublicModule)
    expect(module.get(AdminModule)).toBeInstanceOf(AdminModule)
  })
})
