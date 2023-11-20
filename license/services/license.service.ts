import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {License} from '../entities/license.entity';
import {LicenseDto} from '../dtos/license.dto';
import {forkJoin} from "rxjs";

@Injectable()
export class LicenseService {

  constructor(@InjectRepository(License) private licenseRepository: Repository<License>) {}

  findAll = async (): Promise<License[]> => LicenseDto.fromEntities(await this.licenseRepository.find())
  findOne = async (id: string): Promise<License> => LicenseDto.fromEntity(await this.licenseRepository.findOneBy({id}));
  findOneByNumber = async (number: string): Promise<License> => LicenseDto.fromEntity(await this.licenseRepository.findOneBy({number}))
  create = async (licenseDto: LicenseDto): Promise<License> => LicenseDto.fromEntity(await this.licenseRepository.save(LicenseDto.partialToEntity(licenseDto)))
  createBulk = (licenseDtos: LicenseDto[]): Promise<License[]> => Promise.all([...licenseDtos.map(licenseDto => this.create(licenseDto))])
  update = async (licenseDto: LicenseDto): Promise<License> => LicenseDto.fromEntity(await this.licenseRepository.save(LicenseDto.partialToEntity(licenseDto)))
  remove = (id: string): Promise<DeleteResult> => this.licenseRepository.delete(id)
}
