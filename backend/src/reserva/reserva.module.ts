import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hotel } from "../hotel/entities/hotel.entity";
import { Reserva } from "./entities/reserva.entity";
import { ReservaController } from "./reserva.controller";
import { ReservaService } from "./reserva.service";

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Reserva])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
