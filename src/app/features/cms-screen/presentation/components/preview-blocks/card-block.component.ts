import { Component, Input } from "@angular/core";
import { CardBlock } from "@poc/shared-schema";

@Component({
  selector: "poc-card-block",
  standalone: true,
  template: `
    <section class="card">
      <h3>{{ props.title }}</h3>
      <p>{{ props.description }}</p>
    </section>
  `,
  styles: [
    `
      .card {
        padding: var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: white;
      }

      h3 {
        margin: 0 0 var(--spacing-xs);
        font-size: 18px;
      }

      p {
        margin: 0;
        color: var(--color-muted);
        line-height: 1.5;
      }
    `
  ]
})
export class CardBlockComponent {
  @Input({ required: true }) props!: CardBlock["props"];
}
