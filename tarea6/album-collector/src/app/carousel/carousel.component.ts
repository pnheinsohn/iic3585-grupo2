import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AlbumType } from '../types/album';
import { CollectionType } from '../types/collection';
import { CollectionsState } from '../collections.state';
import { AddToCollection, DelFromCollection } from '../collections.actions';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {
  @Select(CollectionsState.SelectAllItems) collections: Observable<CollectionType[]>;
  @Input() parent: string;
  @Input() searchInput: string;
  @Input() results: AlbumType[];

  selected: string;
  closeResult: string;
  customOptions: OwlOptions;

  constructor(private store: Store, private modalService: NgbModal) { }

  ngOnInit() {
    this.customOptions = {
      navSpeed: 700,
      margin: 10,
      responsive: {
        0: {
          items: 4,
        },
        1024: {
          items: 10,
        },
      },
    };
  }

  addToCollection(item: AlbumType) {
    if (!this.selected) {
      return;
    }
    const payload: {
      album: AlbumType;
      collection: string;
    } = {
      album: item,
      collection: this.selected,
    };
    this.store.dispatch(new AddToCollection(payload))
  }

  delFromCollection(item: AlbumType) {
    const payload: {
      album: AlbumType;
      collection: string;
    } = {
      album: item,
      collection: this.parent,
    }
    this.store.dispatch(new DelFromCollection(payload));
  }

  open(content: any, item: AlbumType) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'Add') {
        this.addToCollection(item);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
