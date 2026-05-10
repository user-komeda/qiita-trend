import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'

interface QiitaTokenResponse {
  token: string
}

/**
 * LoginService
 */
@Injectable()
export class LoginService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  /**
   * code をアクセストークンに交換
   *
   * @param code - 認可コード
   *
   * @returns Qiita アクセストークン
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    const clientId = this.config.get<string>('CLIENT_ID')
    const clientSecret = this.config.get<string>('CLIENT_SECRET')

    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }

    const response = await lastValueFrom(
      this.httpService.post<QiitaTokenResponse>(
        'https://qiita.com/api/v2/access_tokens',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ),
    )
    return response.data.token
  }
}
