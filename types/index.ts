// types/index.ts
export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export interface LoveMessage {
  id: string;
  text: string;
  createdAt: Date;
}