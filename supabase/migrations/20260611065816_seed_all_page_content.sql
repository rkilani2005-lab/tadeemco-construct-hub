-- ============================================================================
-- Seed all remaining page-text content keys so every heading, eyebrow,
-- subtitle, paragraph, list item, hero text, CTA, and form label is editable
-- in the admin Content editor.
--
-- Repeated UI strings (Request a Quote, Call Us, etc.) use shared 'common.*'
-- keys so editing once updates every page. Each page also keeps a 'common'
-- group at the top of its editor section.
--
-- field_type: 'text' (single line) or 'textarea' (multi-line).
-- Idempotent: on conflict (key) do nothing — never clobbers admin edits.
-- ============================================================================

insert into public.site_content (key, page, label, field_type, value_ar, value_en, sort_order) values
-- ---------- COMMON (shared across pages) ----------
('common.cta.quote',        'common', 'Button — Request a Quote',  'text', 'اطلب عرض سعر', 'Request a Quote', 1),
('common.cta.quote_full',   'common', 'Button — Request a Full Quote', 'text', 'اطلب عرض سعر شامل', 'Request a Full Quote', 2),
('common.cta.call',         'common', 'Button — Call Us',          'text', 'اتصل بنا', 'Call Us', 3),
('common.cta.call_now',     'common', 'Button — Call Now',         'text', 'اتصل الآن', 'Call Now', 4),
('common.cta.projects',     'common', 'Button — See Our Projects', 'text', 'شاهد مشاريعنا', 'See Our Projects', 5),
('common.cta.services',     'common', 'Button — Our Services',     'text', 'خدماتنا', 'Our Services', 6),
('common.label.main_contractor', 'common', 'Label — Main Contractor', 'text', 'المقاول الرئيسي:', 'Main Contractor:', 7),
('common.label.consultant', 'common', 'Label — Consultant',        'text', 'الاستشاري:', 'Consultant:', 8),

-- ---------- HOME ----------
('home.hero.title',        'home', 'Hero — title',            'textarea', 'لأعمال الحفر والتدعيم وسحب المياه الجوفية', 'Drilling, Shoring & Groundwater Dewatering', 1),
('home.hero.subtitle',     'home', 'Hero — subtitle',         'textarea', '', '', 2),
('home.services.intro',    'home', 'Services — intro',        'textarea', '', '', 20),
('home.projects.details',  'home', 'Projects — "Learn more" link', 'text', 'التفاصيل', 'Learn more', 21),
('home.projects.all',      'home', 'Projects — "All Projects" button', 'text', 'جميع المشاريع', 'All Projects', 22),
('home.equipment.intro',   'home', 'Equipment — intro',       'textarea', '', '', 30),
('home.equipment.view',    'home', 'Equipment — "View Equipment" button', 'text', 'استعرض المعدات', 'View Equipment', 31),
('home.equipment.badge',   'home', 'Equipment — "Made in Germany" badge', 'text', 'مصنوع في ألمانيا', 'Made in Germany', 32),

-- ---------- ABOUT ----------
-- (About story/approach/partners/hero/cta are already seeded in
--  20260602133000_cms_content_about_contact.sql — nothing to add here.)

-- ---------- SERVICES ----------
('services.hero.eyebrow',  'services', 'Hero — eyebrow',       'text', 'خدماتنا', 'Our Services', 1),
('services.hero.title',    'services', 'Hero — title',         'textarea', 'أربع خدمات متخصصة نجيدها', 'Four specialized services, mastered end-to-end', 2),
('services.card.when',     'services', 'Card — "When you need this"', 'text', 'متى تحتاج هذه الخدمة؟', 'When you need this service', 10),
('services.card.methods',  'services', 'Card — "Our Equipment & Methods"', 'text', 'معداتنا وأساليبنا', 'Our Equipment & Methods', 11),
('services.card.expertise','services', 'Card — "Expertise" tag', 'text', 'خبرة', 'Expertise', 12),
('services.cta.heading',   'services', 'CTA — heading',        'textarea', 'نحتاج خدمتين أو أكثر في مشروعك؟', 'Need two or more of these services on your project?', 20),

