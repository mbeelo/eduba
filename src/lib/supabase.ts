import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions for our database
export type Database = {
  public: {
    Tables: {
      passages: {
        Row: {
          id: string
          path: string
          title: string
          author: string | null
          content: string
          difficulty_order: number
          created_at: string
        }
        Insert: {
          id?: string
          path: string
          title: string
          author?: string | null
          content: string
          difficulty_order: number
          created_at?: string
        }
        Update: {
          id?: string
          path?: string
          title?: string
          author?: string | null
          content?: string
          difficulty_order?: number
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          passage_id: string
          best_accuracy: number | null
          attempts: number
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          passage_id: string
          best_accuracy?: number | null
          attempts?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          passage_id?: string
          best_accuracy?: number | null
          attempts?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      user_streaks: {
        Row: {
          user_id: string
          current_streak: number
          longest_streak: number
          last_practice_date: string | null
        }
        Insert: {
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_practice_date?: string | null
        }
        Update: {
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_practice_date?: string | null
        }
      }
    }
  }
}