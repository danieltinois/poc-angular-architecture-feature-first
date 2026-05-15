import { Component, computed, inject } from "@angular/core";
import { blockCatalog, BlockFieldDefinition, DynamicBlock } from "@poc/shared-schema";
import { ButtonComponent } from "../../../../../shared/ui/button.component";
import { toUserErrorMessage } from "../../../../../shared/utils/error-message.util";
import { LoadScreenUseCase } from "../../../application/usecases/load-screen.use-case";
import { PublishScreenUseCase } from "../../../application/usecases/publish-screen.use-case";
import { ValidateScreenUseCase } from "../../../application/usecases/validate-screen.use-case";
import { CmsScreen } from "../../../domain/entities/cms-screen.entity";
import { ScreenFieldDto } from "../../../domain/dtos/screen-field.dto";
import { BlockEditorComponent } from "../../components/block-editor/block-editor.component";
import { DynamicScreenRendererComponent } from "../../components/dynamic-screen-renderer/dynamic-screen-renderer.component";
import { CmsScreenStore } from "../../store/cms-screen.store";

@Component({
  selector: "poc-cms-editor-page",
  standalone: true,
  imports: [BlockEditorComponent, ButtonComponent, DynamicScreenRendererComponent],
  templateUrl: "./cms-editor.page.html",
  styleUrl: "./cms-editor.page.css"
})
export class CmsEditorPage {
  private readonly loadScreenUseCase = inject(LoadScreenUseCase);
  private readonly publishScreenUseCase = inject(PublishScreenUseCase);
  private readonly validateScreenUseCase = inject(ValidateScreenUseCase);
  readonly store = inject(CmsScreenStore);
  readonly blockCatalog = blockCatalog;
  readonly screenSnapshot = computed(() => this.store.screen()?.snapshot() ?? null);

  constructor() {
    void this.loadScreen();
  }

  async loadScreen() {
    try {
      this.store.setScreen(await this.loadScreenUseCase.execute());
      this.store.setStatus("Tela carregada da Mock API.");
    } catch (error) {
      this.store.setStatus(`Erro ao carregar: ${toUserErrorMessage(error)}`, true);
    }
  }

  validateBlocks() {
    try {
      this.store.setScreen(this.validateScreenUseCase.execute(this.requireScreen()));
      this.store.setStatus("Tela valida. O preview foi atualizado.");
    } catch (error) {
      this.store.setStatus(`Tela invalida: ${toUserErrorMessage(error)}`, true);
    }
  }

  async publish() {
    try {
      this.store.setScreen(await this.publishScreenUseCase.execute(this.requireScreen()));
      this.store.setStatus("Publicado com sucesso. Flutter ja pode consumir a nova tela.");
    } catch (error) {
      this.store.setStatus(`Erro ao publicar: ${toUserErrorMessage(error)}`, true);
    }
  }

  updateScreenField(event: { field: ScreenFieldDto; value: string }) {
    this.applyScreenChange((screen) => screen.updateScreenField(event.field, event.value));
  }

  updateBlockField(event: { index: number; field: BlockFieldDefinition; value: string }) {
    this.applyScreenChange((screen) => screen.updateBlockField(event.index, event.field, event.value));
  }

  setSelectedBlockType(type: DynamicBlock["type"]) {
    this.store.setSelectedBlockType(type);
  }

  addBlock() {
    const type = this.store.selectedBlockType();
    this.applyScreenChange((screen) => screen.addBlock(type));
    this.store.setStatus(`Bloco ${type} adicionado.`);
  }

  removeBlock(index: number) {
    this.applyScreenChange((screen) => screen.removeBlock(index));
    this.store.setStatus("Bloco removido.");
  }

  startBlockDrag(index: number) {
    this.store.setDragState(index, index);
  }

  enterBlockDropZone(index: number) {
    this.store.setDragState(this.store.draggedBlockIndex(), index);
  }

  dropBlock(targetIndex: number) {
    const sourceIndex = this.store.draggedBlockIndex();

    if (sourceIndex !== null && sourceIndex !== targetIndex) {
      this.applyScreenChange((screen) => screen.reorderBlock(sourceIndex, targetIndex));
      this.store.setStatus("Ordem dos blocos atualizada.");
    }

    this.clearDragState();
  }

  clearDragState() {
    this.store.setDragState(null, null);
  }

  private applyScreenChange(change: (screen: CmsScreen) => CmsScreen) {
    try {
      this.store.setScreen(change(this.requireScreen()));
      this.store.setStatus(this.store.status());
    } catch (error) {
      this.store.setStatus(`Tela invalida: ${toUserErrorMessage(error)}`, true);
    }
  }

  private requireScreen(): CmsScreen {
    const screen = this.store.screen();

    if (!screen) {
      throw new Error("Tela ainda nao carregada.");
    }

    return screen;
  }
}
