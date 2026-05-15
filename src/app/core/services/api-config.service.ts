import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ApiConfigService {
  readonly cmsScreenUrl = "http://localhost:3333/screen/home";
}
