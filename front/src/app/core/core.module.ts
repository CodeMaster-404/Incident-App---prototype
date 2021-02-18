import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeaderProfileMenuComponent } from './components/header-profile-menu/header-profile-menu.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
// import { TranslateModule } from '@ngx-translate/core';

// import { RouteReusableStrategy } from './route-reusable-strategy';
// import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
// import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';


@NgModule({
  declarations: [ HeaderComponent,
    HeaderProfileMenuComponent,
    SideNavComponent,
    ConfirmEmailComponent],
  imports: [
    CommonModule,
    // HttpClientModule,
    // TranslateModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    HeaderProfileMenuComponent,
    SideNavComponent
  ]
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: ApiPrefixInterceptor,
//       multi: true
//     },
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: ErrorHandlerInterceptor,
//       multi: true
//     },
//     {
//       provide: RouteReuseStrategy,
//       useClass: RouteReusableStrategy
//     }
//   ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
