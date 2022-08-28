import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Property } from "./property.entity";

@Entity()
export class Address {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("varchar", { length: 50 })
  district: string;

  @Column("varchar", { length: 50 })
  zipCode: string;

  @Column("varchar", { length: 50 })
  number: string;

  @Column("varchar", { length: 50 })
  city: string;

  @Column("varchar", { length: 50 })
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
