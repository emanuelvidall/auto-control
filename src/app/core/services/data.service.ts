import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponseBase,
} from '@angular/common/http'
import { Observable, throwError, catchError, tap } from 'rxjs'
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

export interface userDataSessionStorage {
  email: string
  token: string
  user_cnh: string
  user_id: number
  user_name: string
}

export interface VehicleBrand {
  name: string
}

export interface Vehicle {
  id: number
  name: string
  owner: number
  owner_name: string
  description: string
  type: number
  type_name: string
  brand: number
  brand_name: string
  images: string[]
  created_at: string
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  login(data: UserLoginData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/`, data).pipe(
      tap((response) => {
        if (response && response.token) {
          sessionStorage.setItem('userData', JSON.stringify(response))
        }
      }),
      catchError(this.handleError)
    )
  }

  createAccount(data: UserData): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl + 'api/v1/app-users/register-user/'}`, data)
      .pipe(catchError(this.handleError))
  }

  getVehicleBrands(token: string): Observable<string[]> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.get<string[]>(
      `${this.apiUrl + 'api/v1/app-vehicles/brands/'}`,
      { headers: headers }
    )
  }

  getVehiclesById(userId: number, token: string): Observable<Vehicle[]> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })

    return this.http.get<Vehicle[]>(
      `${this.apiUrl}api/v1/app-vehicles/vehicles/?owner=${userId}`,
      { headers: headers }
    )
  }

  addVehicle(vehicleData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.post(
      `${this.apiUrl}api/v1/app-vehicles/vehicles/`,
      vehicleData,
      { headers }
    )
  }

  deleteVehicle(vehicleId: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.delete(
      `${this.apiUrl}api/v1/app-vehicles/vehicles/${vehicleId}/`,
      { headers }
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error)
    if (error.error instanceof ErrorEvent) {
      console.error(
        'A client-side or network error occurred:',
        error.error.message
      )
      return throwError(
        () =>
          new Error(
            'An error occurred; please check your network connection and try again.'
          )
      )
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      )
      return throwError(() => error)
    }
  }
}
