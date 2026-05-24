import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'

import { HttpErrorLogger } from '@/utils/httpErrorLogger'

const sharedHttpModuleMetadata = {
  imports: [HttpModule],
  providers: [HttpErrorLogger],
  exports: [HttpModule],
}

/**
 * HttpService をアプリ全体で共通利用する Module
 */
@Global()
@Module(sharedHttpModuleMetadata)
export class SharedHttpModule {}
