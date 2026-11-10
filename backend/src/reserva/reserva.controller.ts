import { Body,Controller, Delete, Get, Param, Post, Patch } from "@nestjs/common";
import { ReservaService } from "./reserva.service";

@Controller("reservas")
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @Get("hotel/:principalId")
  findByHotel(@Param("principalId") principalId: string) {
    return this.reservaService.findByHotel(Number(principalId));
  }
  @Get("hotel/:name")
  findByName(@Param("name") name: string) {
    return this.reservaService.findByName(name);
  }
  @Get("hotel/:principalId/minimun/:minimun")
  findByHotelAndMinimun(@Param("principalId") principalId: string, @Param("minimun") minimun: string) {
    return this.reservaService.findByHotelAndMinimun(Number(principalId), Number(minimun));
  }
  @Get("resumen/hotel")
  countByHotel() {
    return this.reservaService.countByHotel();
  }
  @Post("create")
  create(@Body() data: any) {
    return this.reservaService.create(data);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.reservaService.remove(Number(id));
  }

  @Patch("update_name/:id")
  update(@Param("id") id: string, @Body("name") name: string) {
    return this.reservaService.update(Number(id), name);
  }

  @Patch("update_fk/:id")
  updateFk(@Param("id") id: string, @Body("id_hotel") id_hotel: number) {
    return this.reservaService.update_fk(Number(id), id_hotel);
  }

  @Get("hotel/5oMas")
  findHotelWith5NightsOrMore() {
    return this.reservaService.findHotelWith5NightsOrMore();
  }
}

