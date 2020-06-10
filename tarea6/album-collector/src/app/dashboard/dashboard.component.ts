import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { ExplorerService } from '../dashboard.service';
import { AlbumType } from '../types/album';

// Basically this is the Explorer
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ExplorerComponent implements OnInit {
  title: string = 'Explorer';
  searchInput: string;
  currentResults: AlbumType[];
  private searchTerms = new Subject<string>();

  constructor(private explorerService: ExplorerService) { }

  search(term: string): void {
    this.searchInput = term;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.explorerService.searchAlbums(term))
    ).subscribe(response => {
      this.currentResults = response.results.albummatches.album;
    })
  }
}
