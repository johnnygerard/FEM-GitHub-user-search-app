import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-attribution',
  templateUrl: './attribution.component.html',
  styleUrls: ['./attribution.component.scss']
})
export class AttributionComponent implements AfterViewInit {
  protected hidden = true;

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    this.dialog.nativeElement.close();
    setTimeout(() => {
      this.hidden = false;
      this.dialog.nativeElement.showModal();
    }, 500);
  }

  protected onClick(event: MouseEvent): void {
    if (event.target === event.currentTarget)
      this.dialog.nativeElement.close();
  }
}
