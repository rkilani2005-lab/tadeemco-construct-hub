alter table public.equipment add column if not exists tag_ar   text   default '';
alter table public.equipment add column if not exists tag_en   text   default '';
alter table public.equipment add column if not exists specs_ar text[] not null default '{}';
alter table public.equipment add column if not exists specs_en text[] not null default '{}';

update public.equipment set
  tag_ar = 'صنع ألماني · قلب أسطولنا',
  tag_en = 'German-made · The heart of our fleet',
  specs_ar = array['قدرة شفط عالية','عمل مستمر ٢٤/٧','محركات ديزل موثوقة','محمولة على عجلات للتنقل السريع','صيانة منتظمة داخلياً'],
  specs_en = array['High suction capacity','Continuous 24/7 operation','Reliable diesel engines','Wheel-mounted for rapid mobilization','Maintained in-house on a regular schedule']
where sort_order = 1 and (specs_en = '{}' or specs_en is null);

update public.equipment set
  tag_ar = 'للتدفقات العالية',
  tag_en = 'For high-flow applications',
  specs_ar = array['تدفق يصل إلى مئات الأمتار المكعبة/الساعة','متوفرة بقدرات متعددة','تعمل في ظروف مناخية قاسية','قابلة للتكوين في سلاسل متعددة'],
  specs_en = array['Flow rates up to hundreds of cubic meters per hour','Multiple capacity options','Operates in harsh weather conditions','Configurable in multi-pump arrays']
where sort_order = 2 and (specs_en = '{}' or specs_en is null);

update public.equipment set
  tag_ar = 'حلول نزح دقيقة',
  tag_en = 'Precision dewatering solutions',
  specs_ar = array['أحجام متعددة من الصغيرة إلى الكبيرة','تشغيل كهربائي صامت','مقاومة للملوحة (المياه الجوفية الكويتية)','سهلة التركيب والاسترجاع'],
  specs_en = array['Multiple sizes from small to large','Silent electric operation','Salt-water resistant (Kuwaiti groundwater)','Easy installation and retrieval']
where sort_order = 3 and (specs_en = '{}' or specs_en is null);

update public.equipment set
  tag_ar = 'فولاذ صناعي ثقيل',
  tag_en = 'Heavy industrial steel',
  specs_ar = array['دعامات فولاذية قابلة للتعديل','ألواح تدعيم معدنية','دعامات هيدروليكية للحفريات العميقة','قوالب خرسانة مسلحة','معدات حماية جانبية للمباني المجاورة'],
  specs_en = array['Adjustable steel struts','Metal shoring panels','Hydraulic struts for deep excavations','Reinforced concrete formwork','Lateral-protection equipment for adjacent structures']
where sort_order = 4 and (specs_en = '{}' or specs_en is null);