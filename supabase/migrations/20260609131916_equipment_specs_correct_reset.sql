-- ============================================================================
-- Corrective reset of equipment tag/specs (AR + EN) by slug.
--
-- Earlier seeding left some rows in a broken state — e.g. the 'shoring-materials'
-- row had a single malformed Arabic bullet and an EMPTY English specs array, so
-- the admin editor showed Arabic partially filled and English blank.
--
-- This sets the correct Arabic AND English bullets (and tag) for all four known
-- equipment rows, keyed on the stable slug. It is UNCONDITIONAL (overwrites the
-- bad partial data) — run once after confirming no intentional admin edits exist
-- yet. After this, both AR and EN columns open pre-filled in the editor.
--
-- NOTE: unlike the earlier "only-if-empty" backfill, this overwrites. It only
-- targets the four original seed slugs, so any new equipment items an admin adds
-- are untouched.
-- ============================================================================

update public.equipment set
  tag_ar = 'صنع ألماني · قلب أسطولنا',
  tag_en = 'German-made · The heart of our fleet',
  specs_ar = array['قدرة شفط عالية','عمل مستمر ٢٤/٧','محركات ديزل موثوقة','محمولة على عجلات للتنقل السريع','صيانة منتظمة داخلياً'],
  specs_en = array['High suction capacity','Continuous 24/7 operation','Reliable diesel engines','Wheel-mounted for rapid mobilization','Maintained in-house on a regular schedule']
where slug = 'hudig-pumps';

update public.equipment set
  tag_ar = 'للتدفقات العالية',
  tag_en = 'For high-flow applications',
  specs_ar = array['تدفق يصل إلى مئات الأمتار المكعبة/الساعة','متوفرة بقدرات متعددة','تعمل في ظروف مناخية قاسية','قابلة للتكوين في سلاسل متعددة'],
  specs_en = array['Flow rates up to hundreds of cubic meters per hour','Multiple capacity options','Operates in harsh weather conditions','Configurable in multi-pump arrays']
where slug = 'wellpoint';

update public.equipment set
  tag_ar = 'حلول نزح دقيقة',
  tag_en = 'Precision dewatering solutions',
  specs_ar = array['أحجام متعددة من الصغيرة إلى الكبيرة','تشغيل كهربائي صامت','مقاومة للملوحة (المياه الجوفية الكويتية)','سهلة التركيب والاسترجاع'],
  specs_en = array['Multiple sizes from small to large','Silent electric operation','Salt-water resistant (Kuwaiti groundwater)','Easy installation and retrieval']
where slug = 'submersible';

update public.equipment set
  tag_ar = 'فولاذ صناعي ثقيل',
  tag_en = 'Heavy industrial steel',
  specs_ar = array['دعامات فولاذية قابلة للتعديل','ألواح تدعيم معدنية','دعامات هيدروليكية للحفريات العميقة','قوالب خرسانة مسلحة','معدات حماية جانبية للمباني المجاورة'],
  specs_en = array['Adjustable steel struts','Metal shoring panels','Hydraulic struts for deep excavations','Reinforced concrete formwork','Lateral-protection equipment for adjacent structures']
where slug = 'shoring-materials';
