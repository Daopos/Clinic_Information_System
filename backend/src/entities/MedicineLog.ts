import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Medicine } from "./Medicine";
import { User } from "./User";
import { MedicineStock } from "./MedicineStock";

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

  @ManyToOne(() => MedicineStock, (stock) => stock.medicineLogs, {
    onDelete: "SET NULL",
  })
  medicineStock!: MedicineStock;

  @ManyToOne(() => User, (user) => user.medicineLogs, {
    onDelete: "SET NULL",
    nullable: true,
  })
  user!: User;

  @ManyToOne(() => User, (user) => user.medcineLogPharma, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "pharmacistId" })
  pharmacist!: User;

  @Column({ nullable: true })
  pharmacistId?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
