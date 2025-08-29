import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

@Entity({ name: "equipments" })
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  equipment_name!: string;

  @Column({ nullable: true })
  total_quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
