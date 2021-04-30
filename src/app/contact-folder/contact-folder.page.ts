import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ContactsInterface, ContactsSerie } from '../shared/interfaces/contacts.interface';
import { ContactService } from '../shared/services/contact.service'
import { ShowToastService } from '../shared/services/show-toast-service';

@Component({
  selector: 'app-contact-folder',
  templateUrl: './contact-folder.page.html',
  styleUrls: ['./contact-folder.page.scss'],
})
export class ContactFolderPage implements OnInit {

  public contactList: Array<ContactsInterface> = [];
  public currentSerie: ContactsSerie;
  public contactTxt: String = 'contacts';

  constructor(
        private contactService: ContactService,
        private showToastService: ShowToastService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe((res: any) => {
      this.currentSerie = res;
      this.contactList = res.results;
      this.contactTxt = this.contactList.length==1?'contact':'contacts';
      console.log('reload');
    }).add(() => {
      this.showToastService.showToast('Contacts refreshed.', 'dark');
    });
  }

}
