import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UserTable {
  @Input() columns: any[] = [];
  @Input() fieldMappings: any[] = [];
  @Input() data: any[] = [];
  @Input() showView = false;
  @Input() showEdit = false;
  @Input() showDelete = false;
  @Input() currentSortField = '';
  @Input() currentSortOrder = 'asc';

  @Output() viewUser = new EventEmitter<any>();
  @Output() editUser = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<string>();
  @Output() sortColumn = new EventEmitter<string>();

  onView(data: any) {
    this.viewUser.emit(data);
  }

  onEdit(data: any) {
    this.editUser.emit(data);
  }

  onDelete(id: string) {
    this.deleteUser.emit(id);
  }

}
