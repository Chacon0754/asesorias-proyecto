import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<any> {
    console.log(email, password)
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    console.log('funcion: getToken(): ',token);
    if (token === null) {
      console.log('sin token guardado')
      throw new Error('No token found in localStorage');
    }
    return token
  }

  removeToken(): void {
    localStorage.removeItem('token')
  }

  isLoggedIn(): boolean {
    const token = this.getToken()
    console.log('is Logged in: ', !!token);
    return !!token;
  }

  getUserDetails(): { name: string, profilePicture: string, id: number, lastName: string, rol: string } | null{
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return {
        name: decoded.name,
        profilePicture: decoded.profilePicture,
        id: decoded.id,
        lastName: decoded.lastName,
        rol: decoded.rol
      }
      console.log(decoded)
    }
    return null
  }

}
