import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { GatewayService } from "./gateway.service";

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHealth() {
    return this.gatewayService.getHealth();
  }

  @Get("services")
  @HttpCode(HttpStatus.OK)
  getServices() {
    return this.gatewayService.getServices();
  }

  @Get("health")
  @HttpCode(HttpStatus.OK)
  health() {
    return this.gatewayService.getHealth();
  }
}
