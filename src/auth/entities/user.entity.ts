import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from '../../products/entities';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'd816c740-7b37-4f60-9b45-d65304c4c817',
    description: 'User id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'test@google.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    example: true,
    description: 'User is active',
  })
  @Column('bool', { default: true })
  isActive: boolean;

  @ApiProperty({
    example: ['user', 'admin'],
    description: 'User roles',
    type: 'array',
    items: {
      type: 'string',
      enum: ['user', 'admin'],
    },
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
