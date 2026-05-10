import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { TagController } from '@/public/tag/application/tag.controller'
import { TagRepository } from '@/public/tag/domain/tag.repository'
import { TagService } from '@/public/tag/domain/tag.service'
import { TagRepositoryImpl } from '@/public/tag/infrastructure/tag.repositoryImpl'

const tagModuleMetadata = {
  imports: [HttpModule],
  controllers: [TagController],
  providers: [
    TagService,
    { provide: TagRepository, useClass: TagRepositoryImpl },
  ],
}

/**
 * TagModule
 */
@Module(tagModuleMetadata)
export class TagModule {}
