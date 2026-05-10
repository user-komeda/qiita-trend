import { Test } from '@nestjs/testing'
import { describe, test, expect } from 'vitest'

import { AdminModule } from './admin.module'

describe(AdminModule, () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const moduleRef = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile()

    expect(moduleRef).toBeDefined()
    expect(AdminModule).toBeDefined()
  })
})
