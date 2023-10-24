import { Exclude } from "class-transformer";
import { Product } from "src/product/entities/product.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Order } from "./order.entity";

@Entity("order_item")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  order_item_id: string;

  @Column()
  quantity: string;

  @Column()
  order_item_status: string;

  @Column()
  gross_price: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.order_item)
  product: Product;

  @ManyToOne(() => Order, (order) => order.order_items)
  order: Order;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.order_item_id = uuidv4();
  }
}
