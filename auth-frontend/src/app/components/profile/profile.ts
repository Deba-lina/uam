import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  userData: any = null;
  errorMessage = '';

  constructor(private authService: AuthService, private http: HttpClient,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const state = history.state;
    if (state.user) {

      this.userData = {
        ...state.user
      };
      this.cdr.detectChanges();
    } else {
      // Logged-in user's profile
      this.http.get('http://localhost:3000/api/profile')
        .subscribe({
          next: (response: any) => {
            this.userData = response.user;
             this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorMessage =
              'Could not load profile data';
          }
        });
    }
  }

  onLogout() {
    this.authService.logout();
  }

}
