import { DynamicScreen, validateDynamicScreen } from "@poc/shared-schema";

type SaveScreenResponse = {
  screen: unknown;
};

export class DynamicScreenMapper {
  static fromApi(payload: unknown): DynamicScreen {
    return validateDynamicScreen(payload);
  }

  static fromSaveResponse(payload: SaveScreenResponse): DynamicScreen {
    return validateDynamicScreen(payload.screen);
  }
}
