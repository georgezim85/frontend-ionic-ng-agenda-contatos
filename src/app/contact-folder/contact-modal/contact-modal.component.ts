import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ContactService } from 'src/app/shared/services/contact.service';
import { ShowToastService } from 'src/app/shared/services/show-toast-service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'contact-modal',
  templateUrl: 'contact-modal.html',
  styleUrls: ['./contact-modal.css']
})

export class ContactModal {
  @Input() action: 'create' | 'update';
  @Input() contact: any;
  public actionDescription: string;
  public validations_form: FormGroup;
  public validation_messages = {
    'id': [
      { type: 'required', message: 'Id is required.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email has incorrect format.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required.' },
      { type: 'invalidValue', message: 'Gender is invalid.' }
    ]
  }

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private contactService: ContactService,
    private showToastService: ShowToastService,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.nullValidator),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required,
        this.genderValidator()
      ])
      )
    });

    if (this.action == 'create') {
      this.actionDescription = "Add contact";
    } else {
      this.actionDescription = "Edit contact";
      this.validations_form.setValue(this.contact);
    }
  }

  genderValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const check = control.value != 'male' && control.value != 'female';
      return check ? { invalidValue: { value: control.value } } : null;
    };
  }

  async closeModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.action == 'create') {
      this.storage.get('auth-token').then((token) => {
        this.contactService.create(token, this.validations_form.value).subscribe(() => {
          this.showToastService.showToast('Saved.', 'dark');
          this.closeModal();
        });
      }, (err) => {
        this.showToastService.showToast(err.message, 'danger');
        console.log(err);
      });
    } else if (this.action == 'update') {
      this.storage.get('auth-token').then((token) => {
        this.contactService.update(token, this.validations_form.value).subscribe(() => {
          this.showToastService.showToast('Saved.', 'dark');
          this.closeModal();
        }, (err) => {
          this.showToastService.showToast(err.message, 'danger');
          console.log(err);
        });
      });
    } else {
      console.log('action ' + this.action + ' isn`t valid.')
    }
  }

  inputClass(field) {
    if (this.validations_form.get(field) !== undefined && this.validations_form.get(field).status == 'INVALID') {
      return 'invalid';
    }
  }
}
