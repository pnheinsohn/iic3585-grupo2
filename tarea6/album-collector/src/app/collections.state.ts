import { State, StateContext, Action, Selector } from '@ngxs/store';

import { AddCollection, DeleteCollection, AddToCollection, DelFromCollection } from './collections.actions';
import { CollectionType } from './types/collection';
import { Injectable } from '@angular/core';
import { AlbumType } from './types/album';

export interface CollectionsStateModel {
  collections: CollectionType[];
}

@State<CollectionsStateModel>({
  name: 'CollectionsState',
  defaults: {
    collections: [],
  },
})
@Injectable({ providedIn: 'root' })
export class CollectionsState {
  @Selector() static SelectAllItems(state: CollectionsStateModel): CollectionType[] {
    return state.collections;
  }

  @Action(AddCollection)
  addCollection(
    { getState, setState }: StateContext<CollectionsStateModel>,
    { payload }: AddCollection
  ) {
    const state = getState();
    if (state.collections.filter(collection => collection.name == payload).length != 0 || payload == '') {
      return;
    }
    const newCollection: CollectionType = {
      name: payload,
      albums: [],
    }
    setState({
      collections: [...state.collections, newCollection],
    });
  }

  @Action(DeleteCollection)
  deleteCollection(
    { getState, setState }: StateContext<CollectionsStateModel>,
    { payload }: DeleteCollection
  ) {
    const state = getState();
    const newList = this.arrayRemove(state.collections, payload);
    setState({
      ...state,
      collections: newList
    });
  }

  @Action(AddToCollection)
  addToCollection(
    { getState, setState }: StateContext<CollectionsStateModel>,
    { payload }: AddToCollection
  ) {
    const { album } = payload;
    const state = getState();
    const collection: CollectionType = state.collections.filter(elem => elem.name === payload.collection)[0];
    const result = collection.albums.filter(elem=>
      elem.name === album.name && elem.artist === album.artist &&
      elem.url === album.url && elem.streamable === album.streamable &&
      elem.mbid === album.mbid);
    if (result.length === 0) {
      const newCollection: CollectionType = {
        name: collection.name,
        albums: [...collection.albums, album],
      }
      const newCollections = this.arrayRemove(state.collections, collection.name);
      setState({
        ...state,
        collections: [...newCollections, newCollection],
      });
    }
  }

  @Action(DelFromCollection)
  delFromCollection(
    { getState, setState }: StateContext<CollectionsStateModel>,
    { payload }: DelFromCollection
  ) {
    const { album } = payload;
    const state = getState();
    const collection: CollectionType = state.collections.filter(elem => elem.name === payload.collection)[0];
    const newCollection: CollectionType = {
      name: collection.name,
      albums: collection.albums.filter(elem =>
        elem.name !== album.name || elem.artist !== album.artist ||
        elem.url !== album.url || elem.streamable !== album.streamable ||
        elem.mbid !== album.mbid),
    }
    const newCollections = this.arrayRemove(state.collections, collection.name);
    setState({
      ...state,
      collections: [...newCollections, newCollection]
    })
  }

  private arrayRemove(arr: CollectionType[], value: string): CollectionType[] {
    return arr.filter(elem => {
      return elem.name !== value;
    });
  }
}