import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum statusEnum {
  Approved = "Approved",
  Declined = "Declined",
  Pending = "Pending",
}

@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  //patient
  @ManyToOne(() => User, (user) => user.appointmentPatient, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "patientId" })
  patient!: User;

  @Column({ nullable: true })
  patientId: number;

  //services
  @Column({ nullable: false })
  services!: string;

  //dentist
  @ManyToOne(() => User, (user) => user.appointmentDentist, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "dentistId" })
  dentist?: User;

  @Column({ nullable: true })
  dentistId?: number;

  //status
  @Column({ nullable: false, type: "enum", enum: statusEnum })
  status!: statusEnum;

  // Appointment date
  @Column({ nullable: false, type: "timestamptz" })
  app_date!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
