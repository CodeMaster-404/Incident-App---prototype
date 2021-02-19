import { IncidentUpdateComponent } from './incident-update/incident-update.component';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IncidentRoutingModule } from './incident-routing/incident-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { MaterialModule } from '../../material/material.module';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [IncidentListComponent, IncidentDetailsComponent, IncidentUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MaterialModule,
    IncidentRoutingModule
  ]
})
export class IncidentModule { }
