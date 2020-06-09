export type AlbumApiResponse = {
  results: {
    albummatches: {
      album: any[],
    },
  },
};

export type AlbumType = {
  name: string,
  artist: string,
  url: string,
  streamable: string,
  mbid: string,
  image: {
    size: string,
    '#text': string,
  }[],
}