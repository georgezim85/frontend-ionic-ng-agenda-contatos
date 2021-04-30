import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactFolderPageRoutingModule } from './contact-folder-routing.module';

import { ContactFolderPage } from './contact-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactFolderPageRoutingModule
  ],
  declarations: [ContactFolderPage]
})
export class ContactFolderPageModule {}
