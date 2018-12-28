import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Contact } from './contact';
import { throwError, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts (): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts').pipe
      (tap(data => console.log("All contacts : " + JSON.stringify(data))),
      catchError(this.handleError));
      
  }

  addContact(newContact) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/contact', newContact, {headers:headers}).pipe
      (map(res => JSON.stringify(res)));
  }

  deleteContact(id): Observable<{}> {
    return this.http.delete<Contact>('http://localhost:3000/api/contact/' + id).pipe
      (tap(res => JSON.stringify(res)));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

