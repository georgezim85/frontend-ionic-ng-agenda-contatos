import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ContactService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getContacts() {
        return this.httpClient.get('http://localhost:8000/api/contacts/');
    }

    create(contact) {
        return this.httpClient.post('http://localhost:8000/api/contacts/', contact);
    }

    update(contact) {
        return this.httpClient.patch('http://localhost:8000/api/contacts/' + contact.id + '/', contact);
    }

    remove(id: number) {
        return this.httpClient.delete('http://localhost:8000/api/contacts/' + id);
    }

}