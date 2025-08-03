import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Medicine } from "./Medicine";

@Entity({ name: "medicine_stocks" })
export class MedicineStock {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.stocks, {
    onDelete: "CASCADE",
  })
  medicine!: Medicine;

  @Column({ nullable: false })
  expiration!: Date;

  @Column({ nullable: false })
  stock!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
