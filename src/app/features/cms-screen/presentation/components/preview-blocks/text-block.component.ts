import { Component, Input } from "@angular/core";
import { TextBlock } from "@poc/shared-schema";

@Component({
  selector: "poc-text-block",
  standalone: true,
  template: `
    @if (props.variant === "link") {
      <a [href]="props.href" target="_blank">
        {{ props.content }}
      </a>
    } @else {
      <p>{{ props.content }}</p>
    }
  `,
  styles: [
    `
      p {
        margin: 0;
        color: var(--color-text);
        font-size: var(--font-size-body);
        line-height: 1.6;
      }

      a {
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 700;
      }
    `
  ]
})
export class TextBlockComponent {
  @Input({ required: true }) props!: TextBlock["props"];
}
