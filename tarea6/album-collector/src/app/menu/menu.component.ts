import { Component, OnInit } from '@angular/core';
import { AddCollection } from '../collections.actions';
import { CollectionsState } from '../collections.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CollectionType } from '../types/collection';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Select(CollectionsState.SelectAllItems) collections: Observable<CollectionType[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  addCollection(name: string) {
    this.store.dispatch(new AddCollection(name));
  }

}
