import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  BlockDefinition,
  BlockFieldDefinition,
  DynamicBlock,
  DynamicScreen,
  getBlockDefinition
} from "@poc/shared-schema";
import { ScreenFieldDto } from "../../../domain/dtos/screen-field.dto";
import { ButtonComponent } from "../../../../../shared/ui/button.component";

@Component({
  selector: "poc-block-editor",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./block-editor.component.html",
  styleUrl: "./block-editor.component.css"
})
export class BlockEditorComponent {
  @Input() screen: DynamicScreen | null = null;
  @Input({ required: true }) blockCatalog: readonly BlockDefinition[] = [];
  @Input({ required: true }) selectedBlockType!: DynamicBlock["type"];
  @Input() draggedBlockIndex: number | null = null;
  @Input() dragOverBlockIndex: number | null = null;

  @Output() screenFieldChange = new EventEmitter<{ field: ScreenFieldDto; value: string }>();
  @Output() selectedBlockTypeChange = new EventEmitter<DynamicBlock["type"]>();
  @Output() addBlockClick = new EventEmitter<void>();
  @Output() removeBlockClick = new EventEmitter<number>();
  @Output() blockFieldChange = new EventEmitter<{
    index: number;
    field: BlockFieldDefinition;
    value: string;
  }>();
  @Output() blockDragStart = new EventEmitter<number>();
  @Output() blockDragEnter = new EventEmitter<number>();
  @Output() blockDrop = new EventEmitter<number>();
  @Output() blockDragEnd = new EventEmitter<void>();

  updateScreenField(field: ScreenFieldDto, event: Event) {
    this.screenFieldChange.emit({ field, value: this.eventValue(event) });
  }

  setSelectedBlockType(event: Event) {
    this.selectedBlockTypeChange.emit(this.eventValue(event) as DynamicBlock["type"]);
  }

  updateBlockField(index: number, field: BlockFieldDefinition, event: Event) {
    this.blockFieldChange.emit({ index, field, value: this.eventValue(event) });
  }

  startBlockDrag(index: number, event: DragEvent) {
    event.dataTransfer?.setData("text/plain", String(index));
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
    this.blockDragStart.emit(index);
  }

  enterBlockDropZone(index: number, event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
    this.blockDragEnter.emit(index);
  }

  dropBlock(index: number, event: DragEvent) {
    event.preventDefault();
    this.blockDrop.emit(index);
  }

  fieldsFor(block: DynamicBlock): readonly BlockFieldDefinition[] {
    return getBlockDefinition(block.type).fields;
  }

  blockLabel(block: DynamicBlock): string {
    return getBlockDefinition(block.type).label;
  }

  blockDescription(block: DynamicBlock): string {
    return getBlockDefinition(block.type).description;
  }

  fieldValue(block: DynamicBlock, field: BlockFieldDefinition): string {
    const value = this.getPathValue(block.props as Record<string, unknown>, field.path);
    return typeof value === "string" ? value : "";
  }

  private eventValue(event: Event): string {
    return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
  }

  private getPathValue(source: Record<string, unknown>, path: string): unknown {
    return path.split(".").reduce<unknown>((current, part) => {
      if (!current || typeof current !== "object") {
        return undefined;
      }

      return (current as Record<string, unknown>)[part];
    }, source);
  }
}
