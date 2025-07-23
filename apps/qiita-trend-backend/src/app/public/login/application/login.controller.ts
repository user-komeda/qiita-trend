import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'

import { LoginService } from '@/public/login/domain/login.service'

/**
 *ItemsController
 */
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   *login試行
   *
   * @param body - body
   *
   * @param res - res
   *
   * @returns - Response
   */
  @Post()
  async login(@Body() body: string, @Res() res: Response): Promise<Response> {
    const result = await this.loginService.login(body)
    return (
      res
        .status(result.status)
        //  eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .cookie('token_value', result.data.token, {
          signed: true,
          httpOnly: true,
          path: '/',
          domain: 'localhost',
          secure: false,
          sameSite: 'lax',
        })
        .json(result.data)
    )
  }
}
