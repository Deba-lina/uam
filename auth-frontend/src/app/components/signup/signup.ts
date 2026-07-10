import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  signupData = { email: '', password: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSignup() {
    this.successMessage = '';
    this.errorMessage = '';

    const { email, password } = this.signupData;


    this.authService.signUp(email, password).subscribe({
      next: () => {
        this.successMessage =
          'Registration successful! Please login.';

        this.signupData = { email: '', password: '' };
      },


      error: (err) => {
        this.errorMessage =
          err.error?.message ||
          'Signup failed. Please try again.';
      },
    });
  }

}
