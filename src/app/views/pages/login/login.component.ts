import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective  } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from "../../../api/services";
import { LoginRequest } from "../../../api/models/login-request";
// import { cilEye } from '@coreui/icons';
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [CommonModule,ReactiveFormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  loginForm: FormGroup;
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private _loginService: LoginService
    ) {
      
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
    showPassword: boolean = false;
    isLoginSuccess: boolean = false;
    isInvalid(field: string): boolean {
      const control = this.loginForm.get(field);
      return control ? control.invalid && (control.dirty || control.touched) : false;
    }
  onLogin() {
    if (this.loginForm.invalid) {
      
      this.loginForm.markAllAsTouched(); // Đánh dấu tất cả để hiện lỗi
      return;
    }
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    
    console.log(username,password)
    if (username && password) {
      // Nếu nhập đủ username và password
      var params ={
        body:{
          username: username,
          password : password
        }
      }  

      this._loginService.apiLoginLoginPost$Response(params).subscribe({
        next: (response) => {
          console.log('Login success:', response);
        },
        error: (error) => {
          console.error('Login error:', error);
        },
        complete: () => {
          console.log('Login request complete.');
        }
      });
      console.log('Đăng nhập thành công:', username, password);
      // this.router.navigate(['/dashboard']).then(success => {
      //   console.log('Điều hướng thành công?', success);
      //   this.isLoginSuccess = true;
      // });
    } else {
      console.log('Vui lòng nhập Username và Password!');
    }
    // Add login logic here
  }
}
