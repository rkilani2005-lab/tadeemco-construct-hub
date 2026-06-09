insert into public.site_content (key, page, label, field_type, value_ar, value_en, sort_order)
values (
  'home.hero.image', 'home', 'Hero — background image', 'image', '', '', 0
)
on conflict (key) do nothing;