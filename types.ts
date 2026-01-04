export interface User {
  id: string;
  name: string;
  avatar: string;
  isTrusted: boolean;
  savedRestaurants: string[];
  likedPosts: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  triKeyword: string; // ///Vibe.Dish.Location
  distance: string;
  priceRange: string; // 30k-50k
  trustScore: number;
  rating: number;
  reviewCount: number;
  description: string;
}

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    isTrusted: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  restaurant?: Restaurant;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface VideoItem {
  id: string;
  url: string;
  restaurant: Restaurant;
  user: {
    name: string;
    avatar: string;
  };
}

export type ViewState = 'home' | 'discovery' | 'saved' | 'profile';

export type UserIntent = {
  type: 'like' | 'save' | 'comment';
  targetId: string;
} | null;
