import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';
/*import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';*/

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  //@Auth(ValidRoles.ADMIN)
  executeSeed(/*@GetUser() user: User*/) {
    return this.seedService.runSeed();
  }
}
