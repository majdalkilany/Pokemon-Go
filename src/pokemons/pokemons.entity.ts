import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  img: string;
  @Column()
  generation: number;
  @Column({ nullable: true })
  evolutionStage: string;
  @Column({ nullable: true })
  evolved: number;
  @Column({ nullable: true })
  familyId: number;
  @Column({ nullable: true })
  crossGen: number;
  @Column({ nullable: true })
  type1: string;
  @Column({ nullable: true })
  statTotal: number;
  @Column({ nullable: true })
  atk: number;
  @Column({ nullable: true })
  def: number;
  @Column({ nullable: true })
  sta: number;
}
