import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimatronicDto } from './create-animatronic.dto';

export class UpdateAnimatronicDto extends PartialType(CreateAnimatronicDto) {}
