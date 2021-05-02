import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ContactInterface, ContactsSerie } from '../shared/interfaces/contacts.interface';
import { ContactService } from '../shared/services/contact.service'
import { ShowToastService } from '../shared/services/show-toast-service';
import { ContactModal } from './contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact-folder',
  templateUrl: './contact-folder.page.html',
  styleUrls: ['./contact-folder.page.scss'],
})
export class ContactFolderPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public contactList: Array<ContactInterface> = [];
  public currentSerie: ContactsSerie;
  public contactTxt: String = 'contacts';
  public contactModal: HTMLIonModalElement = null;

  constructor(
    private contactService: ContactService,
    private showToastService: ShowToastService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    return this.contactService.getContacts().subscribe((res: any) => {
      this.currentSerie = res;
      this.contactList = res.results;
      this.contactTxt = this.contactList.length == 1 ? 'contact' : 'contacts';
    });
  }

  refresh() {
    this.getContacts().add(() => {
      this.showToastService.showToast('Refreshed.', 'dark');
    })
  }

  removeContact(id) {
    return this.contactService.remove(id).subscribe((res: any) => {
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

  loadData(event) {
    // TODO get next contact pages
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      //   if (data.length == 1000) {
      //     event.target.disabled = true;
      //   }
    }, 500);
    console.log('ok');
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
