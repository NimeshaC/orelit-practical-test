import { Exclude } from "class-transformer";
import { User } from "src/user/entities/user.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { OrderItem } from "./order-item.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  order_id: string;

  @Column()
  total_quantity: string;

  @Column()
  order_date: string;

  @Column()
  order_total: string;

  @Column()
  order_address: string;

  @Column()
  order_phone: string;

  @Column()
  payment_method: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (order_item) => order_item.order)
  order_items: OrderItem[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.order_id = uuidv4();
  }
}
