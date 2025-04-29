import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { NewTeacherComponent } from './new-teacher/new-teacher.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { NewMajorComponent } from './new-major/new-major.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { AdvisoryRequestStudentComponent } from './advisory-request-student/advisory-request-student.component' 
import { HttpClientModule } from '@angular/common/http';
import { StudentHomeComponent } from './student-home/student-home.component';
import { EditMajorComponent } from './edit-major/edit-major.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { MatTableModule } from '@angular/material/table';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewMajorComponent } from './view-major/view-major.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { ViewTeacherAdvisorysComponent } from './view-teacher-advisorys/view-teacher-advisorys.component'
import { MatRadioModule } from '@angular/material/radio';
import { ForumPostsComponent } from './forum-posts/forum-posts.component';
import { ForumPostFormComponent } from './forum-post-form/forum-post-form.component'
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForumResponseFormComponent } from './forum-response-form/forum-response-form.component';
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    NewTeacherComponent,
    NewStudentComponent,
    NewMajorComponent,
    NewCourseComponent,
    AdvisoryRequestStudentComponent,
    EditMajorComponent,
    EditCourseComponent,
    EditStudentComponent,
    EditTeacherComponent,
    ViewTeacherComponent,
    ViewStudentComponent,
    ViewMajorComponent,
    ViewCourseComponent,
    NewAdminComponent,
    ViewTeacherAdvisorysComponent,
    ForumPostsComponent,
    ForumPostFormComponent,
    ForumResponseFormComponent,
    UserInfoDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
