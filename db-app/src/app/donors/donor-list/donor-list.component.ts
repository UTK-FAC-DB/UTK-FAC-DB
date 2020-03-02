import { Component, OnInit } from '@angular/core';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';
import { DonorDetailsComponent } from '../donor-details/donor-details.component';

@Component({
  selector: 'donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css'],
  providers: [DonorService]
})

export class DonorListComponent implements OnInit {

  donors: Donor[];
  selectedDonor: Donor;

  constructor(private donorService: DonorService) { }

  ngOnInit() {
     this.donorService
      .getDonors()
      .then((donors: Donor[]) => {
        this.donors = donors.map((donor) => {
          return donor;
        });
      });
  }

  private getIndexOfDonor = (donorId: String) => {
    return this.donors.findIndex((donor) => {
      return donor._id === donorId;
    });
  }

  selectDonor(donor: Donor) {
    this.selectedDonor = donor;
  }

  createNewDonor() {
    var donor: Donor = {
      firstName: '',
      lastName: ''
    };

    // By default, a newly-created contact will have the selected state.
    this.selectDonor(donor);
  }

  deleteDonor = (donorId: String) => {
    var idx = this.getIndexOfDonor(donorId);
    if (idx !== -1) {
      this.donors.splice(idx, 1);
      this.selectDonor(null);
    }
    return this.donors;
  }

  addDonor = (donor: Donor) => {
    this.donors.push(donor);
    this.selectDonor(donor);
    return this.donors;
  }

  updateDonor = (donor: Donor) => {
    var idx = this.getIndexOfDonor(donor._id);
    if (idx !== -1) {
      this.donors[idx] = donor;
      this.selectDonor(donor);
    }
    return this.donors;
  }
}
