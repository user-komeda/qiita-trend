import { Module } from '@nestjs/common'

import { CommentController } from '@/public/comment/application/comment.controller'
import { CommentRepository } from '@/public/comment/domain/comment.repository'
import { CommentService } from '@/public/comment/domain/comment.service'
import { CommentRepositoryImpl } from '@/public/comment/infrastructure/comment.repositoryImpl'

const commentModuleMetadata = {
  controllers: [CommentController],
  providers: [
    CommentService,
    { provide: CommentRepository, useClass: CommentRepositoryImpl },
  ],
}

/**
 *CommentModule
 */
@Module(commentModuleMetadata)
export class CommentModule {}
