import { AlbumType } from './types/album';

export class AddCollection {
  static readonly type = '[Collection] Add Collection';
  constructor(public readonly payload: string) { }
}
export class DeleteCollection {
  static readonly type = '[Collection] Delete Collection';
  constructor(public readonly payload: string) { }
}

export class AddToCollection {
  static readonly type = '[Collection] Add item to Collection';
  constructor(public readonly payload: {album: AlbumType, collection: string}) { }
}

export class DelFromCollection {
  static readonly type = '[Collection] Del item from Collection';
  constructor(public readonly payload: {album: AlbumType, collection: string}) { }
}