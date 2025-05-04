import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: '',
  };
  submitted = false;

  onSubmit() {
    console.log('Form submitted:', this.contact);
    this.submitted = true;
    this.contact = { name: '', email: '', message: '' };
  }
}
