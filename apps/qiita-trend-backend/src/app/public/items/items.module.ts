import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { ItemsController } from '@/public/items/application/items.controller'
import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'
import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'
import { ItemsDetailRepositoryImpl } from '@/public/itemsdetail/infrastructure/itemsDetail.repositoryImpl'

/**
 * ItemsModule
 */
@Module({
  imports: [HttpModule],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    ItemsDetailService,
    { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
    { provide: ItemsDetailRepository, useClass: ItemsDetailRepositoryImpl },
  ],
})
export class ItemsModule {}
