import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ContactFolderPage } from './contact-folder.page';

const routes: Routes = [
  {
    path: '',
    component: ContactFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactFolderPageRoutingModule {}
