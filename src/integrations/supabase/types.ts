export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contractors: {
        Row: {
          id: string
          is_visible: boolean
          logo_url: string | null
          name_ar: string
          name_en: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          id?: string
          is_visible?: boolean
          logo_url?: string | null
          name_ar?: string
          name_en?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          id?: string
          is_visible?: boolean
          logo_url?: string | null
          name_ar?: string
          name_en?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          description_ar: string | null
          description_en: string | null
          id: string
          image_url: string | null
          is_visible: boolean
          name_ar: string
          name_en: string
          slug: string
          sort_order: number
          specs_ar: string[]
          specs_en: string[]
          tag_ar: string | null
          tag_en: string | null
          updated_at: string
        }
        Insert: {
          description_ar?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          name_ar?: string
          name_en?: string
          slug: string
          sort_order?: number
          specs_ar?: string[]
          specs_en?: string[]
          tag_ar?: string | null
          tag_en?: string | null
          updated_at?: string
        }
        Update: {
          description_ar?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          name_ar?: string
          name_en?: string
          slug?: string
          sort_order?: number
          specs_ar?: string[]
          specs_en?: string[]
          tag_ar?: string | null
          tag_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          icon: string | null
          id: string
          is_visible: boolean
          label_ar: string
          label_en: string
          path: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          icon?: string | null
          id?: string
          is_visible?: boolean
          label_ar: string
          label_en: string
          path: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          icon?: string | null
          id?: string
          is_visible?: boolean
          label_ar?: string
          label_en?: string
          path?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          area_ar: string | null
          area_en: string | null
          consultant_ar: string | null
          consultant_en: string | null
          contractor_ar: string | null
          contractor_en: string | null
          id: string
          image_url: string | null
          is_visible: boolean
          services: string[]
          slug: string
          sort_order: number
          type_ar: string | null
          type_en: string | null
          updated_at: string
        }
        Insert: {
          area_ar?: string | null
          area_en?: string | null
          consultant_ar?: string | null
          consultant_en?: string | null
          contractor_ar?: string | null
          contractor_en?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          services?: string[]
          slug: string
          sort_order?: number
          type_ar?: string | null
          type_en?: string | null
          updated_at?: string
        }
        Update: {
          area_ar?: string | null
          area_en?: string | null
          consultant_ar?: string | null
          consultant_en?: string | null
          contractor_ar?: string | null
          contractor_en?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          services?: string[]
          slug?: string
          sort_order?: number
          type_ar?: string | null
          type_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_meta: {
        Row: {
          description_ar: string | null
          description_en: string | null
          id: string
          keywords_ar: string | null
          keywords_en: string | null
          og_image_url: string | null
          route: string
          title_ar: string | null
          title_en: string | null
          updated_at: string
        }
        Insert: {
          description_ar?: string | null
          description_en?: string | null
          id?: string
          keywords_ar?: string | null
          keywords_en?: string | null
          og_image_url?: string | null
          route: string
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          description_ar?: string | null
          description_en?: string | null
          id?: string
          keywords_ar?: string | null
          keywords_en?: string | null
          og_image_url?: string | null
          route?: string
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          description_ar: string | null
          description_en: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_visible: boolean
          methods_ar: string[]
          methods_en: string[]
          slug: string
          sort_order: number
          tag_ar: string | null
          tag_en: string | null
          title_ar: string
          title_en: string
          updated_at: string
          when_needed_ar: string | null
          when_needed_en: string | null
        }
        Insert: {
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          methods_ar?: string[]
          methods_en?: string[]
          slug: string
          sort_order?: number
          tag_ar?: string | null
          tag_en?: string | null
          title_ar?: string
          title_en?: string
          updated_at?: string
          when_needed_ar?: string | null
          when_needed_en?: string | null
        }
        Update: {
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          methods_ar?: string[]
          methods_en?: string[]
          slug?: string
          sort_order?: number
          tag_ar?: string | null
          tag_en?: string | null
          title_ar?: string
          title_en?: string
          updated_at?: string
          when_needed_ar?: string | null
          when_needed_en?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          field_type: string
          id: string
          key: string
          label: string
          page: string
          sort_order: number
          updated_at: string
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          field_type?: string
          id?: string
          key: string
          label?: string
          page?: string
          sort_order?: number
          updated_at?: string
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          field_type?: string
          id?: string
          key?: string
          label?: string
          page?: string
          sort_order?: number
          updated_at?: string
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address_ar: string | null
          address_en: string | null
          email: string | null
          id: boolean
          instagram: string | null
          instagram_url: string | null
          logo_url: string | null
          name_ar: string | null
          name_en: string | null
          phones: string[]
          tagline_ar: string | null
          tagline_en: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address_ar?: string | null
          address_en?: string | null
          email?: string | null
          id?: boolean
          instagram?: string | null
          instagram_url?: string | null
          logo_url?: string | null
          name_ar?: string | null
          name_en?: string | null
          phones?: string[]
          tagline_ar?: string | null
          tagline_en?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address_ar?: string | null
          address_en?: string | null
          email?: string | null
          id?: boolean
          instagram?: string | null
          instagram_url?: string | null
          logo_url?: string | null
          name_ar?: string | null
          name_en?: string | null
          phones?: string[]
          tagline_ar?: string | null
          tagline_en?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_cms_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
