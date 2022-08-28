import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Property } from "./property.entity";

@Entity()
export class Schedule {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("date", { nullable: false })
  date: Date;

  @Column("time", { nullable: false })
  hour: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