-- ---------- PROJECTS ----------
('projects.hero.eyebrow',  'projects', 'Hero — eyebrow',       'text', 'مشاريعنا', 'Our Projects', 1),
('projects.hero.title',    'projects', 'Hero — title',         'textarea', 'مشاريع حقيقية. مقاولون رئيسيون حقيقيون.', 'Real projects. Real main contractors.', 2),
('projects.filter.service','projects', 'Filter — "By Service" label', 'text', 'حسب الخدمة', 'By Service', 10),
('projects.filter.area',   'projects', 'Filter — "By Area" label', 'text', 'حسب المنطقة', 'By Area', 11),
('projects.filter.all_services', 'projects', 'Filter — All Services', 'text', 'جميع الخدمات', 'All Services', 12),
('projects.filter.all_areas',    'projects', 'Filter — All Areas', 'text', 'جميع المناطق', 'All Areas', 13),
('projects.empty',         'projects', 'Empty state text',     'textarea', 'لا توجد مشاريع مطابقة للفلاتر المختارة.', 'No projects match the selected filters.', 14),
('projects.reset',         'projects', 'Reset filters button', 'text', 'إعادة تعيين الفلاتر', 'Reset filters', 15),
('projects.cta.heading',   'projects', 'CTA — heading',        'textarea', 'مستعدون لمشروعكم القادم؟', 'Ready for Your Next Project?', 20),

-- ---------- EQUIPMENT ----------
('equipment.hero.eyebrow', 'equipment', 'Hero — eyebrow',      'text', 'معداتنا', 'Our Equipment', 1),
('equipment.hero.title',   'equipment', 'Hero — title',        'textarea', 'أسطول متخصص، ليس مستأجراً', 'A specialist fleet, not a rental shop', 2),
('equipment.lead_label',   'equipment', '"Lead Manufacturer" label', 'text', 'الشركة المصنعة الرئيسية', 'Lead Manufacturer', 10),
('equipment.specs_label',  'equipment', '"Key Specifications" label', 'text', 'المواصفات الرئيسية', 'Key Specifications', 11),
('equipment.cta.heading',  'equipment', 'CTA — heading',       'textarea', 'تحتاج معدات متخصصة لمشروعك؟', 'Need specialized equipment for your project?', 20),

-- ---------- CONTACT ----------
('contact.form.name',      'contact', 'Form — Full Name label', 'text', 'الاسم الكامل', 'Full Name', 10),
('contact.form.phone',     'contact', 'Form — Phone label',    'text', 'رقم الهاتف', 'Phone', 11),
('contact.form.email',     'contact', 'Form — Email label',    'text', 'البريد الإلكتروني', 'Email', 12),
('contact.form.service',   'contact', 'Form — Service Needed label', 'text', 'الخدمة المطلوبة', 'Service Needed', 13),
('contact.form.service_placeholder', 'contact', 'Form — service select placeholder', 'text', 'اختر خدمة...', 'Select a service...', 14),
('contact.form.details',   'contact', 'Form — Project Details label', 'text', 'تفاصيل المشروع', 'Project Details', 15),
('contact.form.details_placeholder', 'contact', 'Form — details placeholder', 'textarea', 'الموقع، نوع المشروع، الجدول الزمني المتوقع، أي تفاصيل إضافية...', 'Location, project type, expected timeline, any additional details...', 16),
('contact.form.submit',    'contact', 'Form — Submit button',  'text', 'إرسال الاستفسار', 'Send Inquiry', 17),
('contact.info.call_now',  'contact', '"Call Now" label',      'text', 'اتصل الآن', 'Call Now', 20),
('contact.info.office',    'contact', '"Office" label',        'text', 'المكتب', 'Office', 21),
('contact.info.phones',    'contact', '"Phone Numbers" label', 'text', 'أرقام الهاتف', 'Phone Numbers', 22)
on conflict (key) do nothing;
