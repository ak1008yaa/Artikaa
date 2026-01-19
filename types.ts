
export type Language = 'EN' | 'HY' | 'RU' | 'FA';

export type Category = 'Apparel' | 'Art' | 'Jewelry' | 'Furniture';

export interface Product {
  id: string;
  title: string;
  category: Category;
  priceAMD: number; // Base price in Drams
  description: Record<Language, string>;
  imageUrl: string;
  stock: number;
  artist: string;
  dimensions?: string; 
  bentoSize?: 'small' | 'medium' | 'large' | 'tall'; 
}

export interface Artist {
  id: string; 
  name: string;
  role: string; 
  location: string;
  bio: Record<Language, string>;
  vision: Record<Language, string>;
  portraitUrl: string;
  coverUrl: string;
}

export interface CartItem extends Product {
  cartId: string;
}

export interface CryptoWallet {
  network: 'Solana' | 'Ethereum' | 'TRON';
  token: 'SOL' | 'ETH' | 'USDT';
  address: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
}

export interface Order {
  id: string;
  userId: string; // 'guest' or user id
  items: CartItem[];
  totalAMD: number;
  status: 'Pending' | 'Paid' | 'Shipped';
  shippingAddress: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  date: string;
  imageUrl: string;
  author: string;
}
