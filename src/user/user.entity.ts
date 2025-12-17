import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserProfile } from './user-profile.entity';

export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true }) // Приховуємо хеш пароля від серіалізації
  passwordHash!: string;

  @Enum(() => UserRole)
  role: UserRole = UserRole.BUYER;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    owner: true,
    orphanRemoval: true,
  })
  profile!: UserProfile;

  // Інші зв'язки (OneToMany) будуть додані пізніше,
  // коли відповідні сутності будуть створені.
}
