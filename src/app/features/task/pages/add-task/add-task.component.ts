import { Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextarea } from 'primeng/inputtextarea';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-add-task',
    imports: [
        InputText,
        DropdownModule,
        InputTextarea,
        Select,
        DatePicker,
        Button,
        Textarea
    ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

}
