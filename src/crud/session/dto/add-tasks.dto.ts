import { IsArray, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddTasksDto {
  @ApiProperty({
    description: 'Array of task IDs to be added to the session',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  taskIds: string[]
}
