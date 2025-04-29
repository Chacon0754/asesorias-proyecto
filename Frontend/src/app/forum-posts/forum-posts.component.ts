import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Post } from '../models/forum.model';

@Component({
  selector: 'app-forum-posts',
  templateUrl: './forum-posts.component.html',
  styleUrl: './forum-posts.component.css'
})
export class ForumPostsComponent implements OnInit{
  
  posts: Post[] = [];
  selectedPostId: number | null = null;
  responseContent: string = '';
  activeResponseFormPostId: number | null = null;


  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.forumService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log('Post de db: ', posts)
      console.log('Posts en this.posts: ',this.posts)
    });
  }

  toggleResponseForm(postId: number): void {
    this.activeResponseFormPostId = this.activeResponseFormPostId === postId ? null : postId;
  }

  onResponseCreated(): void {
    this.activeResponseFormPostId = null;
    this.loadPosts(); // Recargar los posts para ver las nuevas respuestas
  }

}
