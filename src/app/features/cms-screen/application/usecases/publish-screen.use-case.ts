import { CmsScreen } from "../../domain/entities/cms-screen.entity";
import { DynamicScreenRepository } from "../../domain/repositories/dynamic-screen.repository";

export class PublishScreenUseCase {
  constructor(private readonly repository: DynamicScreenRepository) {}

  async execute(screen: CmsScreen): Promise<CmsScreen> {
    const validatedScreen = screen.validate();
    return CmsScreen.fromPayload(await this.repository.saveHome(validatedScreen.snapshot()));
  }
}
