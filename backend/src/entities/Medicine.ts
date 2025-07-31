import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ nullable: false })
  expiration!: Date;

  @Column({ nullable: false })
  stock!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
