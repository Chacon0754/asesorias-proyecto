import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { AdvisoryService } from '../services/advisory.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})

export class StudentHomeComponent implements OnInit {
  student: Student = {
    schoolId: 0,
    name: '',
    lastName1: '',
    lastName2: '',
    majorId: 1,
    numberOfSemester: 1,
    email: '',
    profilePicture: '',
    role: 'student',
    password: ''
  }
  
  selectedFile: File | null = null
  userRole: string = 'student';
  courses: string[] = [];
  advisorys: any[] = [];
  showNewPostForm = false;
  safeProfilePictureUrl: SafeUrl = '';


  constructor(private authService: AuthService, private router: Router, private studentService: StudentService, private advisoryService: AdvisoryService, private sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.loadStudentData(userDetails.id);
      this.loadProfileImage(userDetails.id);
      this.loadStudentAdvisorys(userDetails.id);
    }
  }

  loadProfileImage(studentId: number): void{
    this.studentService.getProfilePicture(studentId).subscribe(response => {
      this.safeProfilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000${response}`);
      console.log(this.safeProfilePictureUrl)
    }, error => {
      console.error('Error loading profile picture', error);
    });
  }
  loadStudentData(studentId: number): void {
    this.studentService.getStudentDataById(studentId).subscribe({
      next: (student) => {
        if (student) {
          const studentData = student[0];
          this.student = {
            schoolId: studentData.matricula,
            name: studentData.nombre,
            lastName1: studentData.ape1,
            lastName2: studentData.ape2,
            majorId: studentData.programa,
            numberOfSemester: studentData.semestre,
            email: studentData.correo,
            profilePicture: '',
            role: studentData.rol,
            password: ''
          }
          console.log('estudiante de DB: ', student);
          console.log('estudiante con datos: ', this.student)
        }
      }
    });
  }

  loadStudentAdvisorys(studentId: number): void{
    this.advisoryService.getAdvisorysByStudentId(studentId).subscribe({
      next: (advisorys) => {
        this.advisorys = advisorys;
        console.log('Asesorias: ', this.advisorys);
      },
      error: (error) => {
        console.error('Error al obtener asesorias: ', error);
      }
    });
  }

  logOut() {
    this.router.navigate(['/login'])
  }

  onFileSelectedEvent(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.student.profilePicture = e.target.result;
    };
    reader.readAsDataURL(file);

    this.onUpload();
  }

  onUpload(): void{
    if (this.selectedFile) {
      const studentId = this.student.schoolId;
      this.studentService.uploadProfileImage(studentId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Foto subida correctamente ', response)
        },
        error: (error) => {
          console.error('Error al subir la foto de perfil ', error);
        }
      });
    }
  }

  toggleNewPostForm() {
    this.showNewPostForm = !this.showNewPostForm;
  }

  onPostCreated() {
    this.showNewPostForm = false;
    window.location.reload();
  }
    
}
