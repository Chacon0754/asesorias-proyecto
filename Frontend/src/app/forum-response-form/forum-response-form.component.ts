import { Component, EventEmitter, Output, ViewChild, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { AuthService } from '../services/auth.service';
import { Response } from '../models/forum.model';

@Component({
  selector: 'app-forum-response-form',
  templateUrl: './forum-response-form.component.html',
  styleUrl: './forum-response-form.component.css'
})
export class ForumResponseFormComponent implements OnInit, AfterViewInit{
  @Input() postId!: number;
  @Output() responseCreated = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  response: Response = {
    id: 0,
    postId: 0, 
    author: '',
    role: '',
    content: '',
    createdAt: new Date()
  };
  selectedFile: File | null = null;

  role: string = '';

  constructor(private forumService: ForumService, private authService: AuthService) { }
  ngOnInit(): void {
    this.response.postId = this.postId;

    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.response.author = userDetails.name + ' ' + userDetails.lastName;
      this.response.role = userDetails.rol;
    }
    if (this.response.role === 'student') {
      this.role = 'Estudiante';
    } else if (this.response.role === 'teacher') {
      this.role = 'Maestro';
    }
    console.log(userDetails);
  }

  ngAfterViewInit(): void {
     this.fileInput 
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }


  onSubmit(): void{
    const formData = new FormData();
    formData.append('postId', this.response.postId.toString());
    formData.append('author', this.response.author);
    formData.append('role', this.response.role);
    formData.append('content', this.response.content);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    this.forumService.addResponse(formData).subscribe(response => {
      console.log('Response added: ', response);
      this.responseCreated.emit();
    });
  }

  onCancel(): void {
    this.responseCreated.emit();
  }
}
