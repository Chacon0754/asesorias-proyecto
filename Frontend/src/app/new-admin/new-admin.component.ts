import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin.model';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrl: './new-admin.component.css'
})
export class NewAdminComponent {
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
  constructor(private router: Router, private adminService: AdminService, private dialog: MatDialog) { }
  
  onSubmit(): void {
    this.adminService.createAdmin(this.admin).subscribe({
      next: (response) => {
        console.log('Admin creado correctamente', response);
        this.dialog.open(UserInfoDialogComponent, {
          data: {
            name: `${this.admin.name} ${this.admin.lastName1} ${this.admin.lastName2}`,
            email: this.admin.email,
            password: response.password,
            subject: 'Administrador'
          }
        });
        this.router.navigate(['/admin-home']);
      },
      error: (error) => {
        console.error('Error al crear admin', error)
      }
    });
  }


  onCancel(): void {
    console.log("Cancelao")
    this.admin = {
      id: 0,
    email: '',
    password: '',
    name: '',
    lastName1: '',
    lastName2: '',
      rol: '',
    profilePicture: '',
    }
    this.router.navigate(['admin-home'])
  }
}
