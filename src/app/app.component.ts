import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { DateModalComponent } from './date-modal/date-modal.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FullCalendarModule, NgbModalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private modalService: NgbModal) { }
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false,
    selectable: true,
    //droppable: true,
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    // dateClick: function(info) {
    //   alert('Clicked on: ' + info.dateStr);
    //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    //   alert('Current view: ' + info.view.type);
    //   // change the day's background color just for fun
    //   info.dayEl.style.backgroundColor = 'red';

    // },
    events: [
      {
        title: 'Bay 1',
        start: '2024-08-29T14:00:00', // Start time: 2 PM
        end: '2024-08-29T16:00:00',
      },
      {
        title: 'Bay 2',
        start: '2024-08-29T14:00:00', // Start time: 2 PM
        end: '2024-08-29T16:00:00',
      },
      
    ],

    // eventDidMount: function (info) {
    //   console.log(info.event.extendedProps);
    //   // {description: "Lecture", department: "BioChemistry"}
    // },
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  handleDateClick(arg: DateClickArg) {
    this.openModal(arg.dateStr, null);
  }

   handleEventClick(arg: EventClickArg) {
    const eventData = {
      title: arg.event.title,
      start: arg.event.startStr,
      end: arg.event.endStr,
    };
    this.openModal(eventData.start, eventData);
  }

  openModal(date: string, event: any): void {
    const modalRef = this.modalService.open(DateModalComponent);
    modalRef.componentInstance.date = date;
    modalRef.componentInstance.event = event;
  }


}
