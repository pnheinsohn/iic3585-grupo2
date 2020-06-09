import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CollectionsState } from '../collections.state';
import { CollectionType } from '../types/collection';
import { AlbumType } from '../types/album';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @Select(CollectionsState.SelectAllItems) collections: Observable<CollectionType[]>;
  name: string;
  albums: AlbumType[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.collections.subscribe(collections => {
        const collection = collections.filter(collection => collection.name === this.name)[0];
        if (collection) {{
          this.albums = collection.albums;
        }}
      });
    });
  }
}
