import 'reflect-metadata';
import {
  PrimaryKey,
  Entity,
  ManyToOne,
  Property,
  Enum,
  BigIntType,
} from '@mikro-orm/postgresql';
import { v4 } from 'uuid';

export enum GlobalRole {
  SUPERADMIN = 'SUPERADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity({ tableName: 'user2' })
export class User {
  @PrimaryKey({ type: 'text' })
  id: string = v4();

  @Property({ type: "text" })
  name!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ nullable: true })
  emailVerified?: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Enum({ items: () => GlobalRole, nativeEnumName: 'global_role' })
  role = GlobalRole.CUSTOMER;
}

@Entity()
export class Session {
  @PrimaryKey({ type: 'text' })
  id: string = v4();

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: new BigIntType('number') })
  active_expires!: number;

  @Property({ type: new BigIntType('number') })
  idle_expires!: number;
}

@Entity()
export class UserKey {
  @PrimaryKey({ type: 'text' })
  id: string = v4();

  @ManyToOne(() => User)
  user!: User;

  @Property({ nullable: true, type: 'text' })
  hashed_password?: string;
}
