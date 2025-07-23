import { Inject, Injectable } from '@nestjs/common'

import { TagRepository } from '@/public/tag/domain/tag.repository'
import { TagData } from '@/types/tagData'

/**
 *TagService
 */
@Injectable()
export class TagService {
  constructor(
    @Inject(TagRepository) private readonly tagRepository: TagRepository,
  ) {}
  /**
   *すべてのタグを取得
   */
  getTags(): Promise<TagData[]> {
    return this.tagRepository.getTags()
  }
}
