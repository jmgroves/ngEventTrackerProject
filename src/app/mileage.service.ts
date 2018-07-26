import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mileage } from './models/mileage';
import { throwError } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class MileageService {
  // private baseUrl = 'http://localhost:8081/'; // Development
  // private baseUrl = 'http://52.14.143.133/'; // Seperate Dep
  // private baseUrl = '/TodoRest/'; // All-in-one Deployed
  private url = environment.baseUrl + 'api/mileages';
  mileages = [];

  constructor(private http: HttpClient) {}

  index() {
    return this.http.get<Mileage[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }
  show(id) {
    return this.http.get<Mileage>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

  totalMpg() {
    return this.http.get<number>(this.url + '/' + 'mpg').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

  create(data) {
    return this.http.post<Mileage>(this.url, data).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }
  update(id, data) {
    return this.http.put<any>(this.url + '/' + id, data).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

  destroy(id) {
    return this.http.delete<any>(this.url + '/' + id, {}).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

}
