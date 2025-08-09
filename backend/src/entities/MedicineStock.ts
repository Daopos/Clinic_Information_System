import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Medicine } from "./Medicine";
import { User } from "./User";
import { MedicineLog } from "./MedicineLog";

enum typeEnum {
  IN = "IN",
  OUT = "OUT",
}

@Entity({ name: "medicine_stocks" })
export class MedicineStock {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.stocks, {
    onDelete: "CASCADE",
  })
  medicine!: Medicine;

  @Column({ nullable: false })
  hand_in!: Date;

  @Column({ nullable: false })
  expiration!: Date;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ nullable: true, type: "enum", enum: typeEnum })
  type!: typeEnum;

  @ManyToOne(() => User, (user) => user.stocks, {
    onDelete: "CASCADE",
  })
  user!: User;

  @OneToMany(() => MedicineLog, (medicineLog) => medicineLog.medicineStock, {
    onDelete: "CASCADE",
  })
  medicineLogs!: MedicineLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
