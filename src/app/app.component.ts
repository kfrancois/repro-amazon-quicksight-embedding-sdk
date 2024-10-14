import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="showContainer.set(true)">Show container</button>
    <button (click)="showContainer.set(false)">Hide container</button>

    @if(showContainer()){
    <div>
      <div #quicksightContainer></div>
    </div>
    }
  `,
})
export class AppComponent {
  showContainer = signal(true);

  quicksightContainer = viewChild('quicksightContainer', { read: ElementRef });

  ngAfterViewInit() {
    const quicksightContainer = this.quicksightContainer()?.nativeElement;

    if (quicksightContainer) {
      createEmbeddingContext().then((embeddingContext) => {
        embeddingContext.embedQSearchBar({
          container: quicksightContainer,
          url: 'add-your-url-here',
        });
      });
    }
  }
}
