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
-- NOTE: this migration deliberately does NOT insert any service rows. The
-- `services` table is the source of truth for which services exist; a service
-- absent from it (e.g. waterproofing) has been retired on purpose and must not
-- be re-created here, since Lovable re-runs migrations.
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
