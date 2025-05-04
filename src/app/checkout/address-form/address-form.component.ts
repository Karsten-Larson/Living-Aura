import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address } from '../../shared/types/Address';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent {
  @Input() address!: Address;
}
