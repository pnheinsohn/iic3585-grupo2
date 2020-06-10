import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AlbumApiResponse } from './types/album';

@Injectable({providedIn: 'root'})
export class ExplorerService {
  private apiUrlStart: string = 'http://ws.audioscrobbler.com/2.0';
  private apiUrlEnding: string = '&api_key=26a99486ffe249719e660f338f6c3498&format=json';
  private albumsURL: string = `${this.apiUrlStart}/?method=album.search&album`;

  constructor(private http: HttpClient) { }

  searchAlbums(term: string): Observable<AlbumApiResponse> {
    if (!term.trim()) {
      return of({
        results: {
          albummatches: {
            album: [],
          },
        },
      });
    }
    return this.http.get<AlbumApiResponse>(`${this.albumsURL}=${term}/${this.apiUrlEnding}`).pipe(
      tap(x => x ?
        console.log(x) :
        console.log("didn't find results"))
    );
  }
}
