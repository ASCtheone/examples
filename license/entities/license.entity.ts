import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ schema: 'translation' })
export class License {
  @PrimaryGeneratedColumn()
  id: string

  @Column({nullable: true})
  number: string

  @Column({nullable: true})
  companyName: string

  @Column({nullable: true})
  CompanyName?: string

  @Column({nullable: true})
  activationDate: Date

  @Column({nullable: true})
  endDate: Date
}
