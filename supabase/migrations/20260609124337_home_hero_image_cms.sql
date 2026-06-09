-- ============================================================================
-- Add an editable Home hero background image to the CMS.
--
-- The homepage hero photo was previously a hardcoded bundled asset. This seeds
-- an image-typed content row so it appears in the admin Content editor (which
-- renders an ImageUploader for any row with field_type = 'image'). The Home
-- page reads key 'home.hero.image' and falls back to the bundled asset when the
-- value is empty, so nothing breaks before an image is uploaded.
--
-- Idempotent: on conflict (key) do nothing.
-- ============================================================================

insert into public.site_content (key, page, label, field_type, value_ar, value_en, sort_order)
values (
  'home.hero.image', 'home', 'Hero — background image', 'image', '', '', 0
)
on conflict (key) do nothing;
