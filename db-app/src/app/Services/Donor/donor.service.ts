import { Injectable } from '@angular/core';
import { Donor } from 'src/app/Exports/donor';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private donorsUpdated = new Subject<Donor[]>();
  private donors: Donor[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router,
    private globals: Globals,
    ) {}

  // get("/api/donors")
  getDonors() {
    this.http.get<{donors: any}>(this.globals.URL + '/api/donors')
      .pipe(map((donorData) => {
        return donorData.donors.map(donor => {
          return {
            id: donor._id,
            flag: donor.flag,
            signDate: donor.signDate,
            enterDate: donor.enterDate,
            lastName: donor.lastName,
            firstName: donor.firstName,
            middleName: donor.middleName,
            selectedSex: donor.selectedSex,
            maidenName: donor.maidenName,
            alternativeName: donor.alternativeName,
            suffix: donor.suffix,
            socialSecurity: donor.socialSecurity,
            selectedRace: donor.selectedRace,
            otherRace: donor.otherRace,
            birthDate: donor.birthDate,
            ageControl: donor.ageControl,
            cityBirth: donor.cityBirth,
            stateBirth: donor.stateBirth,
            homeAddress: donor.homeAddress,
            cityAddress: donor.cityAddress,
            countyAddress: donor.countyAddress,
            stateAddress: donor.stateAddress,
            zipAddress: donor.zipAddress,
            phoneNumber: donor.phoneNumber,
            emailAddress: donor.emailAddress,
            cityLimits: donor.cityLimits,
            badAddress: donor.badAddress,
            motherLast: donor.motherLast,
            motherFirst: donor.motherFirst,
            motherMiddle: donor.motherMiddle,
            motherMaiden: donor.motherMaiden,
            cityMother: donor.cityMother,
            stateMother: donor.stateMother,
            fatherLast: donor.fatherLast,
            fatherFirst: donor.fatherFirst,
            fatherMiddle: donor.fatherMiddle,
            cityFather: donor.cityFather,
            stateFather: donor.stateFather,
            heightControl: donor.heightControl,
            weightControl: donor.weightControl,
            weightUnit: donor.weightUnit,
            weightNote: donor.weightNote,
            weightLoss: donor.weightLoss,
            handednessControl: donor.handednessControl,
            shoeSize: donor.shoeSize,
            bloodType: donor.bloodType,
            hairColor: donor.hairColor,
            maritalStatus: donor.maritalStatus,
            spouseLast: donor.spouseLast,
            spouseFirst: donor.spouseFirst,
            spouseMiddle: donor.spouseMiddle,
            spouseCondition: donor.spouseCondition,
            childrenNumber: donor.childrenNumber,
            educationLevel: donor.educationLevel,
            militaryService: donor.militaryService,
            military: donor.military,
            socioEconomicStatus: donor.socioEconomicStatus,
            occupationControl: donor.occupationControl,
            industryControl: donor.industryControl,
            childhoodResidentialHistory: donor.childhoodResidentialHistory,
            adultResidentialHistory: donor.adultResidentialHistory,
            extensiveDentalWork: donor.extensiveDentalWork,
            mostTeeth: donor.mostTeeth,
            teethMissing: donor.teethMissing,
            teethMissingAmount: donor.teethMissingAmount,
            lowerDenture: donor.lowerDenture,
            lowerDentureDate: donor.lowerDentureDate,
            upperDenture: donor.upperDenture,
            upperDentureDate: donor.upperDentureDate,
            bothDenture: donor.bothDenture,
            bothDentureDate: donor.bothDentureDate,
            partialPlate: donor.partialPlate,
            bracesControl: donor.bracesControl,
            bridgeControl: donor.bridgeControl,
            gumDisease: donor.gumDisease,
            dentalDisease: donor.dentalDisease,
            otherDentalControl: donor.otherDentalControl,
            otherDental: donor.otherDental,
            surgeryMedical: donor.surgeryMedical,
            surgeryTypes: donor.surgeryTypes,
            plasticSurgeryMedical: donor.plasticSurgeryMedical,
            plasticSurgeryTypes: donor.plasticSurgeryTypes,
            fracturesMedical: donor.fracturesMedical,
            fracturesTypes: donor.fracturesTypes,
            cancerMedical: donor.cancerMedical,
            cancerTypes: donor.cancerTypes,
            cancerTreatment: donor.cancerTreatment,
            cancerLength: donor.cancerLength,
            autoAccident: donor.autoAccident,
            smokerControl: donor.smokerControl,
            smokerLength: donor.smokerLength,
            smokerStart: donor.smokerStart,
            spinalInjury: donor.spinalInjury,
            dislocationsMedical: donor.dislocationsMedical,
            alcoholControl: donor.alcoholControl,
            openHeartSurgery: donor.openHeartSurgery,
            openHeartSurgeryYear: donor.openHeartSurgeryYear,
            amputationsYear: donor.amputationsYear,
            amputations: donor.amputations,
            diabetesControl: donor.diabetesControl,
            diabetesType: donor.diabetesType,
            prostheticsControl: donor.prostheticsControl,
            prostheticsDate: donor.prostheticsDate,
            disordersMedical: donor.disordersMedical,
            medicalContinued: donor.medicalContinued,
            additionalMedicalHistory: donor.additionalMedicalHistory,
            medicalHistoryNarrative: donor.medicalHistoryNarrative,
            habitualActivities: donor.habitualActivities,
            eyeColor: donor.eyeColor,
            otherEyeColor: donor.otherEyeColor,
            biometrics: donor.biometrics,
            biometricsNumber: donor.biometricsNumber,
            bioDate: donor.bioDate,
            dentalComments: donor.dentalComments,
            fOrD: donor.fOrD,
            policy: donor.policy,
            webOrPaper: donor.webOrPaper,
            changecodeRegister: donor.changecodeRegister,
            livingResearchOk: donor.livingResearchOk,
            closeFile: donor.closeFile,
            pictures: donor.pictures,
            other: donor.other,
            traumaResearchOk: donor.traumaResearchOk,
            medicalHistory: donor.medicalHistory,
            traumaType: donor.traumaType,
            cancerRx: donor.cancerRx,
            comments: donor.comments,
            tattooControl: donor.tattooControl,
            tattooDescription: donor.tattooDescription,
            tattooLocation: donor.tattooLocation,
            piercingControl: donor.piercingControl,
            piercingDescription: donor.piercingDescription,
            piercingLocation: donor.piercingLocation,
            nextKinName: donor.nextKinName,
            nextKinRelationship: donor.nextKinRelationship,
            nextKinAddress: donor.nextKinAddress,
            nextKinPhoneNumber: donor.nextKinPhoneNumber,
            nextKinCity: donor.nextKinCity,
            nextKinState: donor.nextKinState,
            nextKinZip: donor.nextKinZip,
            nextKinEmail: donor.nextKinEmail,
            informantName: donor.informantName,
            informantRelationship: donor.informantRelationship,
            informantAddress: donor.informantAddress,
            informantPhoneNumber: donor.informantPhoneNumber,
            informantCity: donor.informantCity,
            informantState: donor.informantState,
            informantZip: donor.informantZip,
            informantEmail: donor.informantEmail,
            deathDate: donor.deathDate,
            deathInstitution: donor.deathInstitution,
            deathAddress: donor.deathAddress,
            deathCity: donor.deathCity,
            deathCounty: donor.deathCounty,
            deathState: donor.deathState,
            deathZip: donor.deathZip,
            deathTime: donor.deathTime
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
    this.http.post(this.globals.URL + '/api/donors', newDonor)
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
      this.http.delete(this.globals.URL + '/api/donors' + '/' + donors[i].id)
      .subscribe(() => {
        const updatedDonors = this.donors.filter(donor => donor.id !== donors[i].id);
        this.donors = updatedDonors;
        this.donorsUpdated.next([...this.donors]);
      });
    }
  }
  
  deleteSingleDonor(id: string) {
    this.http.delete(this.globals.URL + '/api/donors' + '/' + id)
    .subscribe(() => {
      const updatedDonors = this.donors.filter(donor => donor.id !== id);
      this.donors = updatedDonors;
      this.donorsUpdated.next([...this.donors]);
    })
  }

  // put("/api/donors/:id")
  updateDonor(id: string, donor: Donor) {
    console.log(id);
    this.http.put(this.globals.URL + '/api/donors' + '/' + id, donor)
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
