import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Property } from "./property.entity";

@Entity()
export class Category {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("varchar", { length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany((type) => Property, (property) => property.category)
  @JoinColumn()
  properties: Property[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
