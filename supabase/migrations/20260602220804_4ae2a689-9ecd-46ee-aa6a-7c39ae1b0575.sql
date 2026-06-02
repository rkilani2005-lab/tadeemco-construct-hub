-- ============================================================================
-- Tadeemco CMS backend
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$ begin
  create type public.app_role as enum ('admin', 'editor');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  role        public.app_role not null default 'admin',
  created_at  timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(auth.uid(), 'admin')
      or public.has_role(auth.uid(), 'editor');
$$;

drop policy if exists "read own roles" on public.user_roles;
create policy "read own roles" on public.user_roles
  for select using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins manage roles" on public.user_roles;
create policy "admins manage roles" on public.user_roles
  for all using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table if not exists public.site_content (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  page        text not null default 'general',
  label       text not null default '',
  field_type  text not null default 'text',
  value_ar    text default '',
  value_en    text default '',
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists public.menu_items (
  id          uuid primary key default gen_random_uuid(),
  path        text not null,
  label_ar    text not null,
  label_en    text not null,
  icon        text default '',
  is_visible  boolean not null default true,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title_ar     text not null default '',
  title_en     text not null default '',
  tag_ar       text default '',
  tag_en       text default '',
  description_ar text default '',
  description_en text default '',
  icon         text default '',
  image_url    text default '',
  is_visible   boolean not null default true,
  sort_order   int not null default 0,
  updated_at   timestamptz not null default now()
);

create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  area_ar       text default '',
  area_en       text default '',
  contractor_ar text default '',
  contractor_en text default '',
  consultant_ar text default '',
  consultant_en text default '',
  type_ar       text default '',
  type_en       text default '',
  services      text[] not null default '{}',
  image_url     text default '',
  is_visible    boolean not null default true,
  sort_order    int not null default 0,
  updated_at    timestamptz not null default now()
);

create table if not exists public.equipment (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name_ar       text not null default '',
  name_en       text not null default '',
  description_ar text default '',
  description_en text default '',
  image_url     text default '',
  is_visible    boolean not null default true,
  sort_order    int not null default 0,
  updated_at    timestamptz not null default now()
);

