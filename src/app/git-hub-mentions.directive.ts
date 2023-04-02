import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGitHubMentions]'
})
export class GitHubMentionsDirective {

  // Match @mention (GitHub handle)
  // Valid handle rules: (based on GitHub signup form)
  // - may only contain alphanumeric characters or hyphens
  // - hyphens are surrounded by alphanumeric characters
  // - length is between 1 and 39 characters
  // - case insensitive
  private readonly mentionRegex = /@(?!-)(?:[a-z\d]|-(?!-)){1,39}(?<!-)(?![a-z\d-])/i;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  @Input()
  // Convert @mentions to GitHub links
  set appGitHubMentions(text: string) {
    let match;
    const nativeElement = this.elementRef.nativeElement;

    // Remove inner HTML
    this.renderer.selectRootElement(nativeElement, false);

    while (match = this.mentionRegex.exec(text)) {
      const mention = match[0];

      // Append text before mention if not empty
      if (match.index) {
        const textNode = this.renderer.createText(text.substring(0, match.index));
        this.renderer.appendChild(nativeElement, textNode);
      }

      // Append link created from mention
      const link = this.renderer.createElement('a');
      this.renderer.setAttribute(link, 'href', `https://github.com/${mention.substring(1)}`);
      this.renderer.setAttribute(link, 'target', '_blank');
      this.renderer.appendChild(link, this.renderer.createText(mention));
      this.renderer.appendChild(nativeElement, link);

      // Update text to continue searching for mentions
      text = text.substring(match.index + mention.length);
    }
    // Append remaining text if not empty
    if (text) {
      const textNode = this.renderer.createText(text);
      this.renderer.appendChild(nativeElement, textNode);
    }
  }
}
