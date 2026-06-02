-- ============================================================================
-- CMS content — phase 2 seed
-- Adds the editable free-form text rows for the Home (remaining labels),
-- About, and Contact pages so an admin can edit EVERY string on the public
-- site (AR + EN) from /admin/content. Idempotent: `on conflict (key) do
-- nothing` means this is safe to run alongside / after the initial migration.
-- ============================================================================

insert into public.site_content (key, page, label, field_type, value_ar, value_en, sort_order) values
  -- ── Home: remaining small labels (eyebrows) ──────────────────────────────
  ('home.services.eyebrow','home','Services — eyebrow','text','خدماتنا','Our Services',11),
  ('home.projects.eyebrow','home','Projects — eyebrow','text','مشاريع منجزة','Completed Projects',12),
  ('home.contractors.eyebrow','home','Contractors — eyebrow','text','من يعمل معنا','Who Works With Us',13),
  ('home.equipment.eyebrow','home','Equipment — eyebrow','text','معداتنا','Our Equipment',14),
  ('home.cta.eyebrow','home','Final CTA — eyebrow','text','تواصل معنا','Get in Touch',15),

  -- ── About ────────────────────────────────────────────────────────────────
  ('about.hero.eyebrow','about','Hero — eyebrow','text','من نحن','About Us',1),
  ('about.hero.title','about','Hero — title','textarea',
   'متخصصون في أعمال التأسيسات تحت الأرض في الكويت',
   'Substructure specialists in the State of Kuwait',2),
  ('about.hero.subtitle','about','Hero — subtitle','textarea',
   'شركة تدعيمكو شركة كويتية متخصصة في أعمال الحفر والتدعيم وسحب المياه الجوفية والعازل المائي — أي المراحل الأولى والأكثر أهمية في دورة حياة أي مشروع إنشائي.',
   'Tadeemco is a Kuwaiti specialist in excavation, shoring, groundwater dewatering, and waterproofing — the earliest and most critical phases in any construction project lifecycle.',3),

  ('about.story.eyebrow','about','Story — eyebrow','text','قصتنا','Our Story',4),
  ('about.story.heading','about','Story — heading','textarea','قصة شركة بُنيت على التخصص','A company built on focus',5),
  ('about.story.p1','about','Story — paragraph 1','textarea',
   'تأسست تدعيمكو لتقدم خدمة متخصصة واحدة بأعلى مستوى: المراحل الأولى من البناء — أعمال الحفر، تدعيم جوانب الحفر، سحب المياه الجوفية، وعزل الأساسات.',
   'Tadeemco was founded to do one thing exceptionally well: the earliest stages of construction — excavation, shoring, groundwater dewatering, and foundation waterproofing.',6),
  ('about.story.p2','about','Story — paragraph 2','textarea',
   'هذه المراحل تحدد نجاح أو فشل المشروع. أي تقصير فيها ينعكس على سلامة الموقع وجودة المنشأة ومدة التنفيذ والتكلفة. لهذا نعمل عليها بمعايير هندسية صارمة ومعدات متخصصة.',
   'These phases determine a project''s success or failure. Any shortcut here affects site safety, structural integrity, timeline, and cost. So we approach them with strict engineering standards and dedicated specialized equipment.',7),
  ('about.story.p3','about','Story — paragraph 3','textarea',
   'زبائننا ليسوا أصحاب المنازل، بل شركات المقاولات الرئيسية والمكاتب الاستشارية — المهنيون الذين يعرفون الفرق بين المقاول المتخصص والمقاول العام.',
   'Our customers aren''t homeowners — they''re main contractors and consulting offices. Professionals who know the difference between a specialist subcontractor and a general one.',8),

  ('about.approach.eyebrow','about','Approach — eyebrow','text','نهجنا','Our Approach',9),
  ('about.approach.heading','about','Approach — heading','textarea','كيف نعمل','How we work',10),
  ('about.approach.1.title','about','Approach 1 — title','text','تخصص عميق','Deep Specialization',11),
  ('about.approach.1.desc','about','Approach 1 — description','textarea',
   'أربع خدمات فقط — وكل واحدة منها أتقنها فريقنا بالكامل. لا نتنافس في كل مجال، بل نقود مجالنا.',
   'Just four services — and our team has mastered each of them fully. We don''t compete across the board; we lead in our specialty.',12),
  ('about.approach.2.title','about','Approach 2 — title','text','فريق هندسي مختص','Dedicated Engineering Team',13),
  ('about.approach.2.desc','about','Approach 2 — description','textarea',
   'مهندسون وفنيون ذوو خبرة طويلة في ظروف التربة الكويتية ومنسوب المياه الجوفية المرتفع.',
   'Engineers and technicians with long experience in Kuwaiti soil conditions and the high water table.',14),
  ('about.approach.3.title','about','Approach 3 — title','text','معدات ألمانية متخصصة','Specialized German Equipment',15),
  ('about.approach.3.desc','about','Approach 3 — description','textarea',
   'أسطول كامل من مضخات HÜDIG-CELLE الألمانية وأنظمة التدعيم الصناعية. لا نستأجر — نملك ونصون.',
   'A full fleet of HÜDIG-CELLE German pumps and industrial shoring systems. We own and maintain — we don''t rent.',16),
  ('about.approach.4.title','about','Approach 4 — title','text','ثقة المقاولين الرئيسيين','Main Contractors'' Trust',17),
  ('about.approach.4.desc','about','Approach 4 — description','textarea',
   'شراكات طويلة الأمد مع أهم شركات المقاولات والمكاتب الاستشارية في الكويت.',
   'Long-standing partnerships with Kuwait''s top main contractors and consulting offices.',18),

  ('about.partners.eyebrow','about','Partners — eyebrow','text','من يعمل معنا','Who Works With Us',19),
  ('about.partners.heading','about','Partners — heading','textarea',
   'نعمل مع أفضل المقاولين والمكاتب الاستشارية في الكويت',
   'Partnering with Kuwait''s top contractors and consultants',20),
  ('about.partners.intro','about','Partners — intro','textarea',
   'المقاولون الرئيسيون الذين اختاروا تدعيمكو كمقاول متخصص لمشاريعهم:',
   'Main contractors who have chosen Tadeemco as their specialist subcontractor:',21),

  ('about.cta.heading','about','Final CTA — heading','text','تريد أن تصبح شريكنا القادم؟','Want to be our next partner?',22),
  ('about.cta.subtitle','about','Final CTA — subtitle','textarea',
   'تحدث مع فريقنا الهندسي للحصول على استشارة مجانية وعرض سعر لمشروعك.',
   'Talk to our engineering team for a free consultation and quote for your project.',23),

  -- ── Contact ───────────────────────────────────────────────────────────────
  ('contact.hero.eyebrow','contact','Hero — eyebrow','text','تواصل معنا','Contact Us',1),
  ('contact.hero.title','contact','Hero — title','textarea','استشارة مجانية وعرض سعر دقيق','Free consultation and accurate quote',2),
  ('contact.hero.subtitle','contact','Hero — subtitle','textarea',
   'فريقنا الهندسي جاهز للاستماع إلى تفاصيل مشروعكم وتقديم عرض سعر مدروس مبنياً على ظروف موقعكم الفعلية.',
   'Our engineering team is ready to hear the details of your project and prepare a carefully-sized quote based on your actual site conditions.',3),
  ('contact.form.eyebrow','contact','Form — eyebrow','text','أرسل استفساراً','Send an inquiry',4),
  ('contact.form.heading','contact','Form — heading','textarea','تفاصيل مشروعك','Tell us about your project',5),
  ('contact.info.eyebrow','contact','Info — eyebrow','text','أو تواصل مباشرةً','Or reach us directly',6),
  ('contact.info.heading','contact','Info — heading','textarea','طرق أسرع للتواصل','Faster ways to connect',7)
on conflict (key) do nothing;
