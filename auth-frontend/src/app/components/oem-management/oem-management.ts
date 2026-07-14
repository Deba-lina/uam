import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-oem-management',
  imports: [CommonModule],
  templateUrl: './oem-management.html',
  styleUrl: './oem-management.css',
})
export class OemManagement {
  selectedFile: File | null = null;

isDragging = false;

onDragOver(event: DragEvent): void {
  event.preventDefault();
  this.isDragging = true;
}

onDragLeave(event: DragEvent): void {
  event.preventDefault();
  this.isDragging = false;
}

onDrop(event: DragEvent): void {

  event.preventDefault();

  this.isDragging = false;

  if (!event.dataTransfer?.files.length) {
    return;
  }

  const file = event.dataTransfer.files[0];

  this.validateFile(file);
}

onFileSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (!input.files?.length) {
    return;
  }

  this.validateFile(input.files[0]);
}

validateFile(file: File): void {

  const allowedExtensions = ['xlsx', 'xls'];

  const extension = file.name.split('.').pop()?.toLowerCase();

  if (!extension || !allowedExtensions.includes(extension)) {
    alert('Only Excel files are allowed.');
    this.selectedFile = null;
    return;
  }

  this.selectedFile = file;
}

uploadExcel() {

  if (!this.selectedFile) return;

  console.log(this.selectedFile);

  // Backend API call here
}
}
