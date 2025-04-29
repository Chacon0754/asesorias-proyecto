import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { authGuard } from './auth.guard';
import { NewTeacherComponent } from './new-teacher/new-teacher.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { NewMajorComponent } from './new-major/new-major.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { AdvisoryRequestStudentComponent } from './advisory-request-student/advisory-request-student.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { EditMajorComponent } from './edit-major/edit-major.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewMajorComponent } from './view-major/view-major.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ViewTeacherAdvisorysComponent } from './view-teacher-advisorys/view-teacher-advisorys.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [authGuard]},
  { path: 'student-home', component: StudentHomeComponent, canActivate: [authGuard]},
  { path: 'teacher-home', component: TeacherHomeComponent, canActivate: [authGuard]},
  { path: 'new-teacher', component: NewTeacherComponent, canActivate: [authGuard]},
  { path: 'new-student', component: NewStudentComponent, canActivate: [authGuard]},
  { path: 'new-major', component: NewMajorComponent, canActivate: [authGuard]},
  { path: 'new-course', component: NewCourseComponent, canActivate: [authGuard]},
  {path: 'new-admin', component: NewAdminComponent, canActivate: [authGuard]},
  { path: 'advisory-request-student', component: AdvisoryRequestStudentComponent, canActivate: [authGuard]},
  { path: 'edit-major', component: EditMajorComponent, canActivate: [authGuard]},
  { path: 'edit-course', component: EditCourseComponent, canActivate: [authGuard]},
  { path: 'edit-student', component: EditStudentComponent, canActivate: [authGuard]},
  { path: 'edit-teacher', component: EditTeacherComponent, canActivate: [authGuard]},
  { path: 'view-teacher', component: ViewTeacherComponent, canActivate: [authGuard]},
  { path: 'view-student', component: ViewStudentComponent, canActivate: [authGuard]},
  { path: 'view-major', component: ViewMajorComponent, canActivate: [authGuard]},
  { path: 'view-course', component: ViewCourseComponent, canActivate: [authGuard] },
  { path: 'view-teacher-advisorys', component: ViewTeacherAdvisorysComponent, canActivate: [authGuard] },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
