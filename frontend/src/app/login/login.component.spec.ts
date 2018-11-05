import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';
import { stubUserService } from '../stub';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: UserService, useValue: stubUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Not implemented for test.
  // it('signIn_emptyID', () => {
  //   spyOn(userService, 'signIn');
  //   spyOn(router, 'navigate');
  //   spyOn(window, 'alert');
  //   component.id = '';
  //   component.password = 'password';
  //   component.signIn();
  //   expect(window.alert).toHaveBeenCalled();
  //   expect(userService.signIn).not.toHaveBeenCalled();
  //   expect(router.navigateByUrl).not.toHaveBeenCalled();
  // });
  //
  // it('signIn_emptyPW', () => {
  //   spyOn(userService, 'signIn');
  //   spyOn(router, 'navigate');
  //   spyOn(window, 'alert');
  //   component.id = 'admin';
  //   component.password = '';
  //   component.signIn();
  //   expect(window.alert).toHaveBeenCalled();
  //   expect(userService.signIn).not.toHaveBeenCalled();
  //   expect(router.navigateByUrl).not.toHaveBeenCalled();
  // });

  it('signIn_success', () => {
    spyOn(userService, 'signIn');
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = 'admin';
    component.password = 'pw';
    component.signIn();
    expect(window.alert).not.toHaveBeenCalled();
    expect(userService.signIn).toHaveBeenCalledWith('admin', 'pw');
    expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
  });

  // Not implemented for test.
  // it('signUp_emptyID', () => {
  //   spyOn(userService, 'signUp');
  //   spyOn(router, 'navigate');
  //   spyOn(window, 'alert');
  //   component.id = '';
  //   component.password = 'password';
  //   component.signUp();
  //   expect(window.alert).toHaveBeenCalled();
  //   expect(userService.signUp).not.toHaveBeenCalled();
  //   expect(router.navigateByUrl).not.toHaveBeenCalled();
  // });
  //
  // it('signUp_emptyPW', () => {
  //   spyOn(userService, 'signUp');
  //   spyOn(router, 'navigate');
  //   spyOn(window, 'alert');
  //   component.id = 'admin';
  //   component.password = '';
  //   component.signUp();
  //   expect(window.alert).toHaveBeenCalled();
  //   expect(userService.signUp).not.toHaveBeenCalled();
  //   expect(router.navigateByUrl).not.toHaveBeenCalled();
  // });

  it('signUp', () => {
    spyOn(userService, 'signUp');
    spyOn(router, 'navigate');
    spyOn(window, 'alert');
    component.id = 'admin';
    component.password = 'pw';
    component.signUp();
    expect(window.alert).not.toHaveBeenCalled();
    expect(userService.signUp).toHaveBeenCalledWith('admin', 'pw');
    expect(router.navigate).toHaveBeenCalledWith(['/submit_time_table']);
  });
});
