import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getContacts(page: number = 1) {
        return this.httpClient.get(
            environment.backend_api_url + '/api/contacts/?page=' + page
        );
    }

    create(contact) {
        return this.httpClient.post(environment.backend_api_url + '/api/contacts/', contact);
    }

    update(contact) {
        return this.httpClient.patch(environment.backend_api_url + '/api/contacts/' + contact.id + '/', contact);
    }

    remove(id: number) {
        return this.httpClient.delete(environment.backend_api_url + '/api/contacts/' + id);
    }

}