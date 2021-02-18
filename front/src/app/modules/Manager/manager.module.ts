import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../Manager/material/material.module';

import { HeaderComponent } from '../Manager/layout/header/header.component';
import { SideNavComponent } from '../Manager/layout/side-nav/side-nav.component';
import { HomeComponent } from '../Manager/Sections/home/home.component';
import { RoutingModule } from '../Manager/routing/routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReportModule } from '../Manager/Sections/report/report.module';
import { IncidentModule } from '../Manager/Sections/incident/incident.module';
import { TaskModule } from '../Manager/Sections/task/task.module';
import { UserModule } from '../Manager/Sections/user/user.module';
import { StatusModule } from '../Manager/Sections/status/status.module';
import { MatTableModule } from '@angular/material/table';
import { NotFoundComponent } from '../Manager/error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '../Manager/error-pages/server-error/server-error.component';
import { ErrorDialogComponent } from '../Manager/shared/dialogs/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../Manager/shared/dialogs/success-dialog/success-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    // AppComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,

  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    HttpClientModule,
    ReportModule,
    IncidentModule,
    FlexLayoutModule,
    TaskModule,
    UserModule,
    StatusModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  exports: [
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class ManagerModule { }
