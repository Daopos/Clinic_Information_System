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

@Entity({ name: "medicine_logs" })
export class MedicineLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  dispensed_to!: string;

  @Column({ nullable: false })
  quantity_dispensed!: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.medicineLogs, {
    onDelete: "SET NULL",
  })
  medicine!: Medicine;

  @ManyToOne(() => User, (user) => user.medicineLogs, {
    onDelete: "SET NULL",
    nullable: true,
  })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
