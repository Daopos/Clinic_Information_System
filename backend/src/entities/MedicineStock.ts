import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Medicine } from "./Medicine";
import { User } from "./User";

enum typeEnum {
  IN = "IN",
  OUT = "OUT",
}

@Entity({ name: "medicine_stocks" })
export class MedicineStock {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.stocks, {
    onDelete: "CASCADE",
  })
  medicine!: Medicine;

  @Column({ nullable: false })
  hand_in!: Date;

  @Column({ nullable: false })
  expiration!: Date;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ nullable: false, type: "enum", enum: typeEnum })
  type!: typeEnum;

  @ManyToOne(() => User, (user) => user.stocks, {
    onDelete: "CASCADE",
  })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
