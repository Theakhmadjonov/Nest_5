import { IsString } from 'class-validator';

export class CreateViewDto {
  @IsString()
    post_id: string;
}
