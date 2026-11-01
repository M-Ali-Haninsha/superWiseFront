import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { showError } from 'src/app/core/notify';
import { Category } from 'src/app/models/api.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css'],
  standalone: false,
})
export class AdminDialogComponent implements OnInit {
  private service = inject(AdminServiceService);
  private ref = inject<MatDialogRef<AdminDialogComponent, string>>(MatDialogRef);
  editData = inject<Category | null>(MAT_DIALOG_DATA, { optional: true });

  tittle = 'add category';
  buttonName = 'add';
  private image: File | null = null;
  categoryForm = inject(FormBuilder).nonNullable.group({
    categoryName: ['', Validators.required],
    file: [''],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.editData) {
      this.tittle = 'edit category';
      this.buttonName = 'update';
      this.categoryForm.patchValue({
        categoryName: this.editData.name,
        description: this.editData.description,
      });
    }
  }

  onFileSelected(event: Event): void {
    this.image = (event.target as HTMLInputElement).files?.[0] ?? null;
  }

  addCategory(): void {
    if (this.categoryForm.invalid) return;
    if (!this.editData && !this.image) {
      showError(null, 'Please choose an image for the category');
      return;
    }

    const { categoryName, description } = this.categoryForm.getRawValue();
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('description', description);
    if (this.image) formData.append('file', this.image);

    const request = this.editData
      ? this.service.editCategory(formData, this.editData._id)
      : this.service.addCategory(formData);
    request.subscribe({
      next: () => this.ref.close(this.editData ? 'edit' : 'add'),
      error: (err: unknown) => showError(err),
    });
  }
}
