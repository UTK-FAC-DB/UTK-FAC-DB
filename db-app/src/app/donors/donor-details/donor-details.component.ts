import { Component, Input } from '@angular/core';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
export class DonorDetailsComponent {
  @Input()
  donor: Donor;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private donorService: DonorService) { }

  createDonor(donor: Donor) {
    this.donorService.createDonor(donor).then((newDonor: Donor) => {
      this.createHandler(newDonor);
    })
  }

  updateDonor(donor: Donor): void {
    this.donorService.updateDonor(donor).then((updatedDonor: Donor) => {
      this.updateHandler(updatedDonor);
    })
  }

  deleteDonor(donorId: String): void {
    this.donorService.deleteDonor(donorId).then((deletedDonorId: string) => {
      this.deleteHandler(deletedDonorId);
    })
  }
}
