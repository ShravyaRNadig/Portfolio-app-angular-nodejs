import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:5000/api/portfolio';

  constructor(private http: HttpClient) {}

  getPortfolioItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addPortfolioItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updatePortfolioItem(id: string, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deletePortfolioItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
