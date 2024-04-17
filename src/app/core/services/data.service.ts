import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
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

  // getUserData() {
  //   const userData = sessionStorage.getItem('userData')
  //   console.log('user data fetched!', userData)
  //   return userData ? JSON.parse(userData) : null
  // }

  getVehicleBrands(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl + 'api/v1/app-vehicles/brands/'}`)
      .pipe(catchError(this.handleError))
  }

  getVehiclesById(userId: number, token: string): Observable<Vehicle[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    return this.http.get<Vehicle[]>(
      `${this.apiUrl}api/v1/app-vehicles/vehicles/?owner=${userId}`,
      { headers: headers }
    )
  }

  private handleError(error: any) {
    console.error('An error occurred:', error)
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    )
  }
}
