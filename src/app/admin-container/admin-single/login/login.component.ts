import { Router } from '@angular/router';
import { SnackbarService } from './../../admin-shared/services/snackbar.service';
import { AuthService } from './../../admin-core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private authService:AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
   }

  ngOnInit() {
  }

  login(username, password) {
    this.loading = true;
    this.authService.login(username, password)
    .then(() => {
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      switch (err.message) {
        case "There is no user record corresponding to this identifier. The user may have been deleted." : 
          this.snackbarService.openSnackBar("Lỗi không tồn tại người dùng này", "Đóng", 5000)
        case "The email address is badly formatted.": 
          this.snackbarService.openSnackBar("Lỗi email không đúng định dạng", "Đóng", 5000)
        case "The password is invalid or the user does not have a password.": 
          this.snackbarService.openSnackBar("Lỗi mật khẩu không đúng hoặc chưa nhập mật khẩu", "Đóng", 5000)
        case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
          this.snackbarService.openSnackBar("Lỗi không truy cập được mạng, đang tự động refesh lại trang", "Đóng", 5000);
          this.router.navigate(['/login'])
      }
    });
  }

  loginFacebook() {
    this.loading = true;
    this.authService.loginFB()
     .then(() => {
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      switch (err.message) {
        case "There is no user record corresponding to this identifier. The user may have been deleted." : 
          this.snackbarService.openSnackBar("Lỗi không tồn tại người dùng này", "Đóng", 5000)
        case "The email address is badly formatted.": 
          this.snackbarService.openSnackBar("Lỗi email không đúng định dạng", "Đóng", 5000)
        case "The password is invalid or the user does not have a password.": 
          this.snackbarService.openSnackBar("Lỗi mật khẩu không đúng hoặc chưa nhập mật khẩu", "Đóng", 5000)
        case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
          this.snackbarService.openSnackBar("Lỗi không truy cập được mạng, đang tự động refesh lại trang", "Đóng", 5000);
          this.router.navigate(['/login'])
      }
    });
  }

  loginGoogle() {
    this.loading = true;
    this.authService.loginGG()
     .then(() => {
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      switch (err.message) {
        case "There is no user record corresponding to this identifier. The user may have been deleted." : 
          this.snackbarService.openSnackBar("Lỗi không tồn tại người dùng này", "Đóng", 5000)
        case "The email address is badly formatted.": 
          this.snackbarService.openSnackBar("Lỗi email không đúng định dạng", "Đóng", 5000)
        case "The password is invalid or the user does not have a password.": 
          this.snackbarService.openSnackBar("Lỗi mật khẩu không đúng hoặc chưa nhập mật khẩu", "Đóng", 5000)
        case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
          this.snackbarService.openSnackBar("Lỗi không truy cập được mạng, đang tự động refesh lại trang", "Đóng", 5000);
          this.router.navigate(['/login'])
      }
    });
  }

}
