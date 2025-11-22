import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Droplets, 
  Shield, 
  Shovel, 
  Wrench,
  Building2,
  Zap,
  Cpu,
  Settings,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  Factory,
  Hospital,
  Hotel,
  ShoppingBag,
  Home as HomeIcon,
  Landmark
} from 'lucide-react';
import heroImage from '@/assets/hero-construction.jpg';
import dewateringImage from '@/assets/dewatering-equipment.jpg';
import shoringImage from '@/assets/shoring-excavation.jpg';
import kuwaitProject from '@/assets/kuwait-project.jpg';
import constructionSite from '@/assets/construction-site.jpg';
import pumpingSystem from '@/assets/pumping-system.jpg';

interface HomeProps {
  language: 'ar' | 'en';
}

export const Home = ({ language }: HomeProps) => {
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const coreServices = [
    {
      icon: Cpu,
      title: isArabic ? 'حلول تكنولوجيا المعلومات والاتصالات' : 'ICT Solutions',
      description: isArabic 
        ? 'أنظمة متكاملة لتكنولوجيا المعلومات والاتصالات للمشاريع الحديثة'
        : 'Integrated ICT systems for modern projects',
    },
    {
      icon: Zap,
      title: isArabic ? 'أنظمة ELV' : 'ELV Systems',
      description: isArabic
        ? 'أنظمة الجهد المنخفض الكهربائية المتقدمة'
        : 'Advanced Extra Low Voltage electrical systems',
    },
    {
      icon: Droplets,
      title: isArabic ? 'نزح المياه الجوفية' : 'Dewatering',
      description: isArabic
        ? 'حلول متطورة لنزح المياه الجوفية'
        : 'Advanced groundwater dewatering solutions',
    },
    {
      icon: Shield,
      title: isArabic ? 'أعمال التدعيم' : 'Shoring Works',
      description: isArabic
        ? 'أنظمة تدعيم متقدمة لضمان السلامة'
        : 'Advanced shoring systems ensuring safety',
    },
    {
      icon: Shovel,
      title: isArabic ? 'أعمال الحفر' : 'Excavation',
      description: isArabic
        ? 'خدمات حفر متخصصة لجميع المشاريع'
        : 'Specialized excavation services',
    },
    {
      icon: Wrench,
      title: isArabic ? 'العزل المائي' : 'Waterproofing',
      description: isArabic
        ? 'حلول عزل مائي شاملة'
        : 'Comprehensive waterproofing solutions',
    },
    {
      icon: Settings,
      title: isArabic ? 'إدارة المشاريع' : 'Project Management',
      description: isArabic
        ? 'إدارة احترافية للمشاريع الهندسية'
        : 'Professional engineering project management',
    },
    {
      icon: Building2,
      title: isArabic ? 'الأعمال الإنشائية' : 'Construction Works',
      description: isArabic
        ? 'خدمات إنشائية متكاملة'
        : 'Integrated construction services',
    },
  ];

  const industries = [
    { icon: Factory, name: isArabic ? 'صناعي' : 'Industrial' },
    { icon: Hospital, name: isArabic ? 'رعاية صحية' : 'Healthcare' },
    { icon: Hotel, name: isArabic ? 'ضيافة' : 'Hospitality' },
    { icon: ShoppingBag, name: isArabic ? 'تجزئة' : 'Retail' },
    { icon: HomeIcon, name: isArabic ? 'سكني' : 'Residential' },
    { icon: Landmark, name: isArabic ? 'مؤسسي' : 'Institutional' },
  ];

  const stats = [
    { number: '500+', label: isArabic ? 'مشاريع منجزة' : 'Projects Completed' },
    { number: '15+', label: isArabic ? 'سنوات خبرة' : 'Years Experience' },
    { number: '98%', label: isArabic ? 'رضا العملاء' : 'Client Satisfaction' },
    { number: '24/7', label: isArabic ? 'دعم فني' : 'Technical Support' },
  ];

  const capabilities = [
    {
      title: isArabic ? 'الخبرة الهندسية' : 'Engineering Expertise',
      description: isArabic 
        ? 'فريق من المهندسين المحترفين مع خبرة عالمية'
        : 'Professional engineering team with global experience',
      icon: Award,
    },
    {
      title: isArabic ? 'تقنيات حديثة' : 'Modern Technology',
      description: isArabic
        ? 'استخدام أحدث التقنيات والمعدات'
        : 'Utilizing latest technologies and equipment',
      icon: Cpu,
    },
    {
      title: isArabic ? 'ضمان الجودة' : 'Quality Assurance',
      description: isArabic
        ? 'معايير عالمية للجودة والسلامة'
        : 'International quality and safety standards',
      icon: CheckCircle2,
    },
    {
      title: isArabic ? 'حلول مبتكرة' : 'Innovative Solutions',
      description: isArabic
        ? 'نهج مبتكر لحل التحديات الهندسية'
        : 'Innovative approach to engineering challenges',
      icon: TrendingUp,
    },
  ];

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Tadeemco Engineering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
        </div>

        {/* Content */}
        <div className="container-width relative z-10 py-20">
          <div className="max-w-4xl">
            <p className={`text-accent text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-semibold ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'مثالية للشغوفين' : 'IDEAL FOR THE PASSIONATE'}
            </p>
            <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? (
                <>
                  نحن شركة<br />
                  تدعيمكو للهندسة<br />
                  والمقاولات
                </>
              ) : (
                <>
                  We're Tadeemco<br />
                  Engineering &<br />
                  Contracting
                </>
              )}
            </h1>
            <p className={`text-white/90 text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic
                ? 'شريكك الموثوق للحلول الهندسية المتكاملة - من تقنية المعلومات والاتصالات إلى الأعمال الإنشائية'
                : 'Your trusted partner for integrated engineering solutions - from ICT to construction works'}
            </p>
            <div className={`flex flex-wrap gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}>
              <Link to="/contact">
                <Button className="btn-hero">
                  {isArabic ? 'اطلب عرض سعر' : 'Request A Quote'}
                </Button>
              </Link>
              <Link to="/services">
                <Button className="btn-outline-white">
                  {isArabic ? 'خدماتنا' : 'Our Services'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* About Tadeemco - Modern & Corporate */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={isArabic ? 'order-2' : 'order-1'}>
              <p className={`text-accent text-sm uppercase tracking-[0.2em] mb-4 font-semibold ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'من نحن' : 'ABOUT TADEEMCO'}
              </p>
              <h2 className={`font-display text-4xl md:text-5xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'التميز في الهندسة منذ 2008' : 'Engineering Excellence Since 2008'}
              </h2>
              <p className={`text-lg text-muted-foreground mb-6 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic
                  ? 'تدعيمكو هي شركة رائدة في مجال الهندسة والمقاولات في الكويت، متخصصة في حلول تكنولوجيا المعلومات والاتصالات، أنظمة ELV، إدارة المياه، والأعمال الإنشائية.'
                  : 'Tadeemco is a leading engineering and contracting company in Kuwait, specializing in ICT solutions, ELV systems, water management, and construction works.'}
              </p>
              <p className={`text-lg text-muted-foreground mb-8 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic
                  ? 'نجمع بين الخبرة الهندسية العميقة والتقنيات الحديثة لتقديم حلول متكاملة تلبي أعلى معايير الجودة والسلامة.'
                  : 'We combine deep engineering expertise with modern technologies to deliver integrated solutions that meet the highest standards of quality and safety.'}
              </p>
              <Link to="/about">
                <Button className="btn-secondary">
                  {isArabic ? 'اعرف المزيد' : 'Learn More'}
                  <ArrowIcon className={`h-5 w-5 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>
            <div className={isArabic ? 'order-1' : 'order-2'}>
              <div className="relative">
                <img 
                  src={constructionSite}
                  alt="Tadeemco Projects"
                  className="w-full h-[500px] object-cover shadow-hero"
                />
                <div className="absolute -bottom-8 -left-8 bg-accent text-white p-8 shadow-construction max-w-xs">
                  <div className="text-5xl font-bold mb-2">15+</div>
                  <div className="text-lg">{isArabic ? 'سنوات من التميز' : 'Years of Excellence'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Our Services - Floating Cards */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
              {isArabic ? 'خدماتنا' : 'OUR SERVICES'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {isArabic ? 'حلول هندسية متكاملة' : 'Comprehensive Engineering Solutions'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {isArabic
                ? 'نقدم مجموعة واسعة من الخدمات الهندسية والتقنية لتلبية جميع احتياجات مشاريعكم'
                : 'We offer a wide range of engineering and technical services to meet all your project needs'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreServices.map((service, index) => (
              <Card key={index} className="service-card floating-card group cursor-pointer">
                <div className="mb-6 inline-block p-4 bg-accent/10 group-hover:bg-accent transition-colors">
                  <service.icon className="h-10 w-10 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link 
                  to="/services" 
                  className={`inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <span>{isArabic ? 'التفاصيل' : 'Details'}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="btn-secondary">
                {isArabic ? 'جميع الخدمات' : 'All Services'}
                <ArrowIcon className={`h-5 w-5 ${isArabic ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Major Projects Gallery */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
              {isArabic ? 'مشاريعنا' : 'OUR PROJECTS'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {isArabic ? 'مشاريع رائدة' : 'Featured Projects'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: dewateringImage, title: isArabic ? 'مشروع السالمية' : 'Salmiya Project', type: isArabic ? 'نزح المياه والتدعيم' : 'Dewatering & Shoring' },
              { img: shoringImage, title: isArabic ? 'مشروع الشويخ' : 'Shuwaikh Project', type: isArabic ? 'أعمال الحفر والتدعيم' : 'Excavation & Shoring' },
              { img: kuwaitProject, title: isArabic ? 'مشروع مشرف' : 'Mishref Project', type: isArabic ? 'العزل المائي' : 'Waterproofing' },
              { img: pumpingSystem, title: isArabic ? 'مشروع الفروانية' : 'Farwaniya Project', type: isArabic ? 'أنظمة الضخ' : 'Pumping Systems' },
              { img: constructionSite, title: isArabic ? 'مشروع حولي' : 'Hawally Project', type: isArabic ? 'أعمال إنشائية' : 'Construction Works' },
              { img: heroImage, title: isArabic ? 'مشروع الجهراء' : 'Jahra Project', type: isArabic ? 'حلول ICT' : 'ICT Solutions' },
            ].map((project, index) => (
              <Card key={index} className="project-card group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <p className="text-accent text-sm font-semibold mb-2">{project.type}</p>
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects">
              <Button className="btn-secondary">
                {isArabic ? 'جميع المشاريع' : 'All Projects'}
                <ArrowIcon className={`h-5 w-5 ${isArabic ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Industries Served */}
      <section className="section-padding-sm bg-primary text-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {isArabic ? 'القطاعات التي نخدمها' : 'Industries We Serve'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="text-center p-6 border-2 border-white/20 hover:bg-white/10 transition-colors">
                <industry.icon className="h-12 w-12 mx-auto mb-3" />
                <p className="font-semibold">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-sm bg-accent text-white">
        <div className="container-width">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <p className="text-lg opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Capabilities & Solutions */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
              {isArabic ? 'قدراتنا' : 'OUR CAPABILITIES'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {isArabic ? 'لماذا تختار تدعيمكو' : 'Why Choose Tadeemco'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-6 bg-accent mb-6">
                  <capability.icon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{capability.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Contact CTA - Premium */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Contact Tadeemco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90"></div>
        </div>

        <div className="container-width relative z-10 text-center text-white">
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-6 font-semibold">
            {isArabic ? 'تواصل معنا' : 'GET IN TOUCH'}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
            {isArabic ? 'جاهزون لمشروعكم القادم؟' : 'Ready for Your Next Project?'}
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {isArabic
              ? 'دعنا نساعدك في تحويل رؤيتك إلى واقع. فريقنا جاهز لتقديم استشارة مجانية وعرض سعر مفصل.'
              : 'Let us help you turn your vision into reality. Our team is ready to provide a free consultation and detailed quote.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-hero">
                {isArabic ? 'اطلب عرض سعر' : 'Request A Quote'}
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="btn-outline-white">
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};