import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
