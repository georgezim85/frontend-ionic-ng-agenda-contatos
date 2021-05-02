import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactFolderPageRoutingModule } from './contact-folder-routing.module';
import { ContactFolderPage } from './contact-folder.page';
import { ContactModal } from './contact-modal/contact-modal.component';
import { IonicInputMaskModule } from "@thiagoprz/ionic-input-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactFolderPageRoutingModule,
    IonicInputMaskModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContactFolderPage,
    ContactModal
  ],
  providers: [
    FormBuilder
  ]
})
export class ContactFolderPageModule { }
