import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Schedule } from "./schedule.entity";

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

  @Column("varchar", { nullable: false })
  password: string;

  @Column("boolean", { nullable: false, default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.user)
  @JoinColumn()
  schedules: Schedule[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
