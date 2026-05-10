import { Body, Controller, Post } from '@nestjs/common'
import { IsString } from 'class-validator'

import { LoginService } from '@/public/login/domain/login.service'

class LoginDto {
  @IsString()
  code!: string
}

interface LoginResponse {
  token: string
}

/**
 * LoginController
 * Qiita の認可コードをアクセストークンに交換するだけ。
 */
@Controller('')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * code → access_token 交換
   *
   * @param body - { code }
   *
   * @returns access token
   */
  @Post()
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    const token = await this.loginService.exchangeCodeForToken(body.code)
    return { token }
  }
}
