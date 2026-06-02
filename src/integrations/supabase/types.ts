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
      user_roles: {
        Row: { id: string; user_id: string; role: "admin" | "editor"; created_at: string }
        Insert: { id?: string; user_id: string; role?: "admin" | "editor"; created_at?: string }
        Update: { id?: string; user_id?: string; role?: "admin" | "editor"; created_at?: string }
        Relationships: []
      }
      site_content: {
        Row: { id: string; key: string; page: string; label: string; field_type: string; value_ar: string | null; value_en: string | null; sort_order: number; updated_at: string }
        Insert: { id?: string; key: string; page?: string; label?: string; field_type?: string; value_ar?: string | null; value_en?: string | null; sort_order?: number; updated_at?: string }
        Update: { id?: string; key?: string; page?: string; label?: string; field_type?: string; value_ar?: string | null; value_en?: string | null; sort_order?: number; updated_at?: string }
        Relationships: []
      }
      menu_items: {
        Row: { id: string; path: string; label_ar: string; label_en: string; icon: string | null; is_visible: boolean; sort_order: number; updated_at: string }
        Insert: { id?: string; path: string; label_ar: string; label_en: string; icon?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Update: { id?: string; path?: string; label_ar?: string; label_en?: string; icon?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Relationships: []
      }
      services: {
        Row: { id: string; slug: string; title_ar: string; title_en: string; tag_ar: string | null; tag_en: string | null; description_ar: string | null; description_en: string | null; icon: string | null; image_url: string | null; is_visible: boolean; sort_order: number; updated_at: string }
        Insert: { id?: string; slug: string; title_ar?: string; title_en?: string; tag_ar?: string | null; tag_en?: string | null; description_ar?: string | null; description_en?: string | null; icon?: string | null; image_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Update: { id?: string; slug?: string; title_ar?: string; title_en?: string; tag_ar?: string | null; tag_en?: string | null; description_ar?: string | null; description_en?: string | null; icon?: string | null; image_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Relationships: []
      }
      projects: {
        Row: { id: string; slug: string; area_ar: string | null; area_en: string | null; contractor_ar: string | null; contractor_en: string | null; consultant_ar: string | null; consultant_en: string | null; type_ar: string | null; type_en: string | null; services: string[]; image_url: string | null; is_visible: boolean; sort_order: number; updated_at: string }
        Insert: { id?: string; slug: string; area_ar?: string | null; area_en?: string | null; contractor_ar?: string | null; contractor_en?: string | null; consultant_ar?: string | null; consultant_en?: string | null; type_ar?: string | null; type_en?: string | null; services?: string[]; image_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Update: { id?: string; slug?: string; area_ar?: string | null; area_en?: string | null; contractor_ar?: string | null; contractor_en?: string | null; consultant_ar?: string | null; consultant_en?: string | null; type_ar?: string | null; type_en?: string | null; services?: string[]; image_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Relationships: []
      }
      equipment: {
        Row: { id: string; slug: string; name_ar: string; name_en: string; description_ar: string | null; description_en: string | null; image_url: string | null; is_visible: boolean; sort_order: number; updated_at: string }
        Insert: { id?: string; slug: string; name_ar?: string; name_en?: string; description_ar?: string | null; description_en?: string | null; image_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Update: { id?: string; slug?: string; name_ar?: string; name_en?: string; description_ar?: string | null; description_en?: string | null; image_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Relationships: []
      }
      contractors: {
        Row: { id: string; name_ar: string; name_en: string; logo_url: string | null; is_visible: boolean; sort_order: number; updated_at: string }
        Insert: { id?: string; name_ar?: string; name_en?: string; logo_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Update: { id?: string; name_ar?: string; name_en?: string; logo_url?: string | null; is_visible?: boolean; sort_order?: number; updated_at?: string }
        Relationships: []
      }
      seo_meta: {
        Row: { id: string; route: string; title_ar: string | null; title_en: string | null; description_ar: string | null; description_en: string | null; keywords_ar: string | null; keywords_en: string | null; og_image_url: string | null; updated_at: string }
        Insert: { id?: string; route: string; title_ar?: string | null; title_en?: string | null; description_ar?: string | null; description_en?: string | null; keywords_ar?: string | null; keywords_en?: string | null; og_image_url?: string | null; updated_at?: string }
        Update: { id?: string; route?: string; title_ar?: string | null; title_en?: string | null; description_ar?: string | null; description_en?: string | null; keywords_ar?: string | null; keywords_en?: string | null; og_image_url?: string | null; updated_at?: string }
        Relationships: []
      }
      site_settings: {
        Row: { id: boolean; name_ar: string | null; name_en: string | null; tagline_ar: string | null; tagline_en: string | null; phones: string[]; email: string | null; whatsapp: string | null; instagram: string | null; instagram_url: string | null; address_ar: string | null; address_en: string | null; logo_url: string | null; updated_at: string }
        Insert: { id?: boolean; name_ar?: string | null; name_en?: string | null; tagline_ar?: string | null; tagline_en?: string | null; phones?: string[]; email?: string | null; whatsapp?: string | null; instagram?: string | null; instagram_url?: string | null; address_ar?: string | null; address_en?: string | null; logo_url?: string | null; updated_at?: string }
        Update: { id?: boolean; name_ar?: string | null; name_en?: string | null; tagline_ar?: string | null; tagline_en?: string | null; phones?: string[]; email?: string | null; whatsapp?: string | null; instagram?: string | null; instagram_url?: string | null; address_ar?: string | null; address_en?: string | null; logo_url?: string | null; updated_at?: string }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: { Args: { _user_id: string; _role: "admin" | "editor" }; Returns: boolean }
      is_cms_admin: { Args: Record<string, never>; Returns: boolean }
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