create table if not exists public.contractors (
  id          uuid primary key default gen_random_uuid(),
  name_ar     text not null default '',
  name_en     text not null default '',
  logo_url    text default '',
  is_visible  boolean not null default true,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists public.seo_meta (
  id             uuid primary key default gen_random_uuid(),
  route          text not null unique,
  title_ar       text default '',
  title_en       text default '',
  description_ar text default '',
  description_en text default '',
  keywords_ar    text default '',
  keywords_en    text default '',
  og_image_url   text default '',
  updated_at     timestamptz not null default now()
);

create table if not exists public.site_settings (
  id            boolean primary key default true,
  name_ar       text default 'شركة تدعيمكو',
  name_en       text default 'Tadeemco',
  tagline_ar    text default '',
  tagline_en    text default '',
  phones        text[] not null default '{}',
  email         text default '',
  whatsapp      text default '',
  instagram     text default '',
  instagram_url text default '',
  address_ar    text default '',
  address_en    text default '',
  logo_url      text default '',
  updated_at    timestamptz not null default now(),
  constraint single_row check (id)
);

do $$
declare t text;
begin
  foreach t in array array[
    'site_content','menu_items','services','projects','equipment',
    'contractors','seo_meta','site_settings'
  ] loop
    execute format('drop trigger if exists trg_%1$s_updated on public.%1$s;', t);
    execute format(
      'create trigger trg_%1$s_updated before update on public.%1$s
         for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- GRANTs: public website reads via anon; admins write while authenticated.
grant select on public.site_content, public.menu_items, public.services,
  public.projects, public.equipment, public.contractors, public.seo_meta,
  public.site_settings to anon;
grant select, insert, update, delete on public.site_content, public.menu_items,
  public.services, public.projects, public.equipment, public.contractors,
  public.seo_meta, public.site_settings to authenticated;
grant all on public.site_content, public.menu_items, public.services,
  public.projects, public.equipment, public.contractors, public.seo_meta,
  public.site_settings to service_role;
grant select, insert, update, delete on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

do $$
declare t text;
begin
  foreach t in array array[
    'site_content','menu_items','services','projects','equipment',
    'contractors','seo_meta','site_settings'
  ] loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public read %1$s" on public.%1$s;', t);
    execute format(
      'create policy "public read %1$s" on public.%1$s for select using (true);', t);

    execute format('drop policy if exists "admin write %1$s" on public.%1$s;', t);
    execute format(
      'create policy "admin write %1$s" on public.%1$s
         for all using (public.is_cms_admin()) with check (public.is_cms_admin());', t);
  end loop;
end $$;

-- Storage object policies (bucket created via storage tool)
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

-- ============================================================================
-- SEED DATA
-- ============================================================================
insert into public.site_settings (id, name_ar, name_en, tagline_ar, tagline_en,
  phones, email, whatsapp, instagram, instagram_url, address_ar, address_en)
values (true,
  'شركة تدعيمكو', 'Tadeemco',
  'لأعمال الحفر والتدعيم وسحب المياه الجوفية', 'For Drilling, Shoring & Groundwater Dewatering',
  array['9000 1662','9966 7785','9088 8809'],
  'info@tadeemco.com', '+96590001662', '@tadeemco', 'https://instagram.com/tadeemco',
  'مدينة الكويت – مبنى الدروازة 51 – دور 6 – مكتب 30',
  'Kuwait City – Dorwaza Building 51 – Floor 6 – Office 30')
on conflict (id) do nothing;

insert into public.menu_items (path, label_ar, label_en, icon, sort_order) values
  ('/about',    'من نحن',     'About',     'Info',     1),
  ('/services', 'خدماتنا',    'Services',  'Wrench',   2),
  ('/projects', 'مشاريعنا',   'Projects',  'Building2',3),
  ('/equipment','المعدات',    'Equipment', 'Truck',    4),
  ('/contact',  'تواصل معنا', 'Contact',   'Phone',    5)
on conflict do nothing;

insert into public.services (slug, title_ar, title_en, tag_ar, tag_en, description_ar, description_en, icon, sort_order) values
  ('shoring','التدعيم','Shoring','تدعيم هندسي للحفريات','Engineered excavation support',
   'تركيب الخوازيق المعدنية والألواح الخشبية وفقاً لمعايير هندسية دقيقة لتثبيت جوانب الموقع ومنع انهيار التربة.',
   'Installation of steel piles and timber sheeting per strict engineering standards to stabilize excavation sides and prevent soil collapse.',
   'shoring',1),
  ('dewatering','سحب المياه الجوفية','Groundwater Dewatering','بيئة عمل جافة وآمنة','Safe, dry working conditions',
   'خفض منسوب المياه الجوفية قبل أعمال الحفر العميق لضمان استقرار الموقع وتسهيل تنفيذ أعمال الأساسات والأدوار السفلية.',
   'Lowering the groundwater table before deep excavation to stabilize the site and enable safe foundation and basement works.',
   'dewatering',2),
  ('waterproofing','العازل المائي','Waterproofing','حماية طويلة الأمد للمنشآت','Long-term protection for structures',
   'أنظمة عزل متطورة للأساسات والجدران تحت الأرضية لحماية المنشأة من الرطوبة والمياه الجوفية خلال العمر التشغيلي.',
   'Advanced insulation systems for foundations and below-grade walls, protecting the structure from moisture and groundwater throughout its service life.',
   'waterproofing',3),
  ('excavation','أعمال الحفر','Excavation','حفر متخصص لجميع أنواع التربة','Specialized excavation for all soil conditions',
   'أعمال حفر الأساسات العميقة، الخنادق، والقنوات باستخدام معدات متطورة ومهندسين ذوي خبرة في التربة الكويتية.',
   'Deep foundation excavation, trenching, and channeling with advanced equipment and engineers experienced in Kuwaiti ground conditions.',
   'excavation',4)
on conflict (slug) do nothing;

insert into public.projects (slug, area_ar, area_en, contractor_ar, contractor_en, consultant_ar, consultant_en, type_ar, type_en, services, sort_order) values
  ('audi-showroom','الشويخ','Shuwaikh','شركة الغانم انترناشيونال','Al-Ghanim International','مكتب عوهة للاستشارات','Ooha Consulting Office','معرض الأودي للسيارات','Audi Car Showroom',array['dewatering','shoring','excavation'],1),
  ('capital-tower','الأحمدية','Al-Ahmadiya','شركة الأحمدية للمقاولات','Al-Ahmadiya Contracting','','','برج العاصمة','Capital Tower',array['dewatering','shoring'],2),
  ('sakr-diwaniya','منطقة الصقر','Al-Sakr District','شركة المتحدة الأولى','Al-Muttahida Al-Oula','SSH International','SSH International','ديوانية الصقر','Al-Sakr Diwaniya',array['shoring','excavation'],3),
  ('abyat-sulaibiya','الصليبية','Sulaibiya','شركة أبيات ميغا ستور','Abyat Mega Store','','','مشروع أبيات ميغا ستور','Abyat Mega Store Project',array['dewatering','shoring'],4),
  ('yazid-mosque','السالمية','Salmiya','الشركة اللبنانية للروابط','Rawabit Lebanese Co.','','','مسجد يزيد بن حارثة','Yazid Ibn Haritha Mosque',array['dewatering','shoring','waterproofing'],5),
  ('jassar-ice','الشويخ الصناعية','Shuwaikh Industrial','المورد الكويتي','Al-Mawrid Al-Kuwaiti','','','مصنع ثلج الجسار','Al-Jassar Ice Factory',array['dewatering','excavation'],6),
  ('taysir-building','الشويخ','Shuwaikh','شركة كي بي الهندسية','KB Engineering','','','مبنى التيسير','Al-Taysir Building',array['shoring','excavation'],7),
  ('sabah-salem','صباح السالم','Sabah Al-Salem','مجموعة نوفل العقارية','Nofal Real Estate Group','','','مبنى استثماري','Investment Building',array['dewatering','shoring'],8),
  ('khairan-towers','الخيران','Khairan','شركة أوتلوك للمشاريع','Outlook Projects','','','مشاريع أبراج الكهرباء','Electricity Tower Projects',array['excavation','shoring'],9),
  ('hessa-mubarak','حصة المبارك','Hessa Al-Mubarak','شركة الأحمدية للمقاولات / الضاية','Al-Ahmadiya Contracting / Dayyah','','','مشروع حصة المبارك','Hessa Al-Mubarak Project',array['dewatering','shoring','waterproofing'],10),
  ('rumaithiya','الرميثية','Rumaithiya','شركة فلاش تي ماف للمقاولات','Flash TMAF Contracting','','','مشروع الرميثية','Rumaithiya Project',array['dewatering','shoring'],11)
on conflict (slug) do nothing;

insert into public.contractors (name_ar, name_en, sort_order) values
  ('الغانم انترناشيونال','Al-Ghanim International',1),
  ('SSH International','SSH International',2),
  ('شركة أبيات','Abyat',3),
  ('كي بي الهندسية','KB Engineering',4),
  ('الأحمدية للمقاولات','Al-Ahmadiya Contracting',5),
  ('مجموعة نوفل العقارية','Nofal Real Estate Group',6),
  ('المتحدة الأولى','Al-Muttahida Al-Oula',7),
  ('أوتلوك للمشاريع','Outlook Projects',8),
  ('فلاش تي ماف','Flash TMAF',9),
  ('المورد الكويتي','Al-Mawrid Al-Kuwaiti',10)
on conflict do nothing;

insert into public.equipment (slug, name_ar, name_en, description_ar, description_en, sort_order) values
  ('hudig-pumps','مضخات HÜDIG-CELLE الألمانية','HÜDIG-CELLE German Pumps',
   'مضخات تفريغ ألمانية الصنع عالية الكفاءة لأنظمة نزح المياه الجوفية.',
   'High-efficiency German-made vacuum pumps for groundwater dewatering systems.',1),
  ('wellpoint','أنظمة الآبار النقطية (Wellpoint)','Wellpoint Systems',
   'أنظمة آبار نقطية لخفض منسوب المياه الجوفية حول الحفريات العميقة.',
   'Wellpoint systems for lowering the groundwater table around deep excavations.',2),
  ('submersible','مضخات غاطسة','Submersible Pumps',
   'مضخات غاطسة متنوعة الأحجام لتصريف المياه من قاع الحفر.',
   'Submersible pumps in a range of sizes for draining water from excavation bases.',3),
  ('shoring-materials','معدات تدعيم فولاذية وخشبية','Steel & Timber Shoring',
   'خوازيق وألواح فولاذية وخشبية لتدعيم جوانب الحفريات.',
   'Steel and timber piles and sheeting for shoring excavation sides.',4)
on conflict (slug) do nothing;

insert into public.seo_meta (route, title_ar, title_en, description_ar, description_en, keywords_ar, keywords_en) values
  ('/','تدعيمكو | متخصصون في نزح المياه والتدعيم وأعمال الحفر في الكويت','Tadeemco | Dewatering, Shoring & Excavation Specialists in Kuwait',
   'شركة تدعيمكو - متخصصون في نزح المياه الجوفية، التدعيم، العازل المائي، وأعمال الحفر في دولة الكويت. نعمل مع كبرى شركات المقاولات والمكاتب الاستشارية. اتصل ٩٠٠٠١٦٦٢',
   'Tadeemco — substructure specialists for groundwater dewatering, shoring, waterproofing, and excavation in the State of Kuwait. Trusted by leading main contractors. Call 9000 1662.',
   'شركة تدعيمكو، تدعيمكو الكويت، نزح المياه الجوفية الكويت، أعمال التدعيم الكويت، حفر أساسات الكويت، العازل المائي الكويت',
   'Tadeemco, dewatering Kuwait, groundwater dewatering Kuwait, shoring contractor Kuwait, excavation contractor Kuwait, waterproofing Kuwait'),
  ('/about','من نحن | شركة تدعيمكو - خبرة متخصصة في أعمال التأسيسات','About Us | Tadeemco — Substructure Experts in Kuwait',
   'شركة كويتية متخصصة في أعمال التأسيسات تحت الأرض. خبرة طويلة مع المقاولين الرئيسيين والمكاتب الاستشارية في تنفيذ أعقد مراحل البناء.',
   'A Kuwaiti specialist in substructure and early-stage construction works. Long track record with main contractors and consulting offices on the most demanding foundation projects.',
   'شركة تدعيمكو، خبرة هندسية، مقاول تأسيسات، الكويت','Tadeemco company, engineering expertise, substructure contractor Kuwait'),
  ('/services','خدماتنا | نزح المياه، التدعيم، العازل، الحفر - تدعيمكو الكويت','Our Services | Dewatering, Shoring, Waterproofing, Excavation — Tadeemco Kuwait',
   'أربع خدمات متخصصة: نزح المياه الجوفية، أعمال التدعيم، العازل المائي، وأعمال الحفر. معدات ألمانية وفريق هندسي متخصص.',
   'Four specialized services: groundwater dewatering, shoring works, waterproofing, and excavation. German equipment and a dedicated engineering team.',
   'نزح المياه الجوفية، أعمال التدعيم، العازل المائي، أعمال الحفر، ويل بوينت','groundwater dewatering, shoring works, waterproofing, excavation, wellpoint system'),
  ('/projects','مشاريعنا | أعمال منجزة في الكويت - تدعيمكو','Our Projects | Completed Works in Kuwait — Tadeemco',
   'مشاريع منجزة لتدعيمكو مع كبرى شركات المقاولات: الغانم، SSH، كي بي الهندسية، أبيات، الأحمدية، وغيرها في جميع مناطق الكويت.',
   'Tadeemco''s completed projects with Kuwait''s leading contractors: Al-Ghanim, SSH International, KB Engineering, Abyat, Al-Ahmadiya, and more, across all Kuwait governorates.',
   'مشاريع تدعيمكو، أعمال سابقة، الكويت، مقاولين','Tadeemco projects, completed works, Kuwait contractors'),
  ('/equipment','معداتنا | مضخات HÜDIG ألمانية وأنظمة تدعيم - تدعيمكو','Our Equipment | HÜDIG German Pumps & Shoring Systems — Tadeemco',
   'أسطول كامل من المعدات المتخصصة: مضخات HÜDIG-CELLE الألمانية، أنظمة الآبار النقطية، مضخات غاطسة، ومعدات تدعيم فولاذية.',
   'A complete fleet of specialized equipment: HÜDIG-CELLE German pumps, wellpoint systems, submersible pumps, and steel shoring materials.',
   'مضخات HÜDIG، ويل بوينت، معدات تدعيم، مضخات غاطسة','HÜDIG pumps, wellpoint system, shoring equipment, submersible pumps Kuwait'),
  ('/contact','تواصل معنا | شركة تدعيمكو الكويت - عرض سعر مجاني','Contact Us | Tadeemco Kuwait — Free Quote',
   'تواصل مع شركة تدعيمكو للحصول على استشارة مجانية وعرض سعر لمشروعك.','Contact Tadeemco for a free consultation and quote for your project.',
   'تواصل تدعيمكو، عرض سعر، استشارة، الكويت','contact Tadeemco, free quote, consultation, Kuwait')
on conflict (route) do nothing;

insert into public.site_content (key, page, label, field_type, value_ar, value_en, sort_order) values
  ('home.hero.eyebrow','home','Hero — eyebrow','text','شركة تدعيمكو','TADEEMCO',1),
  ('home.hero.title','home','Hero — title','textarea','لأعمال الحفر والتدعيم وسحب المياه الجوفية','Drilling, Shoring & Groundwater Dewatering',2),
  ('home.hero.subtitle','home','Hero — subtitle','textarea',
   'متخصصون في أعمال التأسيسات تحت الأرض في دولة الكويت. نعمل مع كبرى شركات المقاولات والمكاتب الاستشارية على تنفيذ أعقد مراحل البناء بأعلى معايير الجودة والسلامة.',
   'Substructure specialists serving the State of Kuwait. We partner with leading main contractors and consulting offices to deliver the most demanding early-stage construction work to the highest quality and safety standards.',3),
  ('home.services.heading','home','Services — heading','textarea','حلول متكاملة لأعمال ما تحت الأرض.','End-to-end solutions for every substructure challenge.',4),
  ('home.services.intro','home','Services — intro','textarea',
   'لا نقدم كل شيء. نقدم بالتحديد ما نجيده: المراحل الأولى والأكثر أهمية في أي مشروع إنشائي.',
   'We don''t do everything. We do exactly what we''re best at: the earliest, most critical stages of any construction project.',5),
  ('home.projects.heading','home','Projects — heading','text','نعمل مع أفضل المقاولين في الكويت','Trusted by Kuwait''s leading contractors',6),
  ('home.equipment.heading','home','Equipment — heading','textarea','أسطول كامل من المعدات الألمانية المتخصصة','A full fleet of specialized German equipment',7),
  ('home.equipment.intro','home','Equipment — intro','textarea',
   'نعتمد على معدات من أفضل الشركات المصنعة حول العالم، يقودها فريق من المهندسين والفنيين ذوي الخبرة الطويلة في أعمال التأسيسات تحت الأرض.',
   'We operate equipment from the world''s leading manufacturers, deployed by a team of engineers and technicians with deep experience in substructure works.',8),
  ('home.cta.heading','home','Final CTA — heading','text','جاهزون لمشروعكم القادم','Ready for your next project',9),
  ('home.cta.subtitle','home','Final CTA — subtitle','textarea',
   'تحدث مع فريقنا الهندسي للحصول على استشارة مجانية وعرض سعر دقيق لمشروعك.',
   'Talk to our engineering team for a free consultation and accurate quote for your project.',10)
on conflict (key) do nothing;