import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher.model';
import { AdvisoryService } from '../services/advisory.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrl: './teacher-home.component.css'
})
export class TeacherHomeComponent implements OnInit {
  teacher: Teacher = {
    id: 0,
    name: '',
    lastName1: '',
    lastName2: '',
    email: '',
    majorId: 0,
    courseId: 0,
    courseIds: [],
    scheduleIds: [],
    role: 'teacher',
    profilePicture: '',
    password: ''
  };
  selectedFile: File | null = null;
  courses: any[] = [];
  advisorys: any[] = []
  showNewPostForm = false;
  safeProfilePictureUrl: SafeUrl = '';



  constructor(private authService: AuthService,  private router: Router, private teacherService: TeacherService, private advisoryService: AdvisoryService, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.loadTeacherData(userDetails.id);
      this.loadProfileImage(userDetails.id);
      this.loadTeacherAdvisorys(userDetails.id);
    }
  }
  
  loadProfileImage(teacherId: number): void{
    this.teacherService.getProfilePicture(teacherId).subscribe(response => {
      this.safeProfilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000${response}`);
      console.log(this.safeProfilePictureUrl)
    }, error => {
      console.error('Error loading profile picture', error);
    });
  }

  loadTeacherData(teacherId: number): void{
    this.teacherService.getTeacherDataById(teacherId).subscribe({
      next: (teacher) => {
        if (teacher) {
          const teacherData = teacher[0];
          this.teacher = {
            id: teacherData.Id_docente,
            name: teacherData.nombre_doc,
            lastName1: teacherData.Apellido,
            lastName2: teacherData.apei2,
            email: teacherData.correo,
            majorId: teacherData.id_carrera_mat,
            courseId: 0,
            courseIds: teacherData.id_mat_as,
            scheduleIds: [],
            role: teacherData.rol_doc,
            profilePicture: '',
            password: ''
          }
          console.log('Teacher de DB: ', teacher);
          console.log('Teacher Front: ', this.teacher);
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del docente: ', error)
      }
    });
  }

  loadTeacherAdvisorys(teacherId: number): void {
    this.advisoryService.getAdvisorysByTeacherId(teacherId).subscribe({
      next: (advisorys) => {
        this.advisorys = advisorys;
        console.log('Asesorias: ', this.advisorys);
      },
      error: (error) => {
        console.error('Error al obtener asesorias: ', error);
      }
    });
  }

  onFileSelectedEvent(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.teacher.profilePicture = e.target.result;
    };
    reader.readAsDataURL(file);

    this.onUpload();
  }

  onUpload(): void{
    if (this.selectedFile) {
      const teacherId = this.teacher.id;
      console.log(teacherId)
      this.teacherService.uploadProfileImage(teacherId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Foto subida correctamente ', response)
        },
        error: (error) => {
          console.error('Error al subir la foto de perfil ', error);
        }
      });
    }
  }
  
  logOut(): void{
    this.router.navigate(['/login'])
  }

  toggleNewPostForm() {
    this.showNewPostForm = !this.showNewPostForm;
  }

  onPostCreated() {
    this.showNewPostForm = false;
    window.location.reload();
  }
}


