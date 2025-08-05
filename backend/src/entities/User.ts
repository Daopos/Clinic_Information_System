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

export enum UserRole {
  PATIENTS = "PATIENTS",
  ADMIN = "ADMIN",
  DENTIST = "DENTIST",
  PHARMACIST = "PHARMACIST",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  firstname!: string;

  @Column({ nullable: true })
  lastname!: string;

  @Column({ nullable: true })
  middlename!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: UserRole,
    default: UserRole.PATIENTS,
  })
  role!: UserRole;

  @OneToMany(() => MedicineStock, (stock) => stock.user, {
    nullable: true,
    onDelete: "SET NULL",
  })
  stocks!: MedicineStock[];

  @OneToMany(() => MedicineLog, (medicineLog) => medicineLog.user, {
    nullable: true,
    onDelete: "SET NULL",
  })
  medicineLogs!: MedicineLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
