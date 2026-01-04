import { Post, Restaurant, VideoItem } from './types';

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Phở Lệ',
    image: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=800&auto=format&fit=crop',
    triKeyword: '///Authentic.Pho.District_5',
    distance: '0.8 km',
    priceRange: '50k-85k',
    trustScore: 95,
    rating: 4.8,
    reviewCount: 1240,
    description: 'Traditional Southern-style Pho with rich broth and tender beef.'
  },
  {
    id: 'r2',
    name: 'The Workshop Coffee',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    triKeyword: '///Industrial.Coffee.District_1',
    distance: '1.2 km',
    priceRange: '60k-100k',
    trustScore: 92,
    rating: 4.6,
    reviewCount: 850,
    description: 'Specialty coffee roaster in a heritage building. Perfect for work.'
  },
  {
    id: 'r3',
    name: 'Pizza 4P\'s',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    triKeyword: '///DateNight.Pizza.Ben_Thanh',
    distance: '2.5 km',
    priceRange: '200k-500k',
    trustScore: 98,
    rating: 4.9,
    reviewCount: 3200,
    description: 'Farm-to-table pizza with house-made cheese. Requires reservation.'
  },
  {
    id: 'r4',
    name: 'Bánh Mì Huynh Hoa',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800&auto=format&fit=crop',
    triKeyword: '///Famous.BanhMi.District_1',
    distance: '1.5 km',
    priceRange: '68k',
    trustScore: 89,
    rating: 4.5,
    reviewCount: 5000,
    description: 'The most loaded Banh Mi in town. Heavy on the meat.'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: {
      name: 'Linh Dan',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      isTrusted: true
    },
    content: 'Finally found a healing spot for Sunday morning reading. The cold brew is immaculate.',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
    timestamp: '2h ago',
    restaurant: MOCK_RESTAURANTS[1],
    likes: 45,
    comments: 12
  },
  {
    id: 'p2',
    user: {
      name: 'Minh Explorer',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      isTrusted: false
    },
    content: 'Is Pizza 4P\'s overrated? I don\'t think so. The crab pasta is life-changing.',
    timestamp: '4h ago',
    restaurant: MOCK_RESTAURANTS[2],
    likes: 128,
    comments: 34
  }
];

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&h=1000&auto=format&fit=crop', // Vertical Image acting as video poster
    restaurant: MOCK_RESTAURANTS[0],
    user: { name: 'FoodieTien', avatar: 'https://i.pravatar.cc/150?u=1' }
  },
  {
    id: 'v2',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&h=1000&auto=format&fit=crop',
    restaurant: MOCK_RESTAURANTS[2],
    user: { name: 'SaigonBites', avatar: 'https://i.pravatar.cc/150?u=2' }
  },
  {
    id: 'v3',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&h=1000&auto=format&fit=crop',
    restaurant: MOCK_RESTAURANTS[1],
    user: { name: 'CoffeeHolics', avatar: 'https://i.pravatar.cc/150?u=3' }
  }
];

export const PLACEHOLDERS = [
  "Quán cà phê chữa lành...",
  "Món ăn tối nay ăn gì?",
  "///Romantic.Pizza.District_2",
  "Quán nướng giá sinh viên..."
];
