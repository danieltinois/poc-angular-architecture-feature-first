import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { VideoBlock } from "@poc/shared-schema";

@Component({
  selector: "poc-video-block",
  standalone: true,
  template: `
    <section class="video-block">
      <iframe
        [src]="embedUrl"
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      @if (props.content) {
        <p>{{ props.content }}</p>
      }
    </section>
  `,
  styles: [
    `
      .video-block {
        display: grid;
        gap: var(--spacing-sm);
      }

      iframe {
        width: 100%;
        aspect-ratio: 16 / 9;
        border: 0;
        border-radius: var(--radius-md);
      }

      p {
        margin: 0;
        color: var(--color-muted);
        line-height: 1.5;
      }
    `
  ]
})
export class VideoBlockComponent {
  @Input({ required: true }) props!: VideoBlock["props"];

  constructor(private sanitizer: DomSanitizer) {}

  get embedUrl(): SafeResourceUrl {
    const videoId = this.getYoutubeVideoId(this.props.videoUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : this.props.videoUrl;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private getYoutubeVideoId(rawUrl: string): string | null {
    try {
      const url = new URL(rawUrl);

      if (url.hostname.includes("youtu.be")) {
        return url.pathname.replace("/", "") || null;
      }

      if (url.pathname.includes("/shorts/")) {
        return url.pathname.split("/shorts/")[1]?.split("/")[0] ?? null;
      }

      if (url.pathname.includes("/embed/")) {
        return url.pathname.split("/embed/")[1]?.split("/")[0] ?? null;
      }

      return url.searchParams.get("v");
    } catch {
      return null;
    }
  }
}
