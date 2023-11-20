import {EntityDto} from '@kedi/api';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {License} from '../entities/license.entity';
import {getStatusFromEndDate} from "../license.util";

export class LicenseDto implements EntityDto<LicenseDto, License>, Readonly<LicenseDto> {
  id: string
  number: string
  companyName: string
  companyTel: string
  companyNumber: string
  activationDate: Date
  endDate: Date
  status: boolean

  public static from(Dto: Partial<LicenseDto>): LicenseDto {
    const license = new LicenseDto()
    license.id = Dto.id
    license.number = Dto.number
    license.companyTel = Dto.number
    license.companyNumber = Dto.number
    license.companyName = Dto.companyName
    license.activationDate = Dto.activationDate
    license.endDate = Dto.endDate
    license.status = getStatusFromEndDate(Dto.endDate)
    return license
  }

  public static fromEntity = (entity: License): LicenseDto => LicenseDto.from({
    id: entity.id,
    number: entity.number,
    activationDate: entity.activationDate,
    companyName: entity.companyName || entity.CompanyName,
    endDate: entity.endDate,
    companyTel: entity.number,
    companyNumber: entity.number,
    status: getStatusFromEndDate(entity.endDate)
  })

  public static fromEntity$ = (entity$: Observable<License>): Observable<LicenseDto> => entity$.pipe(map(LicenseDto.fromEntity))
  public static partialToEntity = (partialDto: Partial<LicenseDto>): License => LicenseDto.from(partialDto).toEntity()
  public static fromEntities = (entities: License[]): LicenseDto[] => entities.map(LicenseDto.fromEntity)
  public static fromEntities$ = (entities$: Observable<License[]>): Observable<LicenseDto[]> => entities$.pipe(map(LicenseDto.fromEntities))

  public toEntity(): License {
    const license = new License();
    license.id = this.id
    license.number = this.number
    license.activationDate = this.activationDate
    license.companyName = this.companyName
    license.endDate = this.endDate
    return license;
  }
}
