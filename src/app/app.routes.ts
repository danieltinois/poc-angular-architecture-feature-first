import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./features/cms-screen/presentation/cms-screen.routes").then(
        (m) => m.CMS_SCREEN_ROUTES
      )
  }
];
