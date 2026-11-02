import { Controller, Get, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Controller("salud")
class SaludController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async comprobarConexion() {
    const [row] = await this.dataSource.query(
      "SELECT current_database() AS base, current_timestamp AS hora",
    );
    return { estado: "ok", base: row.base, hora: row.hora };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "control_databridge",
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [SaludController],
})
export class AppModule {}
