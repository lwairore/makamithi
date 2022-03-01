import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertItemToString, stringIsEmpty } from '@sharedModule/utilities';
import { MinCharacterNotGenuinelyAchievedValidator, NoValueProvidedValidator } from '@sharedModule/validators';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contact/contact.service';

@Component({
  selector: 'mak-pit-cpcontact-form-section',
  templateUrl: './cpcontact-form-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CPContactFormSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  leaveUsAMessageSectionDetails = Immutable.fromJS({});

  private _retrieveLeaveUsAMessageSectionDetailsSubscription: Subscription | undefined;

  leaveAMessageFormGroup: FormGroup | undefined;

  submitted = false;


  constructor(
    private _contactService: ContactService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._initializeLeaveAMessageFormGroup();
  }

  ngAfterViewInit(): void {
    this._retrieveLeaveUsAMessageSectionDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  private _initializeLeaveAMessageFormGroup() {
    this.leaveAMessageFormGroup = this._formBuilder.group({
      name: ['', Validators.compose([Validators.required,
      Validators.maxLength(180),
      NoValueProvidedValidator.noValueProvided,
      MinCharacterNotGenuinelyAchievedValidator
        .minCharacterNotGenuinelyAchieved(1)])
      ],
      phoneNumber: ['', Validators.compose([
        Validators.maxLength(17),
        Validators.required,
        MinCharacterNotGenuinelyAchievedValidator
          .minCharacterNotGenuinelyAchieved(1)
      ])],
      email: ['', Validators.email],
      subject: ['', Validators.maxLength(250)],
      message: ['', Validators.maxLength(5000)],
    });

    this.leaveAMessageFormGroup.valueChanges.subscribe(
      details => console.log(this.leaveAMessageFormGroup))
  }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._retrieveLeaveUsAMessageSectionDetailsSubscription instanceof Subscription) {
      this._retrieveLeaveUsAMessageSectionDetailsSubscription.unsubscribe();
    }
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _retrieveLeaveUsAMessageSectionDetails() {
    this._retrieveLeaveUsAMessageSectionDetailsSubscription = this._contactService
      .retrieveLeaveUsAMessageSection$()
      .subscribe(details => {
        this.leaveUsAMessageSectionDetails = Immutable.fromJS(details);

        if (!this.leaveUsAMessageSectionDetails.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));

  }

  onSubmit = (formGroupForNewMessage: FormGroup): Promise<any> => {
    this.submitted = true;

    console.log(formGroupForNewMessage);

    // stop here if form is invalid
    if (formGroupForNewMessage.invalid) {
      return Promise.resolve('Form is invalid. Aborting');
    }

    const newMessageDetailsFormData = new FormData();

    const name = convertItemToString(formGroupForNewMessage?.get('name')?.value).trim();
    newMessageDetailsFormData.append('name', name);

    const phoneNumber = convertItemToString(formGroupForNewMessage?.get('phoneNumber')?.value).trim();
    newMessageDetailsFormData.append('phone_number', phoneNumber);

    const email = convertItemToString(formGroupForNewMessage?.get('email')?.value).trim();
    if (!stringIsEmpty(email)) {
      newMessageDetailsFormData.append('email', email);
    }

    const subject = convertItemToString(formGroupForNewMessage?.get('subject')?.value).trim();
    if (!stringIsEmpty(subject)) {
      newMessageDetailsFormData.append('subject', subject);
    }

    const message = convertItemToString(formGroupForNewMessage?.get('message')?.value).trim();
    if (!stringIsEmpty(message)) {
      newMessageDetailsFormData.append('message', message);
    }

    const savePromise = this._contactService
      .sendMessage$(newMessageDetailsFormData).toPromise();

    savePromise.then(
      result => {
        this.leaveAMessageFormGroup?.get('name')?.reset();
        this.leaveAMessageFormGroup?.get('phoneNumber')?.reset();
        this.leaveAMessageFormGroup?.get('email')?.reset();
        this.leaveAMessageFormGroup?.get('subject')?.reset();
        this.leaveAMessageFormGroup?.get('message')?.reset();

        this.submitted = false;
      },
      (err) => {
        console.error(err);
        this.submitted = false;

      }
    );
    return savePromise;
  }

}
