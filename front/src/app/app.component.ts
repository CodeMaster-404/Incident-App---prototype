import { LoadingSpinnerService } from './core/services/loading-spinner.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Incident Application';

  loading = true;

  constructor(
    private loadingService: LoadingSpinnerService
  ) {
    this.loadingService.Main.subscribe(loading => {
      this.loading = loading;
    });
  }

}
