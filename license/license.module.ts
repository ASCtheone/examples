import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {License} from './entities/license.entity';
import {LicenseService} from './services/license.service';
import {LicenseController} from './controllers/license.controller';

@Module({
  providers: [LicenseService],
  controllers: [LicenseController],
  imports: [TypeOrmModule.forFeature([License])],
  exports: [LicenseService]
})
export class LicenseModule {}
