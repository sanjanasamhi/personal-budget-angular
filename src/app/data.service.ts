import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/budget'; // Your API endpoint
  private cachedData: { title: string; budget: number; }[] | null = null; // Variable to store fetched data

  constructor(private http: HttpClient) { }

  getData(): Observable<{ title: string; budget: number; }[]> {
    // Check if cachedData is not null and return it as an observable
    if (this.cachedData) {
      return of(this.cachedData);
    }

    // If cachedData is empty, make an HTTP request
    return this.http.get<{ myBudget: { title: string; budget: number; }[] }>(this.apiUrl)
      .pipe(
        map(response => {
          this.cachedData = response.myBudget; // Cache the fetched data
          return this.cachedData;
        })
      );
  }
}
