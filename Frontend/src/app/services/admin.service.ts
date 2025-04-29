import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilitiesService } from './utilities.service';
import { Admin } from '../models/admin.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) { }
  createAdmin(admin: Admin): Observable<any> {
    const password = this.utilitiesService.createPassword();

    const payload = {
      admin_id: admin.id,
      correo: admin.email,
      contraseña: password,
      nombre: admin.name,
      apellido1: admin.lastName1,
      apellido2: admin.lastName2,
      rol: 'admin',
      perfil: 'n'
    }
    console.log(password);
    return this.http.post<any>(`${this.apiUrl}/admin`, payload).pipe(
      map(response => ({
        ...response,
        password: password
      }))
    );
  }

  uploadProfileImage(adminId: number, file: File): Observable<any>{
    const formData = new FormData();
    formData.append('matricula', adminId.toString());
    formData.append('perfil', file);
    return this.http.post(`${this.apiUrl}/admin/upload-profile/${adminId}`, formData);
  }

  getProfilePicture(adminId: number): Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/admin/profile-image/${adminId}`)
  }

  getAdminDataById(adminId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/${adminId}` )
  }
}
