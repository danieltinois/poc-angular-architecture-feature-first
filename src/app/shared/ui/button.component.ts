import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "poc-ui-button",
  standalone: true,
  template: `
    <button
      type="button"
      [class.secondary]="variant === 'secondary'"
      [class.ghost]="variant === 'ghost'"
      [class.danger]="variant === 'danger'"
      [disabled]="disabled"
      (click)="clicked.emit()"
    >
      <ng-content />
    </button>
  `,
  styles: [
    `
      button {
        min-height: 40px;
        padding: 0 var(--spacing-md);
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        color: white;
        background: var(--color-primary);
        cursor: pointer;
        font: inherit;
        font-weight: 800;
      }

      .secondary,
      .ghost {
        color: var(--color-text);
        background: white;
        border-color: var(--color-border);
      }

      .danger {
        color: #991b1b;
        background: #fef2f2;
        border-color: #fecaca;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.65;
      }
    `
  ]
})
export class ButtonComponent {
  @Input() variant: "primary" | "secondary" | "ghost" | "danger" = "primary";
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();
}
