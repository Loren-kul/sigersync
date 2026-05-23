import { Injectable } from "@nestjs/common";

@Injectable()
export class GatewayService {
  getHealth(): { status: string; timestamp: Date } {
    return {
      status: "Gateway is running",
      timestamp: new Date(),
    };
  }

  getServices() {
    return {
      services: [
        {
          name: "Kategori Service",
          endpoint: "/api/categories",
          description: "Service untuk mengelola kategori",
        },
      ],
    };
  }
}
