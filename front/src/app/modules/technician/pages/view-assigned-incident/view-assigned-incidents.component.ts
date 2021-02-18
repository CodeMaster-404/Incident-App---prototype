import { Incident_Status } from './../../../../core/models/incident.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Incident } from 'src/app/core/models/incident.model';
import { AcceptDialogDataResult, AcceptRejectDialogComponent } from '../../components/accept-reject-dialog/accept-reject-dialog.component';
import { IncidentService } from '../../services/incident.service';

@Component({
  templateUrl: './view-assigned-incidents.component.html',
  styleUrls: ['./view-assigned-incidents.component.css']
})
export class ViewAssignedIncidentsComponent implements OnInit {

  displayedColumns: string[] = ['Incident ID', 'Location', 'Description', 'Date Logged', 'Status', 'User', 'Actions'];
  dataSourceOpen: Incident[] = [];
  dataSourceClosed: Incident[] = [];

  constructor(
    public dialog: MatDialog,
    private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.incidentService.getIncidents().subscribe( response => {
      console.log('View assigned: sub');
      console.log(response);
      const open: Incident[] = [];
      const closed: Incident[] = [];
      response.payload.data.forEach(element => {
        if (element.incident_Status_ID === Incident_Status.Assigned || element.incident_Status_ID === Incident_Status.Accepted) {
          open.push(element);
        } else if (element.incident_Status_ID === Incident_Status.Closed) {
          closed.push(element);
        }
      });
      this.dataSourceOpen = open;
      this.dataSourceClosed = closed;
    });
  }

  refresh(): void {
    this.incidentService.getIncidents().subscribe( response => {
      const open: Incident[] = [];
      const closed: Incident[] = [];
      response.payload.data.forEach(element => {
        if (element.incident_Status_ID === Incident_Status.Assigned || element.incident_Status_ID === Incident_Status.Accepted) {
          open.push(element);
        } else if (element.incident_Status_ID === Incident_Status.Closed) {
          closed.push(element);
        }
      });
      this.dataSourceOpen = open;
      this.dataSourceClosed = closed;
    });
  }

  acceptRejectIncident(incident: Incident, acceptReject: boolean): void {
    const dialogRef = this.dialog.open(AcceptRejectDialogComponent, {
      width: '500px',
      data: {acceptReject, incident}
    });

    dialogRef.afterClosed().subscribe((result: AcceptDialogDataResult) => {

      if (result != null) {
        if (result.acceptReject) {
          this.incidentService.acceptRejectIncident(incident, true, 'null').subscribe(
            observer => {
              console.log(observer);
              this.refresh();
            }
          );

        } else {
          this.incidentService.acceptRejectIncident(incident, false, result.reason).subscribe(
            observer => {
              console.log(observer);
              this.refresh();
            }
          );

        }
      }
    });
  }

  closeIncident(incident: Incident): void {
    this.incidentService.closeIncident(incident).subscribe(
      observer => {
        console.log(observer);
        this.refresh();
      }
    );
  }

}
