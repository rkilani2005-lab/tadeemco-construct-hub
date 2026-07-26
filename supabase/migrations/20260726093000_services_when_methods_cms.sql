-- ============================================================================
-- Make the service detail copy editable in the CMS:
--   • "When you need this service"  (متى تحتاج هذه الخدمة؟)
--   • "Our Equipment & Methods"     (معداتنا وأساليبنا)  — the checkmark list
--
-- Both were hardcoded in src/pages/Services.tsx (`whenNeeded` / `methods` on
-- the baseServices array), so an admin had no way to change them. This adds the
-- backing columns and seeds them with the exact current values, matched by slug,
-- so the live page looks identical until someone edits it.
--
-- Also inserts the missing `waterproofing` row: the page renders four services
-- but only three existed in the table, which meant waterproofing was entirely
-- uneditable. Inserted at sort_order 3 (page order: shoring, dewatering,
-- waterproofing, excavation) with excavation pushed to 4.
--
-- methods_ar / methods_en are text[] — one array element per checkmark bullet,
-- same shape as equipment.specs_ar / specs_en.
--
-- Idempotent: `add column if not exists`, `on conflict do nothing`, and seeds
-- that only touch rows still holding empty values, so re-running (which Lovable
-- does) will not clobber later admin edits.
-- ============================================================================

alter table public.services add column if not exists when_needed_ar text   default '';
alter table public.services add column if not exists when_needed_en text   default '';
alter table public.services add column if not exists methods_ar     text[] not null default '{}';
alter table public.services add column if not exists methods_en     text[] not null default '{}';

-- ── Make room for waterproofing at position 3 ────────────────────────────────
update public.services set sort_order = 4
where slug = 'excavation'
  and sort_order = 3
  and not exists (select 1 from public.services where slug = 'waterproofing');

insert into public.services
  (slug, title_ar, title_en, tag_ar, tag_en, description_ar, description_en,
   icon, image_url, is_visible, sort_order)
values (
  'waterproofing',
  $t$العازل المائي$t$,
  $t$Waterproofing$t$,
  $t$حماية طويلة الأمد للأساسات والجدران تحت الأرضية$t$,
  $t$Long-term protection for foundations and below-grade walls$t$,
  $t$تطبيق أنظمة عزل مائي متطورة على الأساسات والجدران تحت الأرضية لحمايتها من الرطوبة والمياه الجوفية طوال العمر التشغيلي للمنشأة. العزل الصحيح يوفر تكاليف صيانة كبيرة ويحافظ على سلامة الخرسانة.$t$,
  $t$Application of advanced waterproofing systems to foundations and below-grade walls to protect them from moisture and groundwater throughout the structure's service life. Proper waterproofing prevents costly long-term maintenance and preserves concrete integrity.$t$,
  'waterproofing', '', true, 3
)
on conflict (slug) do nothing;

-- ── Seed the new columns from the values previously hardcoded in the page ────
update public.services set
  when_needed_ar = $t$يُستخدم عند الحفر بعمق يزيد عن ١.٥ متر، أو عند الحفر قرب مبانٍ قائمة، أو في التربة غير المستقرة.$t$,
  when_needed_en = $t$Required for excavations deeper than 1.5m, when excavating near existing structures, or in unstable soils.$t$,
  methods_ar = array[
    $t$تدعيم الجدران الاستنادية$t$,
    $t$الدعامات الفولاذية القابلة للتعديل$t$,
    $t$ألواح التدعيم المعدنية$t$,
    $t$تدعيم الحفريات العميقة$t$,
    $t$حماية المباني المجاورة$t$
  ],
  methods_en = array[
    'Retaining wall support',
    'Adjustable steel struts',
    'Metal shoring panels',
    'Deep excavation shoring',
    'Adjacent-structure protection'
  ]
where slug = 'shoring' and (methods_en = '{}' or methods_en is null);

update public.services set
  when_needed_ar = $t$ضروري في أي مشروع يتضمن حفر أساسات أو أدوار سفلية أسفل منسوب المياه الجوفية الطبيعي.$t$,
  when_needed_en = $t$Essential for any project with foundations or basements below the natural groundwater level.$t$,
  methods_ar = array[
    $t$أنظمة الآبار النقطية (Wellpoint)$t$,
    $t$مضخات طرد مركزي عالية الكفاءة$t$,
    $t$مضخات غاطسة متنوعة الأحجام$t$,
    $t$مضخات تفريغ HÜDIG الألمانية$t$,
    $t$مراقبة مستوى المياه ٢٤/٧$t$,
    $t$تصريف المياه وفقاً للمعايير البيئية$t$
  ],
  methods_en = array[
    'Wellpoint dewatering systems',
    'High-capacity centrifugal pumps',
    'Submersible pumps in all sizes',
    'HÜDIG Germany vacuum pumps',
    '24/7 water-level monitoring',
    'Environmentally-compliant discharge'
  ]
where slug = 'dewatering' and (methods_en = '{}' or methods_en is null);

update public.services set
  when_needed_ar = $t$لازم لجميع الأساسات والأدوار السفلية في الكويت نظراً لارتفاع منسوب المياه الجوفية وملوحتها.$t$,
  when_needed_en = $t$Required for all foundations and basements in Kuwait due to high groundwater levels and salinity.$t$,
  methods_ar = array[
    $t$أغشية عزل بيتومينية$t$,
    $t$أنظمة العزل الإيبوكسي$t$,
    $t$طبقات حماية الخرسانة$t$,
    $t$عزل الفواصل الإنشائية$t$,
    $t$أنظمة الحماية الكاثودية$t$
  ],
  methods_en = array[
    'Bituminous membrane systems',
    'Epoxy waterproofing',
    'Concrete protective coatings',
    'Construction joint sealing',
    'Cathodic protection systems'
  ]
where slug = 'waterproofing' and (methods_en = '{}' or methods_en is null);

update public.services set
  when_needed_ar = $t$جميع أنواع المشاريع السكنية، التجارية، والصناعية — من الفلل الخاصة إلى الأبراج والمجمعات.$t$,
  when_needed_en = $t$All project types — residential, commercial, and industrial — from private villas to towers and large complexes.$t$,
  methods_ar = array[
    $t$حفر الأساسات العميقة$t$,
    $t$حفر الخنادق والقنوات$t$,
    $t$إزالة التربة والردم$t$,
    $t$أعمال الحفر في التربة الصعبة$t$,
    $t$التنسيق مع أعمال التدعيم والنزح$t$
  ],
  methods_en = array[
    'Deep foundation excavation',
    'Trenching and channel works',
    'Soil removal and backfilling',
    'Difficult-soil excavation',
    'Coordination with shoring and dewatering'
  ]
where slug = 'excavation' and (methods_en = '{}' or methods_en is null);
