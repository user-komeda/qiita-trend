import { Controller, Get } from '@nestjs/common'

import { TagService } from '@/public/tag/domain/tag.service'
import { TagData } from '@/types/tagData'

/**
 *TagController
 */
@Controller('')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   *すべてのタグを取得
   */
  @Get()
  getTags(): Promise<TagData[]> {
    return this.tagService.getTags()
  }
}
