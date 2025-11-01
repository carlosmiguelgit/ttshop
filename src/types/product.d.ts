export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnailSrc: string;
}

// O tipo Product será importado do src/data/products.ts
// export interface Product { ... }