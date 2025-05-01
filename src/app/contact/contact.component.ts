import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgIf],
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
