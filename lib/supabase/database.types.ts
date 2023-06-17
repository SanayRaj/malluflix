export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: {
          created_at: string;
          discription: string;
          id: string;
          title: string;
          poster_img: string;
          release: number;
          duration: string;
          tags: string;
          director: string;
        };
        Insert: {
          created_at: string;
          discription: string;
          id: string;
          title: string;
          poster_img: string;
          release: number;
          duration: string;
          tags: string;
          director: string;
        };
        Update: {
          created_at: string;
          discription: string;
          id: string;
          title: string;
          poster_img: string;
          release: number;
          duration: string;
          tags: string;
          director: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
