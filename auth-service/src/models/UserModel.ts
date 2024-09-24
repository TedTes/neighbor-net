import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @Column()
  @Length(4, 100, { message: "Password must be between 4 and 100 characters" })
  password: string;

  @Column({ default: "user" })
  role: string;
}
