import { CmsScreen } from "../../domain/entities/cms-screen.entity";

export class ValidateScreenUseCase {
  execute(screen: CmsScreen): CmsScreen {
    return screen.validate();
  }
}
