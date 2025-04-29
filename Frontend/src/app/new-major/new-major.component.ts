import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MajorService } from '../services/major.service';
import { Major } from '../models/major.model';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';


@Component({
  selector: 'app-new-major',
  templateUrl: './new-major.component.html',
  styleUrl: './new-major.component.css'
})
export class NewMajorComponent implements OnInit{
  major: Major = {
    id: 0,
    name: '',
  }

  existingIds: number[] = [];
  newId: number = 0;
  newName: string = '';
  errorMessage: string = '';
  showError: boolean = false;


  constructor(private router: Router, private majorService: MajorService, private dialog: MatDialog) { 
    this.fetchAllIds();
  }
  
  ngOnInit(): void {
    console.log('Al iniciar: ', this.major);  
  }

  fetchAllIds(): void {
    this.majorService.getAllIds().subscribe({
      next: (ids) => {
        console.log('Ids obtenidos: ', ids);
        this.existingIds = ids;
        console.log('Ids existentes: ', this.existingIds)
      },
      error: (error) =>{
        console.error('Error al obtener los IDs', error.message)
      }
    })
  }

  onSubmit(): void {
    console.log('Al enviar: ', this.major);
    this.newId = this.major.id;
    this.newId = Number(this.newId);
    console.log('Existing IDs:', this.existingIds); 
    console.log('New ID:', this.newId);
    console.log(this.newId);
    if (this.existingIds.includes(this.newId)) {
      console.error("El id ya existe");
      this.errorMessage = 'El ID ya existe. por favor elige otro';
      this.showError = true;
      return;
    }
    this.showError = false;
    if (!this.major.id || !this.major.name) {
      console.error('ID no proporcionado', this.major.id, ' ',this.major.name);
      return
    }
    this.majorService.createMajor(this.major).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor: ', response);
        this.dialog.open(UserInfoDialogComponent, {
          data: {
            name: this.major.name,
            code: this.major.id
          }
        });
        this.router.navigate(['/admin-home']);
      },
      error: (error) => {
        console.error('Error al crear carrera: ', error.message);
      }
    });
  }


  onCancel() {
    console.log('bai bai')
    this.major = {
      id: 0,
      name: '',
    }
    this.router.navigate(['/admin-home'])
  }
}
