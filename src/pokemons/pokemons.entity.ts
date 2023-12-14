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
  @Column()
  evolutionStage: string;
  @Column()
  evolved: number;
  @Column()
  familyId: number;
  @Column()
  crossGen: number;
  @Column()
  type1: string;
  @Column()
  statTotal: number;
  @Column()
  atk: number;
  @Column()
  def: number;
  @Column()
  sta: number;
}
