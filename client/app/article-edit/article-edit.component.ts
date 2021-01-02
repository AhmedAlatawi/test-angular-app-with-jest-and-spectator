import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Author } from '../models/author';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  @Input() article: Article;
  @Output() action = new EventEmitter<string>();

  title = '';
  subjectMatter = '';
  body = '';

  showAuthorForm = false;

  private _isFormValid: boolean;

  constructor(private router: Router, private dataSvc: DataService) { }

  ngOnInit(): void {
    if (this.article) {
      this.title = this.article.title;
      this.subjectMatter = this.article.subjectMatter;
      this.body = this.article.body;
    }
  }

  cancel() {
    this.article ? this.action.emit('cancel') : this.router.navigate(['/articles']);
  }

  next() {
    this._isFormValid = true;
    document.getElementById("articleForm").querySelectorAll("[required]").forEach((elm: any) => {
      if (!this._isFormValid) return;
      if (!elm.value) this._isFormValid = false;
    });
    if (this._isFormValid) {
      this.showAuthorForm = true;
    }
  }

  submittedAuthor(author: Author) {
    let operation: Observable<Article>;
    this.article = this.article ? this.article : {} as Article;
    this.article.title = this.title;
    this.article.subjectMatter = this.subjectMatter;
    this.article.body = this.body;
    this.article.author = author;
    this.article.id ? operation = this.dataSvc.updateArticle(this.article) : operation = this.dataSvc.addArticle(this.article);
    
    operation.subscribe(article => this.router.navigate(['/articles']));
  }

}
