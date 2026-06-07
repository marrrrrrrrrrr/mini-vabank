import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { API_URL } from './api-constants';
import { Account } from './account.model';

@Injectable({ providedIn: 'root' })
export class Accounts {
  private http = inject(HttpClient);

  readonly list = signal<Account[]>([]);

  loadForClient(clientId: string): Observable<Account[]> {
    return this.http.get<Record<string, Account> | null>(`${API_URL}/accounts.json`).pipe(
      map((data) => {
        if (!data) return [];
        return Object.entries(data)
          .map(([id, a]) => ({ ...a, id }))
          .filter((a) => a.clientId === clientId);
      }),
      tap((accounts) => this.list.set(accounts))
    );
  }

  create(account: Account): Observable<Account> {
    return this.http.post<{ name: string }>(`${API_URL}/accounts.json`, account).pipe(
      map((res) => ({ ...account, id: res.name }))
    );
  }

  remove(id: string): Observable<unknown> {
    return this.http.delete(`${API_URL}/accounts/${id}.json`);
  }

  totalFor(clientId: string): Observable<number> {
    return this.loadForClient(clientId).pipe(
      map((accounts) => accounts.reduce((sum, a) => sum + Number(a.amount || 0), 0))
    );
  }

  updateAmount(id: string, amount: number): Observable<unknown> {
    return this.http.patch(`${API_URL}/accounts/${id}.json`, { amount });
  }
}