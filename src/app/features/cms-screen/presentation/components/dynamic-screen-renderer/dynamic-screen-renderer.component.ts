import { Component, Input } from "@angular/core";
import {
  ButtonBlock,
  CardBlock,
  DynamicBlock,
  HeroBlock,
  TextBlock,
  VideoBlock
} from "@poc/shared-schema";
import { ButtonBlockComponent } from "../preview-blocks/button-block.component";
import { CardBlockComponent } from "../preview-blocks/card-block.component";
import { HeroBlockComponent } from "../preview-blocks/hero-block.component";
import { TextBlockComponent } from "../preview-blocks/text-block.component";
import { VideoBlockComponent } from "../preview-blocks/video-block.component";

@Component({
  selector: "poc-dynamic-screen-renderer",
  standalone: true,
  imports: [
    HeroBlockComponent,
    TextBlockComponent,
    CardBlockComponent,
    ButtonBlockComponent,
    VideoBlockComponent
  ],
  templateUrl: "./dynamic-screen-renderer.component.html",
  styleUrl: "./dynamic-screen-renderer.component.css"
})
export class DynamicScreenRendererComponent {
  @Input({ required: true }) blocks: DynamicBlock[] = [];

  asHeroProps(block: DynamicBlock): HeroBlock["props"] {
    return block.props as HeroBlock["props"];
  }

  asTextProps(block: DynamicBlock): TextBlock["props"] {
    return block.props as TextBlock["props"];
  }

  asCardProps(block: DynamicBlock): CardBlock["props"] {
    return block.props as CardBlock["props"];
  }

  asButtonProps(block: DynamicBlock): ButtonBlock["props"] {
    return block.props as ButtonBlock["props"];
  }

  asVideoProps(block: DynamicBlock): VideoBlock["props"] {
    return block.props as VideoBlock["props"];
  }
}
