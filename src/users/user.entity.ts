import * as argon2 from 'argon2';
import { Entity, Column, ManyToOne, BeforeInsert, Unique } from 'typeorm';
import { Base } from '../base.abstract-entity';
import { Role } from '../users/roles/role.entity';

@Entity()
@Unique(['email'])
export class User extends Base {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @ManyToOne(() => Role, role => role.users)
  role: Role;
}
