import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ApiConfigService } from "../../../../core/services/api-config.service";
import { DynamicScreenRepository } from "../../domain/repositories/dynamic-screen.repository";
import { DynamicScreen } from "@poc/shared-schema";
import { DynamicScreenMapper } from "../mappers/dynamic-screen.mapper";

@Injectable()
export class HttpDynamicScreenRepository implements DynamicScreenRepository {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfigService);

  async findHome(): Promise<DynamicScreen> {
    const payload = await firstValueFrom(this.http.get<unknown>(this.apiConfig.cmsScreenUrl));
    return DynamicScreenMapper.fromApi(payload);
  }

  async saveHome(screen: DynamicScreen): Promise<DynamicScreen> {
    const payload = await firstValueFrom(
      this.http.post<{ screen: unknown }>(this.apiConfig.cmsScreenUrl, screen)
    );
    return DynamicScreenMapper.fromSaveResponse(payload);
  }
}
