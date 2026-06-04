import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import {
  PaginatedItemsSchema,
  PaginatedItemsSchemaType,
} from '@qiita-trend/schema'
import { lastValueFrom, map } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { ItemsRepository } from '@/public/items/domain/items.repository'

/**
 *ItemsRepositoryImpl
 */
@Injectable()
export class ItemsRepositoryImpl implements ItemsRepository {
  constructor(private readonly httpService: HttpService) {}

  async getItems(
    startDate: string,
    endDate: string,
    page: string,
  ): Promise<PaginatedItemsSchemaType> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(startDate, endDate, page)).pipe(
        map((response) => {
          return v.parse(PaginatedItemsSchema, {
            items: response.data as unknown,
            totalCount: Number(response.headers['total-count']),
          })
        }),
      ),
    )
  }

  private buildUrl(startDate: string, endDate: string, page: string): string {
    const url = new URL('https://qiita.com/api/v2/items')
    const queryConditions = ['stocks:>=100']
    if (startDate && endDate) {
      queryConditions.unshift(`created:>=${startDate}`, `created:<=${endDate}`)
    }
    const pageNumber = Number(page)
    const validPage = pageNumber > 100 ? '100' : page

    url.searchParams.set('sort', 'stock')
    url.searchParams.set('page', validPage)
    url.searchParams.set('per_page', '100')
    url.searchParams.set('query', queryConditions.join(' '))
    return url.toString()
  }
}
