import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("varchar", { nullable: false })
  name: string;

  @Column("varchar", { unique: true, nullable: false })
  email: string;

  @Column("boolean", { nullable: false })
  isAdm: boolean;

  @Column("boolean", { nullable: false })
  isActive: boolean;

  @Column("varchar", { nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
