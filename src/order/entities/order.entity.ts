import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  quantity: string;

  @Column()
  user_id: string;

  @Column()
  shop_id: string;

  @Column()
  order_status: string;

  @Column()
  order_date: string;

  @Column()
  order_total: string;

  @Column()
  order_address: string;

  @Column()
  order_phone: string;

  @Column()
  order_email: string;

  @Column()
  order_name: string;

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
