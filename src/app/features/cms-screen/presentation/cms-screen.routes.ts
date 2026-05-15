import { Routes } from "@angular/router";
import { DynamicScreenRepository } from "../domain/repositories/dynamic-screen.repository";
import { LoadScreenUseCase } from "../application/usecases/load-screen.use-case";
import { PublishScreenUseCase } from "../application/usecases/publish-screen.use-case";
import { ValidateScreenUseCase } from "../application/usecases/validate-screen.use-case";
import { HttpDynamicScreenRepository } from "../infrastructure/repositories/http-dynamic-screen.repository";
import { CmsScreenStore } from "./store/cms-screen.store";

export const CMS_SCREEN_ROUTES: Routes = [
  {
    path: "",
    providers: [
      CmsScreenStore,
      { provide: DynamicScreenRepository, useClass: HttpDynamicScreenRepository },
      {
        provide: LoadScreenUseCase,
        useFactory: (repository: DynamicScreenRepository) => new LoadScreenUseCase(repository),
        deps: [DynamicScreenRepository]
      },
      {
        provide: PublishScreenUseCase,
        useFactory: (repository: DynamicScreenRepository) => new PublishScreenUseCase(repository),
        deps: [DynamicScreenRepository]
      },
      ValidateScreenUseCase
    ],
    loadComponent: () =>
      import("./pages/cms-editor/cms-editor.page").then((m) => m.CmsEditorPage)
  }
];
