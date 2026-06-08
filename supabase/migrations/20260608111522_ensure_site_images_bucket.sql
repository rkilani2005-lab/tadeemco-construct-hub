-- ============================================================================
-- Ensure the public `site-images` storage bucket exists.
--
-- Why: the Lovable-regenerated migration set (20260602220804_…) recreated every
-- table, RLS policy, and the storage *object* policies, but DROPPED the
-- `insert into storage.buckets` statement (its comment assumed the bucket was
-- created manually via the dashboard "storage tool"). On any project that ran
-- only the regenerated migrations, the bucket was therefore never created, so
-- every CMS image upload failed with "Bucket not found" — the uploaded URL was
-- never written, and both the admin preview and the public pages silently fell
-- back to the bundled static image.
--
-- This migration is idempotent and self-contained: it (re)creates the bucket
-- and re-asserts the object-level policies so uploads work regardless of which
-- earlier migrations were applied.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

-- Public read; admin (or editor) write. Re-created defensively.
drop policy if exists "public read site-images" on storage.objects;
create policy "public read site-images" on storage.objects
  for select using (bucket_id = 'site-images');

drop policy if exists "admin upload site-images" on storage.objects;
create policy "admin upload site-images" on storage.objects
  for insert with check (bucket_id = 'site-images' and public.is_cms_admin());

drop policy if exists "admin update site-images" on storage.objects;
create policy "admin update site-images" on storage.objects
  for update using (bucket_id = 'site-images' and public.is_cms_admin());

drop policy if exists "admin delete site-images" on storage.objects;
create policy "admin delete site-images" on storage.objects
  for delete using (bucket_id = 'site-images' and public.is_cms_admin());
