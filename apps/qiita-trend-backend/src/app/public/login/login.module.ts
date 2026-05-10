import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { LoginController } from '@/public/login/application/login.controller'
import { LoginService } from '@/public/login/domain/login.service'

const loginModuleMetadata = {
  imports: [HttpModule, ConfigModule],
  controllers: [LoginController],
  providers: [LoginService],
}

/**
 * LoginModule
 */
@Module(loginModuleMetadata)
export class LoginModule {}
