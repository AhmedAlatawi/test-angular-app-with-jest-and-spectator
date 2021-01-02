import { MockComponent } from 'ng-mocks';
import { FormsModule } from '@angular/forms';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { QuillEditorComponent } from 'ngx-quill';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { DataService } from '../services/data.service';
import { ArticleEditComponent } from './article-edit.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const mockDataService = {
  addArticle: (article) => of({}),
  updateArticle: (article) => of({})
};

describe('ArticleEditComponent', () => {
  let spectator: Spectator<ArticleEditComponent>;
  let createComponent = createComponentFactory({
    component: ArticleEditComponent,
    imports: [FormsModule],
    componentMocks: [Router],
    providers: [
      mockProvider(DataService, mockDataService)
    ],
    declarations: [AuthorFormComponent, MockComponent(QuillEditorComponent)]
  });

  const updateArticleSpy = jest.spyOn(mockDataService, 'updateArticle');
  const addArticleSpy = jest.spyOn(mockDataService, 'addArticle');

  beforeEach(() => spectator = createComponent());
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the article form', () => {
    expect(spectator.query('form').getAttribute('name')).toEqual('articleForm');
  });

  describe('ngOnInit', () => {
    it('should assign title, subjectMatter, and body the correct values', () => {
      spectator.component.article = {
        title: 'Spectator Test',
        subjectMatter: 'unit tests',
        body: 'this is a test example'
      } as any;

      spectator.component.ngOnInit();

      expect(spectator.component.title).toBe('Spectator Test');
      expect(spectator.component.subjectMatter).toBe('unit tests');
      expect(spectator.component.body).toBe('this is a test example');
    });
  });

  describe('cancel method', () => {
    it('should navigate to the Articles page when attempting to create a new article', () => {
      const routerSpy = spectator.inject(Router, true);
      const cancelBtn = spectator.fixture.debugElement.nativeElement.querySelector('#cancel');

      cancelBtn.click();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
    });

    it('should emit cancel action when attempting to edit selected article', () => {
      spectator.component.article = {
        id: 'someId'
      } as any;

      const actionEmitSpy = spyOn(spectator.component.action, 'emit');
      const cancelBtn = spectator.fixture.debugElement.nativeElement.querySelector('#cancel');

      cancelBtn.click();

      expect(actionEmitSpy).toHaveBeenCalledWith('cancel');
    })
  });

  describe('next method', () => {
    it('should showAuthorForm be false when form is invalid', () => {
      const nextBtn = spectator.fixture.debugElement.nativeElement.querySelector('#next');

      nextBtn.click();

      expect(spectator.component.showAuthorForm).toBe(false);
    });

    it('should showAuthorForm be true when form is valid', () => {
      spectator.fixture.debugElement.nativeElement.querySelector('#title').value = 'Test Article';
      spectator.fixture.debugElement.nativeElement.querySelector('#subjectMatter').value = 'test subject';

      const nextBtn = spectator.fixture.debugElement.nativeElement.querySelector('#next');

      nextBtn.click();

      expect(spectator.component.showAuthorForm).toBe(true);
    });
  });

  describe('submittedAuthor', () => {
    it('should call updateArticle with the correct param when updating an exsting article', () => {
      const routerSpy = spectator.inject(Router, true);
      const author = {
        id: 'someId'
      } as any;
      const article = {
        id: 'someId',
        title: 'Test Spectator',
        subjectMatter: 'unit tests',
        body: 'some content',
        author
      };
      spectator.component.article = {
        id: article.id
      } as any;
      spectator.component.title = article.title;
      spectator.component.subjectMatter = article.subjectMatter;
      spectator.component.body = article.body;

      spectator.component.submittedAuthor(author);

      expect(spectator.component.article).toEqual(article);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
      expect(updateArticleSpy).toHaveBeenCalledWith(article);
    });

    it('should call addArticle with the correct param when creating a new article', () => {
      const routerSpy = spectator.inject(Router, true);
      const author = {
        id: 'someId'
      } as any;
      const article = {
        title: 'Test Spectator',
        subjectMatter: 'unit tests',
        body: 'some content',
        author
      };
      spectator.component.title = article.title;
      spectator.component.subjectMatter = article.subjectMatter;
      spectator.component.body = article.body;

      spectator.component.submittedAuthor(author);

      expect(spectator.component.article).toEqual(article);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
      expect(addArticleSpy).toHaveBeenCalledWith(article);
    });
  });

});
