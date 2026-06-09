-- ============================================================================
-- Backfill equipment tag/specs by SLUG (robust mapping).
--
-- The previous migration (20260609130313) seeded tag/specs matched by
-- sort_order. If a project's equipment rows don't carry sort_order 1..4 exactly
-- (e.g. reordered after seeding, or 0-indexed), those UPDATEs matched nothing
-- and the new fields stayed empty — meaning the admin editor would open blank
-- and the user would have to retype existing bullets.
--
-- This re-applies the same values keyed on the stable slug instead, and ONLY
-- touches rows whose specs are still empty. So:
--   • if 130313 already mapped correctly      -> no empty rows -> no-op
--   • if it missed (sort_order drift)          -> filled here by slug
--   • if an admin already edited the bullets    -> not empty -> left untouched
-- Idempotent and safe to re-run.
-- ============================================================================

update public.equipment set
  tag_ar = 'صنع ألماني · قلب أسطولنا',
  tag_en = 'German-made · The heart of our fleet',
  specs_ar = array['قدرة شفط عالية','عمل مستمر ٢٤/٧','محركات ديزل موثوقة','محمولة على عجلات للتنقل السريع','صيانة منتظمة داخلياً'],
  specs_en = array['High suction capacity','Continuous 24/7 operation','Reliable diesel engines','Wheel-mounted for rapid mobilization','Maintained in-house on a regular schedule']
where slug = 'hudig-pumps' and (specs_en is null or specs_en = '{}');

update public.equipment set
  tag_ar = 'للتدفقات العالية',
  tag_en = 'For high-flow applications',
  specs_ar = array['تدفق يصل إلى مئات الأمتار المكعبة/الساعة','متوفرة بقدرات متعددة','تعمل في ظروف مناخية قاسية','قابلة للتكوين في سلاسل متعددة'],
  specs_en = array['Flow rates up to hundreds of cubic meters per hour','Multiple capacity options','Operates in harsh weather conditions','Configurable in multi-pump arrays']
where slug = 'wellpoint' and (specs_en is null or specs_en = '{}');

update public.equipment set
  tag_ar = 'حلول نزح دقيقة',
  tag_en = 'Precision dewatering solutions',
  specs_ar = array['أحجام متعددة من الصغيرة إلى الكبيرة','تشغيل كهربائي صامت','مقاومة للملوحة (المياه الجوفية الكويتية)','سهلة التركيب والاسترجاع'],
  specs_en = array['Multiple sizes from small to large','Silent electric operation','Salt-water resistant (Kuwaiti groundwater)','Easy installation and retrieval']
where slug = 'submersible' and (specs_en is null or specs_en = '{}');

update public.equipment set
  tag_ar = 'فولاذ صناعي ثقيل',
  tag_en = 'Heavy industrial steel',
  specs_ar = array['دعامات فولاذية قابلة للتعديل','ألواح تدعيم معدنية','دعامات هيدروليكية للحفريات العميقة','قوالب خرسانة مسلحة','معدات حماية جانبية للمباني المجاورة'],
  specs_en = array['Adjustable steel struts','Metal shoring panels','Hydraulic struts for deep excavations','Reinforced concrete formwork','Lateral-protection equipment for adjacent structures']
where slug = 'shoring-materials' and (specs_en is null or specs_en = '{}');
