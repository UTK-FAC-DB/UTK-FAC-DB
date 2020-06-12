import { Component, OnInit } from '@angular/core';
import { Donor } from 'src/app/Exports/donor';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DonorService } from '../../../Services/Donor/donor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

export interface viewString {
  value: string;
  viewValue: string;
}

export interface viewNumber {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-donor-registration',
  templateUrl: './donor-registration.component.html',
  styleUrls: ['./donor-registration.component.css']
})
export class DonorRegistrationComponent implements OnInit {
  public registerForm : FormGroup;
  private mode = 'create';
  private donorId: string;
  donor: Donor;
  _dataStream = new BehaviorSubject<Donor[]>([]);
  public get data(): Donor[] { return this._dataStream.value; }
  public set data(v: Donor[]) { this._dataStream.next(v); }

  constructor(public donorService: DonorService, private formBuilder: FormBuilder, public route: ActivatedRoute) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      lastName: new FormControl(''),
      firstName: new FormControl(''),
      middleName: new FormControl(''),
      selectedSex: new FormControl(''),
      socialSecurity: new FormControl(''),
      selectedRace: new FormControl(''),
      otherRace: new FormControl(''),
      birthDate: new FormControl(''),
      ageControl: new FormControl(''),
      cityBirth: new FormControl(''),
      stateBirth: new FormControl(''),
      homeAddress: new FormControl(''),
      cityAddress: new FormControl(''),
      countyAddress: new FormControl(''),
      stateAddress: new FormControl(''),
      zipAddress: new FormControl(''),
      phoneNumber: new FormControl(''),
      cityLimits: new FormControl(''),
      motherLast: new FormControl(''),
      motherFirst: new FormControl(''),
      motherMiddle: new FormControl(''),
      motherMaiden: new FormControl(''),
      cityMother: new FormControl(''),
      stateMother: new FormControl(''),
      fatherLast: new FormControl(''),
      fatherFirst: new FormControl(''),
      fatherMiddle: new FormControl(''),
      cityFather: new FormControl(''),
      stateFather: new FormControl(''),
      heightControl: new FormControl(''),
      weightControl: new FormControl(''),
      weightLoss: new FormControl(''),
      handednessControl: new FormControl(''),
      shoeSize: new FormControl(''),
      bloodType: new FormControl(''),
      hairColor: new FormControl(''),
      maritalStatus: new FormControl(''),
      spouseLast: new FormControl(''),
      spouseFirst: new FormControl(''),
      spouseMiddle: new FormControl(''),
      spouseCondition: new FormControl(''),
      childrenNumber: new FormControl(''),
      educationLevel: new FormControl(''),
      militaryService: new FormControl(''),
      socioEconomicStatus: new FormControl(''),
      occupationControl: new FormControl(''),
      industryControl: new FormControl(''),
      childhoodResidentialHistory: new FormControl(''),
      adultResidentialHistory: new FormControl(''),
      extensiveDentalWork: new FormControl(''),
      mostTeeth: new FormControl(''),
      teethMissing: new FormControl(''),
      teethMissingAmount: new FormControl(''),
      lowerDenture: new FormControl(''),
      lowerDentureDate: new FormControl(''),
      upperDenture: new FormControl(''),
      upperDentureDate: new FormControl(''),
      bothDenture: new FormControl(''),
      bothDentureDate: new FormControl(''),
      partialPlate: new FormControl(''),
      bracesControl: new FormControl(''),
      bridgeControl: new FormControl(''),
      gumDisease: new FormControl(''),
      dentalDisease: new FormControl(''),
      otherDentalControl: new FormControl(''),
      otherDental: new FormControl(''),
      surgeryMedical: new FormControl(''),
      surgeryTypes: new FormControl(''),
      plasticSurgeryMedical: new FormControl(''),
      plasticSurgeryTypes: new FormControl(''),
      fracturesMedical: new FormControl(''),
      fracturesTypes: new FormControl(''),
      cancerMedical: new FormControl(''),
      cancerTypes: new FormControl(''),
      cancerTreatment: new FormControl(''),
      cancerLength: new FormControl(''),
      autoAccident: new FormControl(''),
      smokerControl: new FormControl(''),
      smokerLength: new FormControl(''),
      spinalInjury: new FormControl(''),
      alcoholControl: new FormControl(''),
      openHeartSurgery: new FormControl(''),
      amputations: new FormControl(''),
      diabetesControl: new FormControl(''),
      diabetesType: new FormControl(''),
      prostheticsControl: new FormControl(''),
      prostheticsDate: new FormControl(''),
      disordersMedical: new FormControl(''),
      medicalContinued: new FormControl(''),
      habitualActivities: new FormControl(''),
      eyeColor: new FormControl(''),
      otherEyeColor: new FormControl(''),
      tattooControl: new FormControl(''),
      tattooDescription: new FormControl(''),
      tattooLocation: new FormControl(''),
      piercingControl: new FormControl(''),
      piercingDescription: new FormControl(''),
      piercingLocation: new FormControl(''),
      nextKinName: new FormControl(''),
      nextKinRelationship: new FormControl(''),
      nextKinAddress: new FormControl(''),
      nextKinPhoneNumber: new FormControl(''),
      nextKinCity: new FormControl(''),
      nextKinState: new FormControl(''),
      nextKinZip: new FormControl(''),
      nextKinEmail: new FormControl(''),
      informantName: new FormControl(''),
      informantRelationship: new FormControl(''),
      informantAddress: new FormControl(''),
      informantPhoneNumber: new FormControl(''),
      informantCity: new FormControl(''),
      informantState: new FormControl(''),
      informantZip: new FormControl(''),
      informantEmail: new FormControl('')
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('donorId')) {
        this.mode = 'edit';
        this.donorId = paramMap.get('donorId');
        this.donor = this.donorService.getDonor(this.donorId);
        console.log(JSON.stringify(this.donor));
        this.registerForm.setValue({
          lastName: this.donor.lastName,
          firstName: this.donor.firstName,
          middleName: this.donor.middleName,
          selectedSex: this.donor.selectedSex,
          socialSecurity: this.donor.socialSecurity,
          selectedRace: this.donor.selectedRace,
          otherRace: this.donor.otherRace,
          birthDate: this.donor.birthDate,
          ageControl: this.donor.ageControl,
          cityBirth: this.donor.cityBirth,
          stateBirth: this.donor.stateBirth,
          homeAddress: this.donor.homeAddress,
          cityAddress: this.donor.cityAddress,
          countyAddress: this.donor.countyAddress,
          stateAddress: this.donor.stateAddress,
          zipAddress: this.donor.zipAddress,
          phoneNumber: this.donor.phoneNumber,
          cityLimits: this.donor.cityLimits,
          motherLast: this.donor.motherLast,
          motherFirst: this.donor.motherFirst,
          motherMiddle: this.donor.motherMiddle,
          motherMaiden: this.donor.motherMaiden,
          cityMother: this.donor.cityMother,
          stateMother: this.donor.stateMother,
          fatherLast: this.donor.fatherLast,
          fatherFirst: this.donor.fatherFirst,
          fatherMiddle: this.donor.fatherMiddle,
          cityFather: this.donor.cityFather,
          stateFather: this.donor.stateFather,
          heightControl: this.donor.heightControl,
          weightControl: this.donor.weightControl,
          weightLoss: this.donor.weightLoss,
          handednessControl: this.donor.handednessControl,
          shoeSize: this.donor.shoeSize,
          bloodType: this.donor.bloodType,
          hairColor: this.donor.hairColor,
          maritalStatus: this.donor.maritalStatus,
          spouseLast: this.donor.spouseLast,
          spouseFirst: this.donor.spouseFirst,
          spouseMiddle: this.donor.spouseMiddle,
          spouseCondition: this.donor.spouseCondition,
          childrenNumber: this.donor.childrenNumber,
          educationLevel: this.donor.educationLevel,
          militaryService: this.donor.militaryService,
          socioEconomicStatus: this.donor.socioEconomicStatus,
          occupationControl: this.donor.occupationControl,
          industryControl: this.donor.industryControl,
          childhoodResidentialHistory: this.donor.childhoodResidentialHistory,
          adultResidentialHistory: this.donor.adultResidentialHistory,
          extensiveDentalWork: this.donor.extensiveDentalWork,
          mostTeeth: this.donor.mostTeeth,
          teethMissing: this.donor.teethMissing,
          teethMissingAmount: this.donor.teethMissingAmount,
          lowerDenture: this.donor.lowerDenture,
          lowerDentureDate: this.donor.lowerDentureDate,
          upperDenture: this.donor.upperDenture,
          upperDentureDate: this.donor.upperDentureDate,
          bothDenture: this.donor.bothDenture,
          bothDentureDate: this.donor.bothDentureDate,
          partialPlate: this.donor.partialPlate,
          bracesControl: this.donor.bracesControl,
          bridgeControl: this.donor.bridgeControl,
          gumDisease: this.donor.gumDisease,
          dentalDisease: this.donor.dentalDisease,
          otherDentalControl: this.donor.otherDentalControl,
          otherDental: this.donor.otherDental,
          surgeryMedical: this.donor.surgeryMedical,
          surgeryTypes: this.donor.surgeryTypes,
          plasticSurgeryMedical: this.donor.plasticSurgeryMedical,
          plasticSurgeryTypes: this.donor.plasticSurgeryTypes,
          fracturesMedical: this.donor.fracturesMedical,
          fracturesTypes: this.donor.fracturesTypes,
          cancerMedical: this.donor.cancerMedical,
          cancerTypes: this.donor.cancerTypes,
          cancerTreatment: this.donor.cancerTreatment,
          cancerLength: this.donor.cancerLength,
          autoAccident: this.donor.autoAccident,
          smokerControl: this.donor.smokerControl,
          smokerLength: this.donor.smokerLength,
          spinalInjury: this.donor.spinalInjury,
          alcoholControl: this.donor.alcoholControl,
          openHeartSurgery: this.donor.openHeartSurgery,
          amputations: this.donor.amputations,
          diabetesControl: this.donor.diabetesControl,
          diabetesType: this.donor.diabetesType,
          prostheticsControl: this.donor.prostheticsControl,
          prostheticsDate: this.donor.prostheticsDate,
          disordersMedical: this.donor.disordersMedical,
          medicalContinued: this.donor.medicalContinued,
          habitualActivities: this.donor.habitualActivities,
          eyeColor: this.donor.eyeColor,
          otherEyeColor: this.donor.otherEyeColor,
          tattooControl: this.donor.tattooControl,
          tattooDescription: this.donor.tattooDescription,
          tattooLocation: this.donor.tattooLocation,
          piercingControl: this.donor.piercingControl,
          piercingDescription: this.donor.piercingDescription,
          piercingLocation: this.donor.piercingLocation,
          nextKinName: this.donor.nextKinName,
          nextKinRelationship: this.donor.nextKinRelationship,
          nextKinAddress: this.donor.nextKinAddress,
          nextKinPhoneNumber: this.donor.nextKinPhoneNumber,
          nextKinCity: this.donor.nextKinCity,
          nextKinState: this.donor.nextKinState,
          nextKinZip: this.donor.nextKinZip,
          nextKinEmail: this.donor.nextKinEmail,
          informantName: this.donor.informantName,
          informantRelationship: this.donor.informantRelationship,
          informantAddress: this.donor.informantAddress,
          informantPhoneNumber: this.donor.informantPhoneNumber,
          informantCity: this.donor.informantCity,
          informantState: this.donor.informantState,
          informantZip: this.donor.informantZip,
          informantEmail: this.donor.informantEmail
        })
      } else {
        this.mode = 'create';
        this.donorId = null;
      }
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
    if (this.mode === 'create') {
      this.donorService.createDonor({
        id: null,
        lastName: this.lastName.value,
        firstName: this.firstName.value,
        middleName: this.middleName.value,
        selectedSex: this.selectedSex.value,
        socialSecurity: this.socialSecurity.value,
        selectedRace: this.selectedRace.value,
        otherRace: this.otherRace.value,
        birthDate: this.birthDate.value,
        ageControl: this.ageControl.value,
        cityBirth: this.cityBirth.value,
        stateBirth: this.stateBirth.value,
        homeAddress: this.homeAddress.value,
        cityAddress: this.cityAddress.value,
        countyAddress: this.countyAddress.value,
        stateAddress: this.stateAddress.value,
        zipAddress: this.zipAddress.value,
        phoneNumber: this.phoneNumber.value,
        cityLimits: this.cityLimits.value,
        motherLast: this.motherLast.value,
        motherFirst: this.motherFirst.value,
        motherMiddle: this.motherMiddle.value,
        motherMaiden: this.motherMaiden.value,
        cityMother: this.cityMother.value,
        stateMother: this.stateMother.value,
        fatherLast: this.fatherLast.value,
        fatherFirst: this.fatherFirst.value,
        fatherMiddle: this.fatherMiddle.value,
        cityFather: this.cityFather.value,
        stateFather: this.stateFather.value,
        heightControl: this.heightControl.value,
        weightControl: this.weightControl.value,
        weightLoss: this.weightLoss.value,
        handednessControl: this.handednessControl.value,
        shoeSize: this.shoeSize.value,
        bloodType: this.bloodType.value,
        hairColor: this.hairColor.value,
        maritalStatus: this.maritalStatus.value,
        spouseLast: this.spouseLast.value,
        spouseFirst: this.spouseFirst.value,
        spouseMiddle: this.spouseMiddle.value,
        spouseCondition: this.spouseCondition.value,
        childrenNumber: this.childrenNumber.value,
        educationLevel: this.educationLevel.value,
        militaryService: this.militaryService.value,
        socioEconomicStatus: this.socioEconomicStatus.value,
        occupationControl: this.occupationControl.value,
        industryControl: this.industryControl.value,
        childhoodResidentialHistory: this.childhoodResidentialHistory.value,
        adultResidentialHistory: this.adultResidentialHistory.value,
        extensiveDentalWork: this.extensiveDentalWork.value,
        mostTeeth: this.mostTeeth.value,
        teethMissing: this.teethMissing.value,
        teethMissingAmount: this.teethMissingAmount.value,
        lowerDenture: this.lowerDenture.value,
        lowerDentureDate: this.lowerDentureDate.value,
        upperDenture: this.upperDenture.value,
        upperDentureDate: this.upperDentureDate.value,
        bothDenture: this.bothDenture.value,
        bothDentureDate: this.bothDentureDate.value,
        partialPlate: this.partialPlate.value,
        bracesControl: this.bracesControl.value,
        bridgeControl: this.bridgeControl.value,
        gumDisease: this.gumDisease.value,
        dentalDisease: this.dentalDisease.value,
        otherDentalControl: this.otherDentalControl.value,
        otherDental: this.otherDental.value,
        surgeryMedical: this.surgeryMedical.value,
        surgeryTypes: this.surgeryTypes.value,
        plasticSurgeryMedical: this.plasticSurgeryMedical.value,
        plasticSurgeryTypes: this.plasticSurgeryTypes.value,
        fracturesMedical: this.fracturesMedical.value,
        fracturesTypes: this.fracturesTypes.value,
        cancerMedical: this.cancerMedical.value,
        cancerTypes: this.cancerTypes.value,
        cancerTreatment: this.cancerTreatment.value,
        cancerLength: this.cancerLength.value,
        autoAccident: this.autoAccident.value,
        smokerControl: this.smokerControl.value,
        smokerLength: this.smokerLength.value,
        spinalInjury: this.spinalInjury.value,
        alcoholControl: this.alcoholControl.value,
        openHeartSurgery: this.openHeartSurgery.value,
        amputations: this.amputations.value,
        diabetesControl: this.diabetesControl.value,
        diabetesType: this.diabetesType.value,
        prostheticsControl: this.prostheticsControl.value,
        prostheticsDate: this.prostheticsDate.value,
        disordersMedical: this.disordersMedical.value,
        medicalContinued: this.medicalContinued.value,
        habitualActivities: this.habitualActivities.value,
        eyeColor: this.eyeColor.value,
        otherEyeColor: this.otherEyeColor.value,
        tattooControl: this.tattooControl.value,
        tattooDescription: this.tattooDescription.value,
        tattooLocation: this.tattooLocation.value,
        piercingControl: this.piercingControl.value,
        piercingDescription: this.piercingDescription.value,
        piercingLocation: this.piercingLocation.value,
        nextKinName: this.nextKinName.value,
        nextKinRelationship: this.nextKinRelationship.value,
        nextKinAddress: this.nextKinAddress.value,
        nextKinPhoneNumber: this.nextKinPhoneNumber.value,
        nextKinCity: this.nextKinCity.value,
        nextKinState: this.nextKinState.value,
        nextKinZip: this.nextKinZip.value,
        nextKinEmail: this.nextKinEmail.value,
        informantName: this.informantName.value,
        informantRelationship: this.informantRelationship.value,
        informantAddress: this.informantAddress.value,
        informantPhoneNumber: this.informantPhoneNumber.value,
        informantCity: this.informantCity.value,
        informantState: this.informantState.value,
        informantZip: this.informantZip.value,
        informantEmail: this.informantEmail.value
      })
    } else {
      this.donorService.updateDonor(this.donorId, {
        id: null,
        lastName: this.lastName.value,
        firstName: this.firstName.value,
        middleName: this.middleName.value,
        selectedSex: this.selectedSex.value,
        socialSecurity: this.socialSecurity.value,
        selectedRace: this.selectedRace.value,
        otherRace: this.otherRace.value,
        birthDate: this.birthDate.value,
        ageControl: this.ageControl.value,
        cityBirth: this.cityBirth.value,
        stateBirth: this.stateBirth.value,
        homeAddress: this.homeAddress.value,
        cityAddress: this.cityAddress.value,
        countyAddress: this.countyAddress.value,
        stateAddress: this.stateAddress.value,
        zipAddress: this.zipAddress.value,
        phoneNumber: this.phoneNumber.value,
        cityLimits: this.cityLimits.value,
        motherLast: this.motherLast.value,
        motherFirst: this.motherFirst.value,
        motherMiddle: this.motherMiddle.value,
        motherMaiden: this.motherMaiden.value,
        cityMother: this.cityMother.value,
        stateMother: this.stateMother.value,
        fatherLast: this.fatherLast.value,
        fatherFirst: this.fatherFirst.value,
        fatherMiddle: this.fatherMiddle.value,
        cityFather: this.cityFather.value,
        stateFather: this.stateFather.value,
        heightControl: this.heightControl.value,
        weightControl: this.weightControl.value,
        weightLoss: this.weightLoss.value,
        handednessControl: this.handednessControl.value,
        shoeSize: this.shoeSize.value,
        bloodType: this.bloodType.value,
        hairColor: this.hairColor.value,
        maritalStatus: this.maritalStatus.value,
        spouseLast: this.spouseLast.value,
        spouseFirst: this.spouseFirst.value,
        spouseMiddle: this.spouseMiddle.value,
        spouseCondition: this.spouseCondition.value,
        childrenNumber: this.childrenNumber.value,
        educationLevel: this.educationLevel.value,
        militaryService: this.militaryService.value,
        socioEconomicStatus: this.socioEconomicStatus.value,
        occupationControl: this.occupationControl.value,
        industryControl: this.industryControl.value,
        childhoodResidentialHistory: this.childhoodResidentialHistory.value,
        adultResidentialHistory: this.adultResidentialHistory.value,
        extensiveDentalWork: this.extensiveDentalWork.value,
        mostTeeth: this.mostTeeth.value,
        teethMissing: this.teethMissing.value,
        teethMissingAmount: this.teethMissingAmount.value,
        lowerDenture: this.lowerDenture.value,
        lowerDentureDate: this.lowerDentureDate.value,
        upperDenture: this.upperDenture.value,
        upperDentureDate: this.upperDentureDate.value,
        bothDenture: this.bothDenture.value,
        bothDentureDate: this.bothDentureDate.value,
        partialPlate: this.partialPlate.value,
        bracesControl: this.bracesControl.value,
        bridgeControl: this.bridgeControl.value,
        gumDisease: this.gumDisease.value,
        dentalDisease: this.dentalDisease.value,
        otherDentalControl: this.otherDentalControl.value,
        otherDental: this.otherDental.value,
        surgeryMedical: this.surgeryMedical.value,
        surgeryTypes: this.surgeryTypes.value,
        plasticSurgeryMedical: this.plasticSurgeryMedical.value,
        plasticSurgeryTypes: this.plasticSurgeryTypes.value,
        fracturesMedical: this.fracturesMedical.value,
        fracturesTypes: this.fracturesTypes.value,
        cancerMedical: this.cancerMedical.value,
        cancerTypes: this.cancerTypes.value,
        cancerTreatment: this.cancerTreatment.value,
        cancerLength: this.cancerLength.value,
        autoAccident: this.autoAccident.value,
        smokerControl: this.smokerControl.value,
        smokerLength: this.smokerLength.value,
        spinalInjury: this.spinalInjury.value,
        alcoholControl: this.alcoholControl.value,
        openHeartSurgery: this.openHeartSurgery.value,
        amputations: this.amputations.value,
        diabetesControl: this.diabetesControl.value,
        diabetesType: this.diabetesType.value,
        prostheticsControl: this.prostheticsControl.value,
        prostheticsDate: this.prostheticsDate.value,
        disordersMedical: this.disordersMedical.value,
        medicalContinued: this.medicalContinued.value,
        habitualActivities: this.habitualActivities.value,
        eyeColor: this.eyeColor.value,
        otherEyeColor: this.otherEyeColor.value,
        tattooControl: this.tattooControl.value,
        tattooDescription: this.tattooDescription.value,
        tattooLocation: this.tattooLocation.value,
        piercingControl: this.piercingControl.value,
        piercingDescription: this.piercingDescription.value,
        piercingLocation: this.piercingLocation.value,
        nextKinName: this.nextKinName.value,
        nextKinRelationship: this.nextKinRelationship.value,
        nextKinAddress: this.nextKinAddress.value,
        nextKinPhoneNumber: this.nextKinPhoneNumber.value,
        nextKinCity: this.nextKinCity.value,
        nextKinState: this.nextKinState.value,
        nextKinZip: this.nextKinZip.value,
        nextKinEmail: this.nextKinEmail.value,
        informantName: this.informantName.value,
        informantRelationship: this.informantRelationship.value,
        informantAddress: this.informantAddress.value,
        informantPhoneNumber: this.informantPhoneNumber.value,
        informantCity: this.informantCity.value,
        informantState: this.informantState.value,
        informantZip: this.informantZip.value,
        informantEmail: this.informantEmail.value
      });
    }
  }
  onAddField() {
    let newDiv = document.createElement('div');
    let newFormField = document.createElement('mat-form-field');
    let newInput = document.createElement('input');
    let att = document.createAttribute('matInput');
    newInput.setAttributeNode(att);
    newFormField.appendChild(newInput);
    newDiv.appendChild(newFormField);
    var currentDiv = document.getElementById('additionDiv');
    document.body.insertBefore(newDiv, currentDiv);
  }

  get form() { return this.registerForm; }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get middleName() { return this.registerForm.get('middleName'); }
  get selectedSex() { return this.registerForm.get('selectedSex'); }
  get socialSecurity() { return this.registerForm.get('socialSecurity'); }
  get selectedRace() { return this.registerForm.get('selectedRace'); }
  get otherRace() { return this.registerForm.get('otherRace'); }
  get birthDate() { return this.registerForm.get('birthDate'); }
  get ageControl() { return this.registerForm.get('ageControl'); }
  get cityBirth() { return this.registerForm.get('cityBirth'); }
  get stateBirth() { return this.registerForm.get('stateBirth'); }
  get homeAddress() { return this.registerForm.get('homeAddress'); }
  get cityAddress() { return this.registerForm.get('cityAddress'); }
  get countyAddress() { return this.registerForm.get('countyAddress'); }
  get stateAddress() { return this.registerForm.get('stateAddress'); }
  get zipAddress() { return this.registerForm.get('zipAddress'); }
  get phoneNumber() { return this.registerForm.get('phoneNumber'); }
  get cityLimits() { return this.registerForm.get('cityLimits'); }
  get motherLast() { return this.registerForm.get('motherLast'); }
  get motherFirst() { return this.registerForm.get('motherFirst'); }
  get motherMiddle() { return this.registerForm.get('motherMiddle'); }
  get motherMaiden() { return this.registerForm.get('motherMaiden'); }
  get cityMother() { return this.registerForm.get('cityMother'); }
  get stateMother() { return this.registerForm.get('stateMother'); }
  get fatherLast() { return this.registerForm.get('fatherLast'); }
  get fatherFirst() { return this.registerForm.get('fatherFirst'); }
  get fatherMiddle() { return this.registerForm.get('fatherMiddle'); }
  get cityFather() { return this.registerForm.get('cityFather'); }
  get stateFather() { return this.registerForm.get('stateFather'); }
  get heightControl() { return this.registerForm.get('heightControl'); }
  get weightControl() { return this.registerForm.get('weightControl'); }
  get weightLoss() { return this.registerForm.get('weightLoss'); }
  get handednessControl() { return this.registerForm.get('handednessControl'); }
  get shoeSize() { return this.registerForm.get('shoeSize'); }
  get bloodType() { return this.registerForm.get('bloodType'); }
  get hairColor() { return this.registerForm.get('hairColor'); }
  get maritalStatus() { return this.registerForm.get('maritalStatus'); }
  get spouseLast() { return this.registerForm.get('spouseLast'); }
  get spouseFirst() { return this.registerForm.get('spouseFirst'); }
  get spouseMiddle() { return this.registerForm.get('spouseMiddle'); }
  get spouseCondition() { return this.registerForm.get('spouseCondition'); }
  get childrenNumber() { return this.registerForm.get('childrenNumber'); }
  get educationLevel() { return this.registerForm.get('educationLevel'); }
  get militaryService() { return this.registerForm.get('militaryService'); }
  get socioEconomicStatus() { return this.registerForm.get('socioEconomicStatus'); }
  get occupationControl() { return this.registerForm.get('occupationControl'); }
  get industryControl() { return this.registerForm.get('industryControl'); }
  get childhoodResidentialHistory() { return this.registerForm.get('childhoodResidentialHistory'); }
  get adultResidentialHistory() { return this.registerForm.get('adultResidentialHistory'); }
  get extensiveDentalWork() { return this.registerForm.get('extensiveDentalWork'); }
  get mostTeeth() { return this.registerForm.get('mostTeeth'); }
  get teethMissing() { return this.registerForm.get('teethMissing'); }
  get teethMissingAmount() { return this.registerForm.get('teethMissingAmount'); }
  get lowerDenture() { return this.registerForm.get('lowerDenture'); }
  get lowerDentureDate() { return this.registerForm.get('lowerDentureDate'); }
  get upperDenture() { return this.registerForm.get('upperDenture'); }
  get upperDentureDate() { return this.registerForm.get('upperDentureDate'); }
  get bothDenture() { return this.registerForm.get('bothDenture'); }
  get bothDentureDate() { return this.registerForm.get('bothDentureDate'); }
  get partialPlate() { return this.registerForm.get('partialPlate'); }
  get bracesControl() { return this.registerForm.get('bracesControl'); }
  get bridgeControl() { return this.registerForm.get('bridgeControl'); }
  get gumDisease() { return this.registerForm.get('gumDisease'); }
  get dentalDisease() { return this.registerForm.get('dentalDisease'); }
  get otherDentalControl() { return this.registerForm.get('otherDentalControl'); }
  get otherDental() { return this.registerForm.get('otherDental'); }
  get surgeryMedical() { return this.registerForm.get('surgeryMedical'); }
  get surgeryTypes() { return this.registerForm.get('surgeryTypes'); }
  get plasticSurgeryMedical() { return this.registerForm.get('plasticSurgeryMedical'); }
  get plasticSurgeryTypes() { return this.registerForm.get('plasticSurgeryTypes'); }
  get fracturesMedical() { return this.registerForm.get('fracturesMedical'); }
  get fracturesTypes() { return this.registerForm.get('fracturesTypes'); }
  get cancerMedical() { return this.registerForm.get('cancerMedical'); }
  get cancerTypes() { return this.registerForm.get('cancerTypes'); }
  get cancerTreatment() { return this.registerForm.get('cancerTreatment'); }
  get cancerLength() { return this.registerForm.get('cancerLength'); }
  get autoAccident() { return this.registerForm.get('autoAccident'); }
  get smokerControl() { return this.registerForm.get('smokerControl'); }
  get smokerLength() { return this.registerForm.get('smokerLength'); }
  get spinalInjury() { return this.registerForm.get('spinalInjury'); }
  get alcoholControl() { return this.registerForm.get('alcoholControl'); }
  get openHeartSurgery() { return this.registerForm.get('openHeartSurgery'); }
  get amputations() { return this.registerForm.get('amputations'); }
  get diabetesControl() { return this.registerForm.get('diabetesControl'); }
  get diabetesType() { return this.registerForm.get('diabetesType'); }
  get prostheticsControl() { return this.registerForm.get('prostheticsControl'); }
  get prostheticsDate() { return this.registerForm.get('prostheticsDate'); }
  get disordersMedical() { return this.registerForm.get('disordersMedical'); }
  get medicalContinued() { return this.registerForm.get('medicalContinued'); }
  get habitualActivities() { return this.registerForm.get('habitualActivities'); }
  get eyeColor() { return this.registerForm.get('eyeColor'); }
  get otherEyeColor() { return this.registerForm.get('otherEyeColor'); }
  get tattooControl() { return this.registerForm.get('tattooControl'); }
  get tattooDescription() { return this.registerForm.get('tattooDescription'); }
  get tattooLocation() { return this.registerForm.get('tattooLocation'); }
  get piercingControl() { return this.registerForm.get('piercingControl'); }
  get piercingDescription() { return this.registerForm.get('piercingDescription'); }
  get piercingLocation() { return this.registerForm.get('piercingLocation'); }
  get nextKinName() { return this.registerForm.get('nextKinName'); }
  get nextKinRelationship() { return this.registerForm.get('nextKinRelationship'); }
  get nextKinAddress() { return this.registerForm.get('nextKinAddress'); }
  get nextKinPhoneNumber() { return this.registerForm.get('nextKinPhoneNumber'); }
  get nextKinCity() { return this.registerForm.get('nextKinCity'); }
  get nextKinState() { return this.registerForm.get('nextKinState'); }
  get nextKinZip() { return this.registerForm.get('nextKinZip'); }
  get nextKinEmail() { return this.registerForm.get('nextKinEmail'); }
  get informantName() { return this.registerForm.get('informantName'); }
  get informantRelationship() { return this.registerForm.get('informantRelationship'); }
  get informantAddress() { return this.registerForm.get('informantAddress'); }
  get informantPhoneNumber() { return this.registerForm.get('informantPhoneNumber'); }
  get informantCity() { return this.registerForm.get('informantCity'); }
  get informantState() { return this.registerForm.get('informantState'); }
  get informantZip() { return this.registerForm.get('informantZip'); }
  get informantEmail() { return this.registerForm.get('informantEmail'); }

  socioEconomicStatusTypes: viewString[] = [
    {value: 'lower', viewValue: 'Lower'},
    {value: 'lower-middle', viewValue: 'Lower Middle'},
    {value: 'middle', viewValue: 'Middle'},
    {value: 'upper-middle', viewValue: 'Upper Middle'},
    {value: 'upper', viewValue: 'Upper'}
  ]
  truefalse: viewString[] = [
    {value: 'true', viewValue: 'Yes'},
    {value: 'false', viewValue: 'No'}
  ];
  races: viewString[] = [
    {value: 'white', viewValue: 'White'},
    {value: 'black', viewValue: 'Black'},
    {value: 'hispanic', viewValue: 'Hispanic'},
    {value: 'other', viewValue: 'Other'}
  ];
  feetRange: viewNumber[] = [
    {value: 2, viewValue: '2 ft.'},
    {value: 3, viewValue: '3 ft.'},
    {value: 4, viewValue: '4 ft.'},
    {value: 5, viewValue: '5 ft.'},
    {value: 6, viewValue: '6 ft.'},
    {value: 7, viewValue: '7 ft.'},
    {value: 8, viewValue: '8 ft.'}
  ];
  inchRange: viewNumber[] = [
    {value: 0, viewValue: '0 in.'},
    {value: 1, viewValue: '1 in.'},
    {value: 2, viewValue: '2 in.'},
    {value: 3, viewValue: '3 in.'},
    {value: 4, viewValue: '4 in.'},
    {value: 5, viewValue: '5 in.'},
    {value: 6, viewValue: '6 in.'},
    {value: 7, viewValue: '7 in.'},
    {value: 8, viewValue: '8 in.'},
    {value: 9, viewValue: '9 in.'},
    {value: 10, viewValue: '10 in.'},
    {value: 11, viewValue: '11 in.'}
  ];
  shoeSizes: viewNumber[] = [
    {value: 3, viewValue: '3'},
    {value: 3.5, viewValue: '3 1/2'},
    {value: 4, viewValue: '4'},
    {value: 4.5, viewValue: '4 1/2'},
    {value: 5, viewValue: '5'},
    {value: 5.5, viewValue: '5 1/2'},
    {value: 6, viewValue: '6'},
    {value: 6.5, viewValue: '6 1/2'},
    {value: 7, viewValue: '7'},
    {value: 7.5, viewValue: '7 1/2'},
    {value: 8, viewValue: '8'},
    {value: 8.5, viewValue: '8 1/2'},
    {value: 9, viewValue: '9'},
    {value: 9.5, viewValue: '9 1/2'},
    {value: 10, viewValue: '10'},
    {value: 10.5, viewValue: '10 1/2'},
    {value: 11, viewValue: '11'},
    {value: 11.5, viewValue: '11 1/2'},
    {value: 12, viewValue: '12'},
    {value: 12.5, viewValue: '12 1/2'},
    {value: 13, viewValue: '13'},
    {value: 13.5, viewValue: '13 1/2'},
    {value: 14, viewValue: '14'},
    {value: 14.5, viewValue: '14 1/2'},
    {value: 15, viewValue: '15'},
    {value: 15.5, viewValue: '15 1/2'},
    {value: 16, viewValue: '16'}
  ];
  bloodTypes: viewString[] = [
    {value: 'a+', viewValue: 'A+'},
    {value: 'a-', viewValue: 'A-'},
    {value: 'b+', viewValue: 'B+'},
    {value: 'b-', viewValue: 'B-'},
    {value: 'ab+', viewValue: 'AB+'},
    {value: 'ab-', viewValue: 'AB-'},
    {value: 'o+', viewValue: 'O+'},
    {value: 'o-', viewValue: 'O-'}
  ];
  hairColors: viewString[] = [
    {value: 'black', viewValue: 'Black'},
    {value: 'blonde', viewValue: 'Blonde'},
    {value: 'brown', viewValue: 'Brown'},
    {value: 'red', viewValue: 'Red'},
    {value: 'gray', viewValue: 'Gray'},
    {value: 'other', viewValue: 'Other'}
  ];
  maritalStatusTypes: viewString[] = [
    {value: 'single', viewValue: 'Single'},
    {value: 'married', viewValue: 'Married'},
    {value: 'divoreced', viewValue: 'Divorced or Seperated'},
    {value: 'widowed', viewValue: 'Widowed'}
  ];
  socialClasses: viewString[] = [
    {value: 'lower', viewValue: 'Lower'},
    {value: 'working', viewValue: 'Working'},
    {value: 'middle', viewValue: 'Middle'},
    {value: 'upper-middle', viewValue: 'Upper Middle'},
    {value: 'upper', viewValue: 'Upper'}
  ];
  eyeColors: viewString[] = [
    {value: 'blue', viewValue: 'Blue'},
    {value: 'green', viewValue: 'Green'},
    {value: 'Gray', viewValue: 'Gray'},
    {value: 'brown', viewValue: 'Brown'},
    {value: 'hazel', viewValue: 'Hazel'},
    {value: 'other', viewValue: 'Other'}
  ]
}
