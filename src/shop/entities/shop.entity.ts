import { Exclude } from "class-transformer";
import { Promotion } from "src/promotion/entities/promotion.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("shop")
export class Shop {
  @PrimaryGeneratedColumn("uuid")
  shop_id: string;

  @Column()
  shop_name: string;

  @Column()
  shop_phone: string;

  @Column()
  admin_id: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @OneToMany(() => Promotion, (promotion) => promotion.shop)
  promotions: Promotion[];

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.shop_id = uuidv4();
  }
}
