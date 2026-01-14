export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnailSrc: string;
}

// The Product interface is defined in src/data/products.ts