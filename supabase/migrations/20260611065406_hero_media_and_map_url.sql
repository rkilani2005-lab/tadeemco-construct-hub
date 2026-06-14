-- ============================================================================
-- Add CMS keys for: hero media (image OR video) and the Contact Google Map URL.
--
-- field_type 'media' -> admin renders MediaUploader (image or video upload)
-- field_type 'url'   -> admin renders a single URL input
-- Idempotent: on conflict (key) do nothing, so existing edits are preserved.
-- ============================================================================

insert into public.site_content (key, page, label, field_type, value_ar, value_en, sort_order)
values
  ('home.hero.media', 'home', 'Hero — image or video (overrides hero image)', 'media', '', '', 0),
  ('contact.map.url', 'contact', 'Google Map — paste embed URL or full <iframe> code', 'textarea', '', '', 50)
on conflict (key) do nothing;
