import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type User = {
  id: number;
  name: string;
  age: number;
};

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users: User[] = [];
  name = '';
  age: number | null = null;
  editingId: number | null = null;
  message = '';
  isError = false;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    const response = await fetch('/api/users');
    this.users = await response.json();
    this.changeDetector.detectChanges();
  }

  async saveUser() {
    this.message = '';

    if (!this.name.trim() || this.age === null) {
      this.showMessage('Wypelnij imie i wiek.', true);
      return;
    }

    const user = {
      name: this.name.trim(),
      age: this.age
    };

    let url = '/api/users';
    let method = 'POST';

    if (this.editingId !== null) {
      url = '/api/users/' + this.editingId;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
      this.showMessage(data.error || 'Wystapil blad.', true);
      return;
    }

    if (this.editingId !== null) {
      this.showMessage('Uzytkownik zostal zaktualizowany.', false);
    } else {
      this.showMessage('Uzytkownik zostal dodany.', false);
    }

    this.clearForm();
    await this.loadUsers();
  }

  startEdit(user: User) {
    this.editingId = user.id;
    this.name = user.name;
    this.age = user.age;
    this.showMessage('Tryb edycji aktywny.', false);
  }

  async deleteUser(userId: number) {
    const response = await fetch('/api/users/' + userId, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
      this.showMessage(data.error || 'Nie udalo sie usunac uzytkownika.', true);
      return;
    }

    if (this.editingId === userId) {
      this.clearForm();
    }

    this.showMessage('Uzytkownik zostal usuniety.', false);
    await this.loadUsers();
  }

  cancelEdit() {
    this.clearForm();
    this.showMessage('Anulowano edycje.', false);
  }

  clearForm() {
    this.name = '';
    this.age = null;
    this.editingId = null;
  }

  showMessage(text: string, isError: boolean) {
    this.message = text;
    this.isError = isError;
  }
}
