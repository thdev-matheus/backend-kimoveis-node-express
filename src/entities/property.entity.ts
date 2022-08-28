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
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Address } from "./address.entity";
import { Category } from "./category.entity";

@Entity()
export class Property {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("boolean", { default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2, nullable: false })
  value: number;

  @Column("integer", { nullable: false })
  size: number;

  @CreateDateColumn("date")
  createdAt: Date;

  @UpdateDateColumn("date")
  updateddAt: Date;

  @ManyToOne((type) => Category, (category) => category.properties)
  addressId: string;

  @OneToOne((type) => Address, { eager: true })
  @JoinColumn()
  address: Address;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
