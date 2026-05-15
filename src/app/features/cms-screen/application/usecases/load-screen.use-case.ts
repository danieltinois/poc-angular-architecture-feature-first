import { CmsScreen } from "../../domain/entities/cms-screen.entity";
import { DynamicScreenRepository } from "../../domain/repositories/dynamic-screen.repository";

export class LoadScreenUseCase {
  constructor(private readonly repository: DynamicScreenRepository) {}

  async execute(): Promise<CmsScreen> {
    return CmsScreen.fromPayload(await this.repository.findHome());
  }
}
