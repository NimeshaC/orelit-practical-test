import { Exclude } from "class-transformer";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
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
  shop_address: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.shops)
  user: User;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.shop_id = uuidv4();
  }
}
