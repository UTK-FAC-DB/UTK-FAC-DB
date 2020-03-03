import { Injectable } from '@angular/core';
import { Donor } from './donor';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private donorsUrl = '/api/donors';
  private donorsUpdated = new Subject<Donor[]>();
  private donors: Donor[] = [];
  private donor: Donor;

  constructor(private http: HttpClient, private router: Router) {}

  // get("/api/donors")
  getDonors() {
    this.http.get<{donors: any}>(this.donorsUrl)
      .pipe(map((donorData) => {
        return donorData.donors.map(donor => {
          return {
            id: donor._id,
            lastName: donor.lastName,
            firstName: donor.firstName,
            middleName: donor.middleName,
            suffixName: donor.suffixName,
            maidenName: donor.maidenName,
            selectedOther: donor.selectedOther,
            selectedSex: donor.selectedSex,
            selectedRace: donor.selectedRace,
            birthDate: donor.birthDate,
            cityBirth: donor.cityBirth,
            stateBirth: donor.stateBirth,
            countryBirth: donor.countryBirth,
            donationDate: donor.donationDate,
            livingResearch: donor.livingResearch,
            traumaResearch: donor.traumaResearch,
            motherLast: donor.motherLast,
            motherFirst: donor.motherFirst,
            motherMiddle: donor.motherMiddle,
            motherSuffix: donor.motherSuffix,
            motherMaiden: donor.motherMaiden,
            fatherLast: donor.fatherLast,
            fatherFirst: donor.fatherFirst,
            fatherMiddle: donor.fatherMiddle,
            fatherSuffix: donor.fatherSuffix,
            email: donor.email,
            phone: donor.phone,
            phoneType: donor.phoneType,
            streetAddress: donor.streetAddress,
            cityAddress: donor.cityAddress,
            stateAddress: donor.stateAddress,
            zipAddress: donor.zipAddress,
            countryAddress: donor.countryAddress,
            heightFeet: donor.heightFeet,
            heightInch: donor.heightInch,
            estimateHeight: donor.estimateHeight,
            weight: donor.weight,
            estimateWeight: donor.estimateWeight,
            handedness: donor.handedness,
            shoesize: donor.shoesize,
            bloodtype: donor.bloodtype,
            hairColor: donor.hairColor,
            maritalstatus: donor.maritalstatus,
            spouseLast: donor.spouseLast,
            spouseFirst: donor.spouseFirst,
            spouseMiddle: donor.spouseMiddle,
            spouseSuffix: donor.spouseSuffix,
            spouseMaiden: donor.spouseMaiden,
            livingSpouse: donor.livingSpouse,
            spouseDonor: donor.spouseDonor,
            childrenNumber: donor.childrenNumber,
            education: donor.education,
            military: donor.military,
            ecoClass: donor.ecoClass,
            occupation: donor.occupation,
            business: donor.business,
            extDentalWork: donor.extDentalWork,
            lowerDenture: donor.lowerDenture,
            upperDenture: donor.upperDenture,
            partialPlate: donor.partialPlate,
            braces: donor.braces,
            mostTeeth: donor.mostTeeth,
            gumDisease: donor.gumDisease,
            habits: donor.habits
          };
        });
      }))
      .subscribe(transformedDonors => {
        this.donors = transformedDonors;
        this.donorsUpdated.next([...this.donors]);
      });
  }

  getDonorUpdateListener() {
    return this.donorsUpdated.asObservable();
  }

  // post("/api/donors")
  createDonor(newDonor: Donor){
    this.http.post(this.donorsUrl, newDonor)
    .subscribe(responseData => {
      const id = responseData.toString();
      newDonor.id = id;
      this.donors.push(newDonor);
      this.donorsUpdated.next([...this.donors]);
      this.router.navigate(["/donor-table"]);
    });
  } 

  // get("/api/donors/:id")
  getDonor(id: string) {
    return { ...this.donors.find(d => d.id === id)};
  }

  // delete("/api/donors/:id")
  deleteDonor(donors: Donor[]) {
    for (let i = 0; i < donors.length; i++) {
      console.log(donors[i].id);
      this.http.delete(this.donorsUrl + '/' + donors[i].id)
      .subscribe(() => {
        const updatedDonors = this.donors.filter(donor => donor.id !== donors[i].id);
        this.donors = updatedDonors;
        this.donorsUpdated.next([...this.donors]);
      });
    }
  }

  // put("/api/donors/:id")
  updateDonor(id: string, donor: Donor) {
    console.log(id);
    this.http.put(this.donorsUrl + '/' + id, donor)
      .subscribe(response => {
        const updatedDonors = [...this.donors];
        const oldDonorIndex = updatedDonors.findIndex(d => d.id === donor.id);
        updatedDonors[oldDonorIndex] = donor;
        this.donors = updatedDonors;
        this.donorsUpdated.next([...this.donors]);
        this.router.navigate(["/donor-table"]);
      })
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
