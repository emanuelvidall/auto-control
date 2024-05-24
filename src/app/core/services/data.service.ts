import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, of, tap, throwError } from 'rxjs'
import { environment } from '../../../environments/environment' // Adjust path as necessary
import { StorageService } from './session.service'
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
  id?: number
  name: string
}

export interface ExpenseType {
  id?: number
  name: string
}

export interface Vehicle {
  id?: number
  name: string
  description?: string
  type: number
  type_name?: string
  brand: number
  brand_name?: string
  year: number
  license_plate: string
  owner: number
  owner_name?: string
  images?: string[]
  expenses?: Expense[]
}

export interface Expense {
  id?: number
  name: string
  value: number
  date: Date | string
  vehicle: number
  vehicle_name?: string
  description: string
  type: number
  type_name?: string
  file?: File | string
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(data: UserLoginData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/`, data).pipe(
      tap((response) => {
        if (response && response.token) {
          this.storageService.setItem('userData', response)
        }
      }),
      catchError(this.handleError)
    )
  }

  logout() {
    this.storageService.removeItem('userData')
  }

  getUserData(): userDataSessionStorage | null {
    return this.storageService.getItem('userData')
  }

  createAccount(data: UserData): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}api/v1/app-users/register-user/`, data)
      .pipe(catchError(this.handleError))
  }

  forgetPassword(data: UserData): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}request-reset-password/`, data)
      .pipe(catchError(this.handleError))
  }

  resetPassword(data: UserData): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}reset-password/`, data)
      .pipe(catchError(this.handleError))
  }

  updateUserData(data: any, id: any): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}api/v1/app-users/register-user/${id}/`, data)
      .pipe(catchError(this.handleError))
  }

  getVehicleBrands(token: string): Observable<VehicleBrand[]> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.get<VehicleBrand[]>(
      `${this.apiUrl}api/v1/app-vehicles/brands/`,
      { headers }
    )
  }

  getVehiclesById(userId: number, token: string): Observable<Vehicle[]> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.get<Vehicle[]>(
      `${this.apiUrl}api/v1/app-vehicles/vehicles/?owner=${userId}`,
      { headers }
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

  deleteVehicle(vehicleId: number, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.delete(
      `${this.apiUrl}api/v1/app-vehicles/vehicles/${vehicleId}/`,
      { headers }
    )
  }

  addExpense(expenseData: Expense, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.post(
      `${this.apiUrl}api/v1/app-expenses/expenses/`,
      expenseData,
      { headers }
    )
  }

  // getExpensesType(): Observable<
  //   { id: number; name: string; description: string }[]
  // > {
  //   return of([
  //     { id: 1, name: 'Maintenance', description: 'Regular maintenance' },
  //     { id: 2, name: 'Repair', description: 'Vehicle repair' },
  //     { id: 3, name: 'Fuel', description: 'Fuel expenses' },
  //   ])
  // }

  getExpensesType(token: string): Observable<ExpenseType[]> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    })
    return this.http.get<ExpenseType[]>(
      `${this.apiUrl}api/v1/app-expenses/type-expenses/`,
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
