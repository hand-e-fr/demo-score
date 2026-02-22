import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// In a real application you would import the custom element definition:
// import '@hand-e/demo-score';

@Component({
    selector: 'app-root',
    standalone: true,
    // CUSTOM_ELEMENTS_SCHEMA is required in Angular to use Custom Elements / Web Components !!!
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `
    <div style="padding: 20px; font-family: system-ui, sans-serif;">
      <h1>Angular Application with DEMO-SCORE</h1>
      <p>You can bind inputs just like any other Angular component.</p>
      
      <div style="display: flex; gap: 20px; margin-top: 20px;">
        <!-- In Angular, bind generic attributes with [attr.attributename] -->
        <demo-score [attr.level]="dynamicLevel" version="v1.1.0" lang="en"></demo-score>
        <demo-score level="M" version="v2.0.0" lang="fr"></demo-score>
      </div>

      <button (click)="promote()" style="margin-top:20px; padding: 8px 16px;">
        Promote Level
      </button>
    </div>
  `
})
export class AppComponent {
    dynamicLevel = 'D';

    promote() {
        this.dynamicLevel = 'E'; // Example logic: bump status
    }
}
