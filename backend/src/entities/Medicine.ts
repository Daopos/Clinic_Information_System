import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { MedicineStock } from "./MedicineStock";

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
