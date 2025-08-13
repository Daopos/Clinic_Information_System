import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { MedicineStock } from "./MedicineStock";
import { MedicineLog } from "./MedicineLog";

@Entity({ name: "medicines" })
export class Medicine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  med_name!: string;

  @Column({ nullable: true })
  dosage!: number;

  @Column({ nullable: true })
  form_med!: string;

  @OneToMany(() => MedicineStock, (stock) => stock.medicine)
  stocks!: MedicineStock[];

  @OneToMany(() => MedicineLog, (log) => log.medicine)
  medicineLogs!: MedicineLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  //not store in DB
  stocksCount?: number;

  status?: string;

  totalQuantity?: number;
}
