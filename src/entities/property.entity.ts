import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  JoinColumn,
  Unique,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Address } from "./address.entity";
import { Category } from "./category.entity";
import { Schedule } from "./schedule.entity";

@Entity()
@Unique(["address"])
export class Property {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("boolean", { default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2, nullable: false })
  value: number;

  @Column("integer", { nullable: false })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.property)
  @JoinColumn()
  schedules: Schedule[];

  @OneToOne((type) => Address, { eager: true, nullable: false })
  @JoinColumn()
  address: Address;

  @ManyToOne((type) => Category, (category) => category.properties, {
    nullable: false,
  })
  @JoinColumn()
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
