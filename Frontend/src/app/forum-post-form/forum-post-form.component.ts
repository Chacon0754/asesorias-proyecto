import { Component, EventEmitter, Output, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Post } from '../models/forum.model';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forum-post-form',
  templateUrl: './forum-post-form.component.html',
  styleUrl: './forum-post-form.component.css'
})
export class ForumPostFormComponent implements OnInit{
  @Output() postCreated = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  post: Post = {
    id: 0,
    author: '',
    role: '',
    content: '',
    createdAt: new Date()
  };
  selectedFile: File | null = null;
  role: string = '';
  myForm!: FormGroup 

  constructor(private forumService: ForumService, private authService: AuthService, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.post.author = userDetails.name + ' ' + userDetails.lastName;
      this.post.role = userDetails.rol;

    }
    if (this.post.role === 'student') {
      this.role = 'Estudiante'
    } else if (this.post.role === 'teacher') {
      this.role = 'Maestro'
    }
    this.myForm = this.fb.group({
      myTextField: ['', [Validators.required, Validators.maxLength(5000)]]
    });
    console.log(userDetails)
  
  }

  ngAfterViewInit(): void {
      
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  get myTextField() {
    return this.myForm.get('myTextField');
  }

  onSubmit() {
    if (this.post.content.length <= 5000) {
      const formData = new FormData();
    formData.append('author', this.post.author);
    formData.append('role', this.post.role);
    formData.append('content', this.post.content);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.forumService.addPost(formData).subscribe(post => {
      console.log('Post added: ', post)
    })
    console.log(formData.get('file'))
    this.postCreated.emit();
    } else {
      console.error("El post debe tener menos de 5000 caracteres")
    }
    
  }
  onCancel() {
    this.postCreated.emit();
  }
}
