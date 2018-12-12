import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';
import { mockUserService } from '../mock';
import { of } from 'rxjs';

class notAuth_mockUserService extends mockUserService {
  authorized() {
    return of(false).toPromise();
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: UserService, useClass: notAuth_mockUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signIn_emptyID', () => {
    spyOn(userService, 'signIn').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = '';
    component.password = 'password';
    component.signIn();
    expect(window.alert).toHaveBeenCalled();
    expect(userService.signIn).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('signIn_emptyPW', () => {
    spyOn(userService, 'signIn').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = 'minty';
    component.password = '';
    component.signIn();
    expect(window.alert).toHaveBeenCalled();
    expect(userService.signIn).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('signIn_success', async(() => {
    spyOn(userService, 'signIn').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = 'minty';
    component.password = 'pw';
    component.signIn();
    fixture.whenStable().then(() => {
      expect(window.alert).not.toHaveBeenCalled();
      expect(userService.signIn).toHaveBeenCalledWith('minty', 'pw');
      expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
    });
  }));

  it('signUp_emptyID', () => {
    spyOn(userService, 'signUp').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = '';
    component.password = 'password';
    component.signUp();
    expect(window.alert).toHaveBeenCalled();
    expect(userService.signUp).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('signUp_emptyPW', () => {
    spyOn(userService, 'signUp').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = 'minty';
    component.password = '';
    component.signUp();
    expect(window.alert).toHaveBeenCalled();
    expect(userService.signUp).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('signUp_success', async(() => {
    spyOn(userService, 'signUp').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = 'minty';
    component.password = 'pw';
    component.signUp();
    fixture.whenStable().then(() => {
      expect(window.alert).not.toHaveBeenCalled();
      expect(userService.signUp).toHaveBeenCalledWith('minty', 'pw');
      expect(router.navigate).toHaveBeenCalledWith(['/submit_time_table']);
    });
  }));
});
