import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from '../../../environments/environment' // Adjust path as necessary

export interface UserLoginData {
  username: string
  password: string
}

export interface UserData {
  name: string
  email: string
  cnh: string
  password: string
}

export interface VehicleBrand {
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  login(data: UserLoginData): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}login/`, data)
      .pipe(catchError(this.handleError))
  }

  createAccount(data: UserData): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl + 'api/v1/users/register-user/'}`, data)
      .pipe(catchError(this.handleError))
  }

  getVehicleBrands(): Observable<VehicleBrand[]> {
    return this.http
      .get<VehicleBrand[]>(`${this.apiUrl + 'api/v1/vehicles/brands/'}`)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: any) {
    console.error('An error occurred:', error)
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    )
  }
}
