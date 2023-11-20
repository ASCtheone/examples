import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import {LicenseService} from '../services/license.service';
import {LicenseDto} from '../dtos/license.dto';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get()
  async findAll() {
    return await this.licenseService.findAll()
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.licenseService.findOne(id);
  }

  @Get('/number/:number')
  async findByCode(@Param('number') number: string) {
    return await this.licenseService.findOneByNumber(number);
  }

  @Post()
  async create(@Body() licenseDto: LicenseDto) {
    return await this.licenseService.create(licenseDto);
  }


  @Post('/bulk')
  async createBulk(@Body() licenseDtos: LicenseDto[]) {
    return await this.licenseService.createBulk(licenseDtos);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() licenseDto: LicenseDto) {
    if (id != licenseDto.id) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.licenseService.update(licenseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.licenseService.remove(id);
  }
}
