import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Response } from '../models/forum.model';


@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:3000/api/forum';

  constructor(private http: HttpClient) { }
  
  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  addPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, postData);
  }

  addResponse(responseData: FormData): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/response`, responseData);
  }
}
