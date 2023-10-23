import { Exclude } from "class-transformer";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("order_item")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  order_item_id: string;

  @Column()
  order_id: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.order_item_id = uuidv4();
  }
}
