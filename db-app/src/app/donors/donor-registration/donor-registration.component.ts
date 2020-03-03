import { Component, OnInit } from '@angular/core';
import { Donor, TrueFalse, EducationLevels, AncestryRaceList, HeightInFeet, HeightInInches, ShoeSizeRange, BloodTypes, HairColors, MaritalStatus, SocialClass } from '../donor';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { DonorService } from '../donor.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-donor-registration',
  templateUrl: './donor-registration.component.html',
  styleUrls: ['./donor-registration.component.css']
})
export class DonorRegistrationComponent implements OnInit {
  truefalse: TrueFalse[] = [
    {value: 'true', viewValue: 'Yes'}, 
    {value: 'false', viewValue: 'No'} 
  ];
  levels: EducationLevels[] = [
    {value: 'highSchool-0', viewValue: 'Below High School'},
    {value: 'highSchool-1', viewValue: 'High School or GED'},
    {value: 'some-2', viewValue: 'Some College'},
    {value: 'associate-3', viewValue: 'Associates or Certificate'},
    {value: 'bachelor-4', viewValue: 'Bachelor\'s'},
    {value: 'postGrad-5', viewValue: 'Graduate or Professional Degree'}
  ];
  races: AncestryRaceList[] = [
    {value: 'hispanic-0', viewValue: 'Hispanic or Latino of any race'},
    {value: 'amerIndian-1', viewValue: 'American Indian or Alaskan Native'},
    {value: 'asian-2', viewValue: 'Asian'},
    {value: 'pacificIsland-3', viewValue: 'Native Hawaiian or Other Pacific Islander'},
    {value: 'black-4', viewValue: 'Black or African American'},
    {value: 'white-5', viewValue: 'White'},
    {value: 'twoPlus-6', viewValue: 'Two or more races'}
  ];
  feetRange: HeightInFeet[] = [
    {value: 2, viewValue: '2 ft.'},
    {value: 3, viewValue: '3 ft.'},
    {value: 4, viewValue: '4 ft.'},
    {value: 5, viewValue: '5 ft.'},
    {value: 6, viewValue: '6 ft.'},
    {value: 7, viewValue: '7 ft.'},
    {value: 8, viewValue: '8 ft.'}
  ];
  inchRange: HeightInInches[] = [
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
  shoeSizes: ShoeSizeRange[] = [
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
  bloodTypes: BloodTypes[] = [
    {value: 'A_pos-0', viewValue: 'A+'},
    {value: 'A_neg-1', viewValue: 'A-'},
    {value: 'B_pos-2', viewValue: 'B+'},
    {value: 'B_neg-3', viewValue: 'B-'},
    {value: 'AB_pos-4', viewValue: 'AB+'},
    {value: 'AB_neg-5', viewValue: 'AB-'},
    {value: 'O_pos-6', viewValue: 'O+'},
    {value: 'O_neg-7', viewValue: 'O-'}
  ];
  hairColors: HairColors[] = [
    {value: 'blackk-0', viewValue: 'Black'},
    {value: 'blonde-1', viewValue: 'Blonde'},
    {value: 'brown-2', viewValue: 'Brown'},
    {value: 'red-3', viewValue: 'Red'},
    {value: 'white-4', viewValue: 'White'},
    {value: 'other-5', viewValue: 'Other - Please Specify'}
  ];
  maritalStatus: MaritalStatus[] = [
    {value: 'single-0', viewValue: 'Single'},
    {value: 'married-1', viewValue: 'Married'},
    {value: 'divoreceSeperated-2', viewValue: 'Divorced or Seperated'},
    {value: 'widowed-3', viewValue: 'Widowed'}
  ];
  socialClasses: SocialClass[] = [
    {value: 'lower-0', viewValue: 'Lower'},
    {value: 'working-1', viewValue: 'Working'},
    {value: 'middle-2', viewValue: 'Middle'},
    {value: 'upperMid-3', viewValue: 'Upper Middle'},
    {value: 'upper-4', viewValue: 'Upper'}
  ];

  public registerForm : FormGroup;
  private registerSub: Subscription;
  private mode = 'create';
  private donorId: string;
  donor: Donor;
  _dataStream = new BehaviorSubject<Donor[]>([]);
  public get data(): Donor[] { return this._dataStream.value; }
  public set data(v: Donor[]) { this._dataStream.next(v); }

  constructor(public donorService: DonorService, private formBuilder: FormBuilder, public route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      lastName : new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]*'),]),
      firstName : new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]*'),]),
      middleName : new FormControl(''),
      suffixName : new FormControl(''),
      maidenName : new FormControl(''),
      selectedOther : new FormControl('', [Validators.required]),
      selectedSex : new FormControl('', [Validators.required]),
      selectedRace : new FormControl('', [Validators.required]),
      birthDate : new FormControl('',[Validators.required]),
      cityBirth : new FormControl(''),
      stateBirth : new FormControl(''),
      countryBirth : new FormControl(''),
      donationDate : new FormControl('', [Validators.required]),
      livingResearch : new FormControl('', [Validators.required]),
      traumaResearch : new FormControl('', [Validators.required]),
      motherLast : new FormControl(''),
      motherFirst : new FormControl(''),
      motherMiddle : new FormControl(''),
      motherSuffix : new FormControl(''),
      motherMaiden : new FormControl(''),
      fatherLast : new FormControl(''),
      fatherFirst : new FormControl(''),
      fatherMiddle : new FormControl(''),
      fatherSuffix : new FormControl(''),
      email : new FormControl('', [Validators.required]),
      phone : new FormControl('', [Validators.required]),
      phoneType : new FormControl('', [Validators.required]),
      streetAddress : new FormControl('', [Validators.required]),
      cityAddress : new FormControl('', [Validators.required]),
      stateAddress : new FormControl('', [Validators.required]),
      zipAddress : new FormControl('', [Validators.required]),
      countryAddress : new FormControl('', [Validators.required]),
      heightFeet: new FormControl('', [Validators.required]),
      heightInch : new FormControl('', [Validators.required]),
      estimateHeight : new FormControl(''),
      weight : new FormControl('', [Validators.pattern('[0-9]*')]),
      estimateWeight : new FormControl(''),
      handedness : new FormControl('', [Validators.required]),
      shoesize : new FormControl('', [Validators.required]),
      bloodtype : new FormControl('', [Validators.required]),
      hairColor : new FormControl('', [Validators.required]),
      maritalstatus : new FormControl('', [Validators.required]),
      spouseLast : new FormControl(''),
      spouseFirst : new FormControl(''),
      spouseMiddle : new FormControl(''),
      spouseSuffix : new FormControl(''),
      spouseMaiden : new FormControl(''),
      livingSpouse : new FormControl(''),
      spouseDonor : new FormControl(''),
      childrenNumber : new FormControl('', [Validators.pattern('[0-9]*')]),
      education : new FormControl('', [Validators.required]),
      military : new FormControl('', [Validators.required]),
      ecoClass : new FormControl('', [Validators.required]),
      occupation : new FormControl(''),
      business : new FormControl(''),
      extDentalWork : new FormControl(''),
      lowerDenture : new FormControl(''),
      upperDenture : new FormControl(''),
      partialPlate : new FormControl(''),
      braces : new FormControl(''),
      mostTeeth : new FormControl(''),
      gumDisease : new FormControl(''),
      habits : new FormControl('')
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('donor_Id')) {
        this.mode = 'edit';
        this.donorId = paramMap.get('donor_Id');
        this.donor = this.donorService.getDonor(this.donorId);
        console.log(JSON.stringify(this.donor));
        this.registerForm.setValue({
          lastName: this.donor.lastName,
          firstName: this.donor.firstName,
          middleName: this.donor.middleName,
          suffixName: this.donor.suffixName,
          maidenName: this.donor.maidenName,
          selectedOther: this.donor.selectedOther,
          selectedSex: this.donor.selectedSex,
          selectedRace: this.donor.selectedRace,
          birthDate: this.donor.birthDate,
          cityBirth: this.donor.cityBirth,
          stateBirth: this.donor.stateBirth,
          countryBirth: this.donor.countryBirth,
          donationDate: this.donor.donationDate,
          livingResearch: this.donor.livingResearch,
          traumaResearch: this.donor.traumaResearch,
          motherLast: this.donor.motherLast,
          motherFirst: this.donor.motherFirst,
          motherMiddle: this.donor.motherMiddle,
          motherSuffix: this.donor.motherSuffix,
          motherMaiden: this.donor.motherMaiden,
          fatherLast: this.donor.fatherLast,
          fatherFirst: this.donor.fatherFirst,
          fatherMiddle: this.donor.fatherMiddle,
          fatherSuffix: this.donor.fatherSuffix,
          email: this.donor.email,
          phone: this.donor.phone,
          phoneType: this.donor.phoneType,
          streetAddress: this.donor.streetAddress,
          cityAddress: this.donor.cityAddress,
          stateAddress: this.donor.stateAddress,
          zipAddress: this.donor.zipAddress,
          countryAddress: this.donor.countryAddress,
          heightFeet: this.donor.heightFeet,
          heightInch: this.donor.heightInch,
          estimateHeight: this.donor.estimateHeight,
          weight: this.donor.weight,
          estimateWeight: this.donor.estimateWeight,
          handedness: this.donor.handedness,
          shoesize: this.donor.shoesize,
          bloodtype: this.donor.bloodtype,
          hairColor: this.donor.hairColor,
          maritalstatus: this.donor.maritalstatus,
          spouseLast: this.donor.spouseLast,
          spouseFirst: this.donor.spouseFirst,
          spouseMiddle: this.donor.spouseMiddle,
          spouseSuffix: this.donor.spouseSuffix,
          spouseMaiden: this.donor.spouseMaiden,
          livingSpouse: this.donor.livingSpouse,
          spouseDonor: this.donor.spouseDonor,
          childrenNumber: this.donor.childrenNumber,
          education: this.donor.education,
          military: this.donor.military,
          ecoClass: this.donor.ecoClass,
          occupation: this.donor.occupation,
          business: this.donor.business,
          extDentalWork: this.donor.extDentalWork,
          lowerDenture: this.donor.lowerDenture,
          upperDenture: this.donor.upperDenture,
          partialPlate: this.donor.partialPlate,
          braces: this.donor.braces,
          mostTeeth: this.donor.mostTeeth,
          gumDisease: this.donor.gumDisease,
          habits: this.donor.habits
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
        suffixName: this.suffixName.value,
        maidenName: this.maidenName.value,
        selectedOther: this.selectedOther.value,
        selectedSex: this.selectedSex.value,
        selectedRace: this.selectedRace.value,
        birthDate: this.birthDate.value,
        cityBirth: this.cityBirth.value,
        stateBirth: this.stateBirth.value,
        countryBirth: this.countryBirth.value,
        donationDate: this.donationDate.value,
        livingResearch: this.livingResearch.value,
        traumaResearch: this.traumaResearch.value,
        motherLast: this.motherLast.value,
        motherFirst: this.motherFirst.value,
        motherMiddle: this.motherMiddle.value,
        motherSuffix: this.motherSuffix.value,
        motherMaiden: this.motherMaiden.value,
        fatherLast: this.fatherLast.value,
        fatherFirst: this.fatherFirst.value,
        fatherMiddle: this.fatherMiddle.value,
        fatherSuffix: this.fatherSuffix.value,
        email: this.email.value,
        phone: this.phone.value,
        phoneType: this.phoneType.value,
        streetAddress: this.streetAddress.value,
        cityAddress: this.cityAddress.value,
        stateAddress: this.stateAddress.value,
        zipAddress: this.zipAddress.value,
        countryAddress: this.countryAddress.value,
        heightFeet: this.heightFeet.value,
        heightInch: this.heightInch.value,
        estimateHeight: this.estimateHeight.value,
        weight: this.weight.value,
        estimateWeight: this.estimateWeight.value,
        handedness: this.handedness.value,
        shoesize: this.shoesize.value,
        bloodtype: this.bloodtype.value,
        hairColor: this.hairColor.value,
        maritalstatus: this.maritalstatus.value,
        spouseLast: this.spouseLast.value,
        spouseFirst: this.spouseFirst.value,
        spouseMiddle: this.spouseMiddle.value,
        spouseSuffix: this.spouseSuffix.value,
        spouseMaiden: this.spouseMaiden.value,
        livingSpouse: this.livingSpouse.value,
        spouseDonor: this.spouseDonor.value,
        childrenNumber: this.childrenNumber.value,
        education: this.education.value,
        military: this.military.value,
        ecoClass: this.ecoClass.value,
        occupation: this.occupation.value,
        business: this.business.value,
        extDentalWork: this.extDentalWork.value,
        lowerDenture: this.lowerDenture.value,
        upperDenture: this.upperDenture.value,
        partialPlate: this.partialPlate.value,
        braces: this.braces.value,
        mostTeeth: this.mostTeeth.value,
        gumDisease: this.gumDisease.value,
        habits: this.habits.value
      })
    } else {
      this.donorService.updateDonor({
        id: null,
        lastName: this.lastName.value,
        firstName: this.firstName.value,
        middleName: this.middleName.value,
        suffixName: this.suffixName.value,
        maidenName: this.maidenName.value,
        selectedOther: this.selectedOther.value,
        selectedSex: this.selectedSex.value,
        selectedRace: this.selectedRace.value,
        birthDate: this.birthDate.value,
        cityBirth: this.cityBirth.value,
        stateBirth: this.stateBirth.value,
        countryBirth: this.countryBirth.value,
        donationDate: this.donationDate.value,
        livingResearch: this.livingResearch.value,
        traumaResearch: this.traumaResearch.value,
        motherLast: this.motherLast.value,
        motherFirst: this.motherFirst.value,
        motherMiddle: this.motherMiddle.value,
        motherSuffix: this.motherSuffix.value,
        motherMaiden: this.motherMaiden.value,
        fatherLast: this.fatherLast.value,
        fatherFirst: this.fatherFirst.value,
        fatherMiddle: this.fatherMiddle.value,
        fatherSuffix: this.fatherSuffix.value,
        email: this.email.value,
        phone: this.phone.value,
        phoneType: this.phoneType.value,
        streetAddress: this.streetAddress.value,
        cityAddress: this.cityAddress.value,
        stateAddress: this.stateAddress.value,
        zipAddress: this.zipAddress.value,
        countryAddress: this.countryAddress.value,
        heightFeet: this.heightFeet.value,
        heightInch: this.heightInch.value,
        estimateHeight: this.estimateHeight.value,
        weight: this.weight.value,
        estimateWeight: this.estimateWeight.value,
        handedness: this.handedness.value,
        shoesize: this.shoesize.value,
        bloodtype: this.bloodtype.value,
        hairColor: this.hairColor.value,
        maritalstatus: this.maritalstatus.value,
        spouseLast: this.spouseLast.value,
        spouseFirst: this.spouseFirst.value,
        spouseMiddle: this.spouseMiddle.value,
        spouseSuffix: this.spouseSuffix.value,
        spouseMaiden: this.spouseMaiden.value,
        livingSpouse: this.livingSpouse.value,
        spouseDonor: this.spouseDonor.value,
        childrenNumber: this.childrenNumber.value,
        education: this.education.value,
        military: this.military.value,
        ecoClass: this.ecoClass.value,
        occupation: this.occupation.value,
        business: this.business.value,
        extDentalWork: this.extDentalWork.value,
        lowerDenture: this.lowerDenture.value,
        upperDenture: this.upperDenture.value,
        partialPlate: this.partialPlate.value,
        braces: this.braces.value,
        mostTeeth: this.mostTeeth.value,
        gumDisease: this.gumDisease.value,
        habits: this.habits.value
      });
    }
    this.router.navigate(['/donor-table']);
  }

  get form() { return this.registerForm; }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get middleName() { return this.registerForm.get('middleName'); }
  get suffixName() { return this.registerForm.get('suffixName'); }
  get maidenName() { return this.registerForm.get('maidenName'); }
  get selectedOther() { return this.registerForm.get('selectedOther'); }
  get selectedSex() { return this.registerForm.get('selectedSex'); }
  get selectedRace() { return this.registerForm.get('selectedRace'); }
  get birthDate() { return this.registerForm.get('birthDate'); }
  get cityBirth() { return this.registerForm.get('cityBirth'); }
  get stateBirth() { return this.registerForm.get('stateBirth'); }
  get countryBirth() { return this.registerForm.get('countryBirth'); }
  get donationDate() { return this.registerForm.get('donationDate'); }
  get livingResearch() { return this.registerForm.get('livingResearch'); }
  get traumaResearch() { return this.registerForm.get('traumaResearch'); }
  get motherLast() { return this.registerForm.get('motherLast'); }
  get motherFirst() { return this.registerForm.get('motherFirst'); }
  get motherMiddle() { return this.registerForm.get('motherMiddle'); }
  get motherSuffix() { return this.registerForm.get('motherSuffix'); }
  get motherMaiden() { return this.registerForm.get('motherMaiden'); }
  get fatherLast() { return this.registerForm.get('fatherLast'); }
  get fatherFirst() { return this.registerForm.get('fatherFirst'); }
  get fatherMiddle() { return this.registerForm.get('fatherMiddle'); }
  get fatherSuffix() { return this.registerForm.get('fatherSuffix'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get phoneType() { return this.registerForm.get('phoneType'); }
  get streetAddress() { return this.registerForm.get('streetAddress'); }
  get cityAddress() { return this.registerForm.get('cityAddress'); }
  get stateAddress() { return this.registerForm.get('stateAddress'); }
  get zipAddress() { return this.registerForm.get('zipAddress'); }
  get countryAddress() { return this.registerForm.get('countryAddress'); }
  get heightFeet() { return this.registerForm.get('heightFeet'); }
  get heightInch() { return this.registerForm.get('heightInch'); }
  get estimateHeight() { return this.registerForm.get('estimateHeight'); }
  get weight() { return this.registerForm.get('weight'); }
  get estimateWeight() { return this.registerForm.get('estimateWeight'); }
  get handedness() { return this.registerForm.get('handedness'); }
  get shoesize() { return this.registerForm.get('shoesize'); }
  get bloodtype() { return this.registerForm.get('bloodtype'); }
  get hairColor() { return this.registerForm.get('hairColor'); }
  get maritalstatus() { return this.registerForm.get('maritalstatus'); }
  get spouseLast() { return this.registerForm.get('spouseLast'); }
  get spouseFirst() { return this.registerForm.get('spouseFirst'); }
  get spouseMiddle() { return this.registerForm.get('spouseMiddle'); }
  get spouseSuffix() { return this.registerForm.get('spouseSuffix'); }
  get spouseMaiden() { return this.registerForm.get('spouseMaiden'); }
  get livingSpouse() { return this.registerForm.get('livingSpouse'); }
  get spouseDonor() { return this.registerForm.get('spouseDonor'); }
  get childrenNumber() { return this.registerForm.get('childrenNumber'); }
  get education() { return this.registerForm.get('education'); }
  get military() { return this.registerForm.get('military'); }
  get ecoClass() { return this.registerForm.get('ecoClass'); }
  get occupation() { return this.registerForm.get('occupation'); }
  get business() { return this.registerForm.get('business'); }
  get extDentalWork() { return this.registerForm.get('extDentalWork'); }
  get lowerDenture() { return this.registerForm.get('lowerDenture'); }
  get upperDenture() { return this.registerForm.get('upperDenture'); }
  get partialPlate() { return this.registerForm.get('partialPlate'); }
  get braces() { return this.registerForm.get('braces'); }
  get mostTeeth() { return this.registerForm.get('mostTeeth'); }
  get gumDisease() { return this.registerForm.get('gumDisease'); }
  get habits() { return this.registerForm.get('habits'); }

  loadForm(data: Donor) {
    console.log(JSON.stringify(this.donor));
    this.registerForm.setValue({
      lastName: this.donor.lastName
    });
  }
}
