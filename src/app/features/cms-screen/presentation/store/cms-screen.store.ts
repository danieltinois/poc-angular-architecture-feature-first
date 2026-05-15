import { Injectable, signal } from "@angular/core";
import { DynamicBlock } from "@poc/shared-schema";
import { CmsScreen } from "../../domain/entities/cms-screen.entity";

@Injectable()
export class CmsScreenStore {
  private readonly screenState = signal<CmsScreen | null>(null);
  private readonly statusState = signal("Carregando tela da API...");
  private readonly errorState = signal(false);
  private readonly selectedBlockTypeState = signal<DynamicBlock["type"]>("text");
  private readonly draggedBlockIndexState = signal<number | null>(null);
  private readonly dragOverBlockIndexState = signal<number | null>(null);

  readonly screen = this.screenState.asReadonly();
  readonly status = this.statusState.asReadonly();
  readonly isError = this.errorState.asReadonly();
  readonly selectedBlockType = this.selectedBlockTypeState.asReadonly();
  readonly draggedBlockIndex = this.draggedBlockIndexState.asReadonly();
  readonly dragOverBlockIndex = this.dragOverBlockIndexState.asReadonly();

  setScreen(screen: CmsScreen) {
    this.screenState.set(screen);
  }

  setSelectedBlockType(type: DynamicBlock["type"]) {
    this.selectedBlockTypeState.set(type);
  }

  setStatus(status: string, isError = false) {
    this.statusState.set(status);
    this.errorState.set(isError);
  }

  setDragState(draggedIndex: number | null, overIndex: number | null) {
    this.draggedBlockIndexState.set(draggedIndex);
    this.dragOverBlockIndexState.set(overIndex);
  }
}
