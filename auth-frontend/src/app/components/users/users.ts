import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserTable } from '../user-table/user-table';
import { AuthService } from '../../services/auth';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, UserTable],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users implements OnInit {

  users: any[] = [];
  private searchSubject = new Subject<string>();

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  sortField = 'firstName';
  sortOrder = 'asc';

  columns = [
    {
      label: 'First Name',
      field: 'firstName',
      sortable: true
    },
    {
      label: 'Last Name',
      field: 'lastName',
      sortable: true
    },
    {
      label: 'Email',
      field: 'email',
      sortable: true
    },
    {
      label: 'Role',
      field: 'role',
      sortable: true
    }
  ];

  fieldMappings = [
    'firstName',
    'lastName',
    'email',
    'role'
  ];

  filteredUsers: any[] = [];

  searchText = '';

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.getUsers();

    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(searchValue => {

        console.log('Debounced Search:', searchValue);

        this.performSearch(searchValue);

        this.cdr.detectChanges();
      });

  }

  getUsers() {
    this.authService
      .getUsers(
        this.currentPage,
        this.pageSize,
        this.sortField,
        this.sortOrder
      )
      .subscribe({
        next: (response: any) => {
          this.users = response.users;
          this.filteredUsers = [...response.users];
          this.totalPages = response.totalPages;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  searchUsers() {

    console.log('Input Changed:', this.searchText);

    this.searchSubject.next(
      this.searchText
    );

  }

  viewUser(user: any) {
    this.router.navigate(
      ['/profile'],
      {
        state: { user }
      }
    );
  }

  editUser(user: any) {
    this.router.navigate(
      ['/add-user'],
      {
        state: { user }
      }
    );
  }

  deleteUser(id: string) {
    if (!confirm('Delete this user?')) {
      return;
    }
    this.authService
      .deleteUser(id)
      .subscribe({
        next: () => {
          this.getUsers();
        },
        error: err => console.log(err)
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUsers();
    }
  }

  previousPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.getUsers();

    }

  }

  onSort(field: string) {

    if (
      this.sortField === field &&
      this.sortOrder === 'asc'
    ) {

      this.sortOrder = 'desc';

    } else {

      this.sortField = field;
      this.sortOrder = 'asc';

    }

    this.getUsers();

  }

  performSearch(searchValue: string) {
    console.log(
      'Searching for:',
      searchValue
    );
    this.filteredUsers = this.users.filter(user =>

      user.firstName
        .toLowerCase()
        .includes(searchValue.toLowerCase())

      ||

      user.lastName
        .toLowerCase()
        .includes(searchValue.toLowerCase())

      ||

      user.email
        .toLowerCase()
        .includes(searchValue.toLowerCase())

    );

  }

}
