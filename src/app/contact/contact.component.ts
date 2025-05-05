import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../shared/types/Message';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private firestore = inject(Firestore);
  private messagesCollection = collection(this.firestore, 'messages');

  contact: Message = {
    name: '',
    email: '',
    message: '',
  };
  submitted = false;

  onSubmit() {
    // Save the message to Firestore
    const messageDoc = {
      name: this.contact.name,
      email: this.contact.email,
      message: this.contact.message,
      timestamp: new Date(),
    };

    addDoc(this.messagesCollection, messageDoc)
      .then(() => {
        alert('Message sent successfully');
        this.submitted = true;
      })
      .catch((error) => {
        alert(`Error sending message: ${error}`);
      });

    // Reset the form
    this.contact = {
      name: '',
      email: '',
      message: '',
    };
  }
}
