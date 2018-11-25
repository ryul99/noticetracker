import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NewsfeedComponent } from './newsfeed.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';
import { stubUserService } from '../stub';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;
  let router: Router;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsfeedComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: UserService, useClass: stubUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitTimeTable', () => {
    spyOn(router, 'navigate');
    component.submitTimeTable();
    expect(router.navigate).toHaveBeenCalledWith(['/submit_time_table']);
  });

  it('siteRecommendation', () => {
    spyOn(router, 'navigate');
    component.siteRecommendation();
    expect(router.navigate).toHaveBeenCalledWith(['/site_recommendation']);
  });

  it('signOut', () => {
    spyOn(router, 'navigate');
    spyOn(userService, 'signOut');
    component.signOut();
    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(userService.signOut).toHaveBeenCalled();
  });
});
