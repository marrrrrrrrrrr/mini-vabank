import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { API_URL } from './api-constants';
import { Client } from './client.model';

const SELECTED_KEY = 'mbog_client';

@Injectable({ providedIn: 'root' })
export class Clients {
  private http = inject(HttpClient);

  readonly results = signal<Client[]>([]);
  readonly selected = signal<Client | null>(this.readSelected());

  search(firstName: string, lastName: string, clientKey: string): Observable<Client[]> {
    return this.http.get<Record<string, Client> | null>(`${API_URL}/clients.json`).pipe(
      map((data) => {
        if (!data) return [];
        let list = Object.entries(data).map(([id, c]) => ({ ...c, id }));
        if (firstName.trim())
          list = list.filter((c) => c.firstName?.toLowerCase().includes(firstName.toLowerCase()));
        if (lastName.trim())
          list = list.filter((c) => c.lastName?.toLowerCase().includes(lastName.toLowerCase()));
        if (clientKey.trim())
          list = list.filter((c) => String(c.clientKey) === clientKey.trim());
        return list;
      }),
      tap((list) => this.results.set(list))
    );
  }

  create(client: Client): Observable<Client> {
    return this.http.post<{ name: string }>(`${API_URL}/clients.json`, client).pipe(
      map((res) => ({ ...client, id: res.name }))
    );
  }

  loadOne(id: string): Observable<Client> {
    return this.http.get<Client>(`${API_URL}/clients/${id}.json`).pipe(
      map((c) => ({ ...c, id })),
      tap((c) => this.setSelected(c))
    );
  }

  setSelected(client: Client | null): void {
    this.selected.set(client);
    if (client) localStorage.setItem(SELECTED_KEY, JSON.stringify(client));
    else localStorage.removeItem(SELECTED_KEY);
  }

  private readSelected(): Client | null {
    const raw = localStorage.getItem(SELECTED_KEY);
    return raw ? (JSON.parse(raw) as Client) : null;
  }
}