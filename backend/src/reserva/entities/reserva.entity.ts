import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "src/hotel/entities/hotel.entity";

@Entity({ name: "RESERVA" })
export class Reserva {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;

  @Column({ name: "NOMBRE", type: "varchar", length: 120 })
  nombre!: string;

  @Column({ name: "NOCHES", type: "integer" })
  noches!: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.reservas, { nullable: false })

  @JoinColumn({ name: "ID_HOTEL" })

  hotel!: Hotel;
}