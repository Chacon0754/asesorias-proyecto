import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { MatMenuModule } from '@angular/material/menu';
import { Admin } from '../models/admin.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  admin: Admin = {
    id: 0,
    email: '',
    password: '',
    name: '',
    lastName1: '',
    lastName2: '',
    rol: '',
    profilePicture: '',
  }
  
  selectedFile: File | null = null;
  safeProfilePictureUrl: SafeUrl = '';


  constructor(private authService: AuthService, private router: Router, private adminService: AdminService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.loadAdminData(userDetails.id)
      this.loadProfileImage(userDetails.id)
    }
  }

  loadProfileImage(adminId: number): void{
    this.adminService.getProfilePicture(adminId).subscribe(response => {
      this.safeProfilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000${response}`);
      console.log(this.safeProfilePictureUrl)
    }, error => {
      console.error('Error loading profile picture', error);
    });
  }
  loadAdminData(adminId: number) {
    this.adminService.getAdminDataById(adminId).subscribe({
      next: (admin) => {
        
        if (admin) {
          const adminData = admin[0]
          this.admin = {
            id: adminData.admin_id,
            email: adminData.correo,
            password: '',
            name: adminData.nombre,
            lastName1: adminData.apellido1,
            lastName2: adminData.apellido2,
            rol: adminData.rol,
            profilePicture: adminData.foto_perfil,
          }
          console.log('Admin cargado ', admin);
          console.log('Admin ', this.admin)
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del admin ', error)
      }
    });
  }

  onFileSelectedEvent(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.admin.profilePicture = e.target.result;
    };
    reader.readAsDataURL(file);

    this.onUpload();
  }

  onUpload(): void{
    if (this.selectedFile) {
      const adminId = this.admin.id;
      this.adminService.uploadProfileImage(adminId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Foto subida correctamente ', response)
        },
        error: (error) => {
          console.error('Error al subir la foto de perfil ', error);
        }
      });
    }
  }

  logOut() {
    this.router.navigate(['/login'])
  }

}
