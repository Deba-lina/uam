import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  userForm: FormGroup;


  roles = ['Admin', 'Manager', 'User'];

  sites = [
    'Delhi',
    'Mumbai',
    'Bangalore'
  ];

  teams = [
    'Development',
    'Testing',
    'Support'
  ];

  teamRoles = [
    'Lead',
    'Member'
  ];

  editingUser: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      site: ['', Validators.required],
      team: ['', Validators.required],
      teamRole: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    const state = history.state;

    if (state.user) {

  this.editingUser = state.user;

  this.userForm.patchValue({
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    role: state.user.role,
    site: state.user.site,
    team: state.user.team,
    teamRole: state.user.teamRole
  });

  this.userForm.get('password')
      ?.clearValidators();

  this.userForm.get('password')
      ?.updateValueAndValidity();

}
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.editingUser) {
      this.authService
        .updateUser(
          this.editingUser._id,
          this.userForm.value
        )
        .subscribe({
          next: () => {
            alert('User updated successfully');
            this.editingUser = null;
            this.userForm.reset();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.log(err);
            alert('Failed to update user');
          }
        });

    } else {
      this.authService
        .createUser(this.userForm.value)
        .subscribe({
          next: () => {
            alert('User created successfully');
            this.userForm.reset();
            this.cdr.detectChanges();
          },

          error: (err) => {
            console.log(err);
            alert('Failed to create user');
          }
        });
    }
  }
}


