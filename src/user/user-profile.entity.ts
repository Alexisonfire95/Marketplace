import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity({ tableName: 'user_profiles' })
export class UserProfile {
  @OneToOne(() => User, { primary: true, owner: false })
  user!: User;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ type: 'text', nullable: true })
  address?: string;

  @Property({ nullable: true })
  avatarUrl?: string;
}
