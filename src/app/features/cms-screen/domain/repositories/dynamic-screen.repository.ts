import type { DynamicScreen } from "@poc/shared-schema";

export abstract class DynamicScreenRepository {
  abstract findHome(): Promise<DynamicScreen>;
  abstract saveHome(screen: DynamicScreen): Promise<DynamicScreen>;
}
