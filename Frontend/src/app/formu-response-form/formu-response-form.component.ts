import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Response } from '../models/forum.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-formu-response-form',
  templateUrl: './formu-response-form.component.html',
  styleUrl: './formu-response-form.component.css'
})
export class FormuResponseFormComponent implements OnInit {
  @Output() responseCreated = new EventEmitter<void>();

  reponse: Response = [

  ]
}
