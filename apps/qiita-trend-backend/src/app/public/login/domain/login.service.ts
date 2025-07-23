import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { lastValueFrom } from 'rxjs'

/**
 *ItemsService
 */
@Injectable()
export class LoginService {
  constructor(private readonly httpService: HttpService) {}
  /**
   *login試行
   *
   * @param body - body
   *
   * @returns - loginResult
   */
  async login(body: string): Promise<AxiosResponse> {
    return lastValueFrom(
      this.httpService.post('https://qiita.com/api/v2/access_tokens', body),
    )
  }
}
