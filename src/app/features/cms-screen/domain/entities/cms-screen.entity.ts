import {
  BlockFieldDefinition,
  createDefaultBlock,
  DynamicBlock,
  DynamicScreen,
  validateDynamicScreen
} from "@poc/shared-schema";
import { ScreenFieldDto } from "../dtos/screen-field.dto";

export class CmsScreen {
  private constructor(private readonly data: DynamicScreen) {}

  static fromPayload(payload: unknown): CmsScreen {
    return new CmsScreen(validateDynamicScreen(payload));
  }

  snapshot(): DynamicScreen {
    return structuredClone(this.data);
  }

  updateScreenField(field: ScreenFieldDto, value: string): CmsScreen {
    return this.patch((screen) => {
      screen[field] = value;
    });
  }

  addBlock(type: DynamicBlock["type"]): CmsScreen {
    return this.patch((screen) => {
      screen.blocks.push(createDefaultBlock(type));
    });
  }

  removeBlock(index: number): CmsScreen {
    return this.patch((screen) => {
      screen.blocks.splice(index, 1);
    });
  }

  reorderBlock(sourceIndex: number, targetIndex: number): CmsScreen {
    return this.patch((screen) => {
      const [block] = screen.blocks.splice(sourceIndex, 1);
      screen.blocks.splice(targetIndex, 0, block);
    });
  }

  updateBlockField(index: number, field: BlockFieldDefinition, value: string): CmsScreen {
    return this.patch((screen) => {
      const block = screen.blocks[index];
      const props = { ...block.props } as Record<string, unknown>;
      this.setPathValue(props, field.path, value);
      block.props = props as DynamicBlock["props"];
    });
  }

  validate(): CmsScreen {
    return CmsScreen.fromPayload(this.data);
  }

  private patch(mutator: (screen: DynamicScreen) => void): CmsScreen {
    const nextScreen = this.snapshot();
    mutator(nextScreen);
    return CmsScreen.fromPayload(nextScreen);
  }

  private setPathValue(target: Record<string, unknown>, path: string, value: string) {
    const parts = path.split(".");
    let current = target;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = value;
        return;
      }

      const next = current[part];
      if (!next || typeof next !== "object") {
        current[part] = {};
      }
      current = current[part] as Record<string, unknown>;
    });

    if (path === "action.target") {
      target["action"] = {
        type: "navigate",
        ...(target["action"] as Record<string, unknown>)
      };
    }
  }
}
