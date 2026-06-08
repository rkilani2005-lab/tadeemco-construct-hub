-- Re-assert site-images object policies (bucket row managed via storage tool).
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