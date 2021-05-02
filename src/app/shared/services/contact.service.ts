import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getContacts(token: string) {
        return this.httpClient.get(
            environment.backend_api_url + '/api/contacts/',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );
    }

    create(token: string, contact) {
        return this.httpClient.post(environment.backend_api_url + '/api/contacts/', contact,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
    }

    update(token: string,contact) {
        return this.httpClient.patch(environment.backend_api_url + '/api/contacts/' + contact.id + '/', contact,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    remove(token: string, id: number) {
        return this.httpClient.delete(environment.backend_api_url + '/api/contacts/' + id,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

}