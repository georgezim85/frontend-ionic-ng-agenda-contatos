import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactsInterface, ContactsSerie } from '../shared/interfaces/contacts.interface';
import { ContactService } from '../shared/services/contact.service'
import { ShowToastService } from '../shared/services/show-toast-service';
import { ContactModal } from './contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact-folder',
  templateUrl: './contact-folder.page.html',
  styleUrls: ['./contact-folder.page.scss'],
})
export class ContactFolderPage implements OnInit {

  public contactList: Array<ContactsInterface> = [];
  public currentSerie: ContactsSerie;
  public contactTxt: String = 'contacts';
  public contactModal: HTMLIonModalElement = null;

  constructor(
    private contactService: ContactService,
    private showToastService: ShowToastService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    return this.contactService.getContacts().subscribe((res: any) => {
      this.currentSerie = res;
      this.contactList = res.results;
      this.contactTxt = this.contactList.length==1?'contact':'contacts';
    });
  }

  refresh() {
    this.getContacts().add(() => {
      this.showToastService.showToast('Refreshed.', 'dark');
    })
  }

  removeContact(id) {
    this.contactService.remove(id).subscribe((res: any) => {
      this.getContacts();
    }).add(() => {
      this.showToastService.showToast('Removed.', 'dark');
    });
  }

  async showCreateForm() {
    this.contactModal = await this.modalController.create({
      component: ContactModal,
      cssClass: 'contact-modal.css',
      componentProps: {
        action: 'create'
      }
    });
    this.contactModal.onDidDismiss().then(() => {
      this.getContacts();
    })
    await this.contactModal.present();
  }

  async showUpdateForm(contact) {
    this.contactModal = await this.modalController.create({
      component: ContactModal,
      cssClass: 'contact-modal.css',
      componentProps: {
        action: 'update',
        contact: contact,
      }
    });
    this.contactModal.onDidDismiss().then(() => {
      this.getContacts();
    })
    await this.contactModal.present();
  }

}
