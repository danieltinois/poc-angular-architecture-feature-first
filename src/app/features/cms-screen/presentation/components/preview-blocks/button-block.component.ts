import { Component, Input } from "@angular/core";
import { ButtonBlock } from "@poc/shared-schema";

@Component({
  selector: "poc-button-block",
  standalone: true,
  template: `
    <button type="button" [class.secondary]="props.variant === 'secondary'">
      {{ props.label }}
    </button>
  `,
  styles: [
    `
      button {
        width: 100%;
        min-height: 48px;
        border: 1px solid var(--color-primary);
        border-radius: var(--radius-md);
        color: white;
        background: var(--color-primary);
        cursor: pointer;
        font-weight: 700;
      }

      .secondary {
        color: var(--color-primary);
        background: white;
      }
    `
  ]
})
export class ButtonBlockComponent {
  @Input({ required: true }) props!: ButtonBlock["props"];
}
