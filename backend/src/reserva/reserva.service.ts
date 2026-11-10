import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Reserva } from "./entities/reserva.entity";

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    //geti <arraylist>
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  findAll() {
    return this.reservaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.hotel", "principal")
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  findByHotel(principalId: number) {
    return this.reservaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.hotel", "principal")
      .where("principal.id = :principalId", { principalId })
      .orderBy("registro.id", "ASC")
      .getMany();
  }
  findByName(name: string) {
    return this.reservaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.hotel", "principal")
      .where("registro.nombre ILIKE :pattern", { pattern: `%${name}%` })
      .orderBy("registro.id", "ASC")
      .getMany();
  }
  findByHotelAndMinimun(principalId: number, minimun: number) {
    return this.reservaRepository
    .createQueryBuilder("registro")    
    .innerJoinAndSelect("registro.hotel", "principal")
    .where("principal.id = :principalId", { principalId })
    .andWhere("registro.noches >= :minimun", { minimun })
    .orderBy("registro.noches", "DESC")
    .getMany()
  }

  /*
findAll() {
  return this.sesionRepository
    .createQueryBuilder("registro")
    .innerJoinAndSelect("registro.actividades", "principal")
    .orderBy("registro.id", "ASC")
    .getMany();
}
*/

  countByHotel () {
    return this.reservaRepository
    .createQueryBuilder("principal")
    .leftJoin("principal.reservas", "registro")  
    .select("principal.id", "id")
    .addSelect("COUNT(registro.id)", "total")
    .groupBy("principal.id")
    .addGroupBy("principal.nombre")
    .orderBy("principal.id", "ASC")
    .getMany()

  }

  create(data: DeepPartial<Reserva>) {
    const reserva = this.reservaRepository.create(data);
    return this.reservaRepository.save(reserva);
  }

  remove(id: number) {
    return this.reservaRepository.delete(id);
  }

  update(id: number, name: string) {
    return this.reservaRepository.update(id, { nombre: name });
  }

  update_fk(id: number, id_hotel: number) {
    return this.reservaRepository.update(id, { hotel: { id: id_hotel } });
  }

  findHotelWith5NightsOrMore() {
    return this.reservaRepository
    .createQueryBuilder("principal")
    .innerJoinAndSelect("principal.hotel", "registro")
    .where("registro.noches >= :minimun", { minimun: 5 })
    .orderBy("registro.noches", "DESC")
    .getMany()
  }
}