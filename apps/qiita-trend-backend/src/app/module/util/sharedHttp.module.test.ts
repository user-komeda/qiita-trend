import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { SharedHttpModule } from '@/app/module/util/sharedHttp.module'
import { HttpErrorLogger } from '@/utils/httpErrorLogger'

describe('sharedHttpModule', () => {
  test('should compile the module', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [SharedHttpModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(HttpErrorLogger)).toBeInstanceOf(HttpErrorLogger)
  })

  test('should export HttpService to importing modules', async () => {
    expect.hasAssertions()

    const module = await Test.createTestingModule({
      imports: [SharedHttpModule],
    }).compile()

    const httpService = module.get(HttpService)

    expect(httpService).toBeInstanceOf(HttpService)
  })
})
