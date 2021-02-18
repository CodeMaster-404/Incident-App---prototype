import { RoutingModule } from './modules/Manager/routing/routing.module';
import { ManagerModule } from './modules/Manager/manager.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './modules/auth/services/auth.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { ConfirmEmailComponent } from './core/pages/confirm-email/confirm-email.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { RegConfirmDialogComponent } from './modules/auth/pages/reg-confirm-dialog/reg-confirm-dialog.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ManagerModule,
    RoutingModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  entryComponents: [
    RegConfirmDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      deps: [ AuthService, LocalStorageService, Router ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
