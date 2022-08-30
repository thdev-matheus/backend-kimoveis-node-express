import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity()
export class Schedule {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("date", { nullable: false })
  date: Date;

  @Column("bigint", { nullable: false })
  hour: number;

  @ManyToOne((type) => User, (user) => user.schedules, {
    nullable: false,
  })
  user: User;

  @ManyToOne((type) => Property, (property) => property.schedules, {
    nullable: false,
  })
  property: Property;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
