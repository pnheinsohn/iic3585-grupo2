import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { DashboardService } from '../dashboard.service';
import { AlbumApiResponse, AlbumType } from '../types/album';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string = 'Explorer';
  searchInput: string;
  currentResults: AlbumType[];
  private searchTerms = new Subject<string>();

  constructor(private dashboardService: DashboardService) { }

  search(term: string): void {
    this.searchInput = term;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dashboardService.searchAlbums(term))
    ).subscribe(response => {
      this.currentResults = response.results.albummatches.album;
    })
  }
}
