/* eslint-disable max-lines */
import { HttpService } from '@nestjs/axios'
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common'
import { isAxiosError } from 'axios'

/**
 * HttpService のエラーログを共通化する
 */
@Injectable()
export class HttpErrorLogger implements OnModuleInit {
  private readonly logger = new Logger(HttpErrorLogger.name)

  constructor(private readonly httpService: HttpService) {}

  // eslint-disable-next-line max-lines-per-function
  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.response.use(
      (response) => {
        return response
      },
      // eslint-disable-next-line max-lines-per-function
      (error: unknown) => {
        if (!isAxiosError(error)) {
          this.logger.error('Unexpected HTTP error occurred', error)

          return Promise.reject(
            new InternalServerErrorException('Unexpected HTTP error occurred'),
          )
        }

        this.logger.error({
          message: 'External HTTP request failed',
          axiosMessage: error.message,
          code: error.code,
          method: error.config?.method?.toUpperCase(),
          url: error.config?.url,
          status: error.response?.status,
          statusText: error.response?.statusText,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          responseData: error.response?.data,
        })

        const externalResponse = error.response

        if (externalResponse === undefined) {
          return Promise.reject(
            new InternalServerErrorException('Unexpected HTTP error occurred'),
          )
        }

        return Promise.reject(
          new HttpException(
            {
              message: 'External API request failed',
              statusCode: externalResponse.status,
              externalApi: {
                status: externalResponse.status,
                statusText: externalResponse.statusText,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                responseData: externalResponse.data,
              },
            },
            externalResponse.status,
          ),
        )
      },
    )
  }
}
