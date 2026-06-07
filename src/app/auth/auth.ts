import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { API_URL } from '../shared/api-constants';
import { User } from '../shared/user.model';

const STORAGE_KEY = 'mbog_user';

@Injectable({ providedIn: 'root' })
export class Auth {
  readonly user = signal<User | null>(this.readFromStorage());

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this.user() !== null;
  }

  register(newUser: User): Observable<User> {
    return this.http.post<{ name: string }>(`${API_URL}/users.json`, newUser).pipe(
      map((res) => ({ ...newUser, id: res.name })),
      tap((user) => this.setUser(user))
    );
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<Record<string, User> | null>(`${API_URL}/users.json`).pipe(
      map((data) => {
        if (!data) return null;
        const entry = Object.entries(data).find(
          ([, u]) => u.username === username && u.password === password
        );
        return entry ? { ...entry[1], id: entry[0] } : null;
      }),
      tap((user) => {
        if (user) this.setUser(user);
      })
    );
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private setUser(user: User): void {
    this.user.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private readFromStorage(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }
}