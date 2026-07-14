import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserTable } from '../user-table/user-table'; 
import { Oem } from '../../services/oem';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-oem-management',
  standalone: true,
  imports: [
    CommonModule,
    UserTable
  ],
  templateUrl: './oem-management.html',
  styleUrl: './oem-management.css',
})
export class OemManagement implements OnInit {

  selectedFile: File | null = null;

  isDragging = false;


  oemData: any[] = [];

  columns = [
    { label: 'OEM Name', field: 'oemName' },
    { label: 'Make', field: 'make' },
    { label: 'Capacity', field: 'capacity' },
    { label: 'Installation Date', field: 'installationDate' },
    { label: 'Site', field: 'site' },
    { label: 'State', field: 'state' }
  ];

  fieldMappings = [
    'oemName',
    'make',
    'capacity',
    'installationDate',
    'site',
    'state'
  ];

  constructor(
    private oemService: Oem,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOems();
  }

  loadOems(): void {

    this.oemService.getOems().subscribe({
      next: (data) => {
        // this.oemData = data;
        this.oemData = data.map(item => ({
        ...item,
        installationDate: new Date(item.installationDate)
          .toLocaleDateString('en-GB')
      }));
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      }

    });

  }

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
    const extension = file.name
      .split('.')
      .pop()
      ?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {

      alert('Only Excel files are allowed.');
      this.selectedFile = null;
      return;

    }

    this.selectedFile = file;

  }

  uploadExcel(): void {

    if (!this.selectedFile) {
      return;
    }

    this.oemService.uploadExcel(this.selectedFile).subscribe({
      next: (res) => {
        alert(res.message);
        this.selectedFile = null;
        this.loadOems();
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);
        alert('Upload Failed');

      }

    });

  }

}