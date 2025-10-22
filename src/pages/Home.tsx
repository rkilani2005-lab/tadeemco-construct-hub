import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Droplets, Shield, Shovel, Wrench } from 'lucide-react';
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

  const services = [
    {
      icon: Droplets,
      title: isArabic ? 'نزح المياه الجوفية' : 'Groundwater Dewatering',
      description: isArabic 
        ? 'حلول متطورة لنزح المياه الجوفية باستخدام أحدث المضخات والتقنيات'
        : 'Advanced groundwater dewatering solutions using latest pumps and technologies',
    },
    {
      icon: Shield,
      title: isArabic ? 'أعمال التدعيم' : 'Shoring Works',
      description: isArabic
        ? 'أنظمة تدعيم متقدمة لضمان سلامة أعمال الحفر والبناء'
        : 'Advanced shoring systems ensuring safety in excavation and construction',
    },
    {
      icon: Shovel,
      title: isArabic ? 'أعمال الحفر' : 'Excavation Works',
      description: isArabic
        ? 'خدمات حفر متخصصة لجميع أنواع المشاريع السكنية والتجارية'
        : 'Specialized excavation services for all residential and commercial projects',
    },
    {
      icon: Wrench,
      title: isArabic ? 'العازل المائي' : 'Waterproofing',
      description: isArabic
        ? 'حلول عزل مائي شاملة لحماية الأساسات والمباني'
        : 'Comprehensive waterproofing solutions for foundation and building protection',
    },
  ];

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-8rem)] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-width py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={isArabic ? 'order-2 lg:order-1' : 'order-1'}>
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? (
                  <>
                    <span className="text-[hsl(var(--info))]">مؤسسة في</span><br />
                    <span className="text-[hsl(var(--info))]">الهندسة،</span><br />
                    <span className="text-foreground">منجزة في</span><br />
                    <span className="text-foreground">الشراكة.</span>
                  </>
                ) : (
                  <>
                    <span className="text-[hsl(var(--info))]">Grounded in</span><br />
                    <span className="text-[hsl(var(--info))]">engineering,</span><br />
                    <span className="text-foreground">delivered in</span><br />
                    <span className="text-foreground">partnership.</span>
                  </>
                )}
              </h1>
              <p className={`text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic
                  ? 'تدعيمكو تقدم حلول إدارة المياه المصممة خصيصاً والتي تجمع بين المبادئ العلمية مع نهج استشاري لتحقيق النجاح في جميع أنحاء العالم.'
                  : 'Tadeemco provides tailored water management solutions that combine scientific principles with a consultative approach to deliver success around the world.'}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}>
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-none font-semibold transition-professional">
                    {isArabic ? 'ابدأ الآن' : 'Get started'}
                  </Button>
                </Link>
                <Link to="/about" className={`flex items-center gap-2 text-foreground hover:text-primary transition-professional font-medium text-lg ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span>{isArabic ? 'شاهد الفيديو' : 'Watch video'}</span>
                  <ArrowIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right Image with Curved Overlay */}
            <div className={`relative ${isArabic ? 'order-1 lg:order-2' : 'order-2'}`}>
              <div className="relative aspect-[4/3] rounded-full overflow-hidden">
                <img 
                  src={heroImage}
                  alt={isArabic ? 'مشروع تدعيمكو' : 'Tadeemco Project'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-[hsl(var(--info))] rounded-full opacity-30"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 border-4 border-[hsl(var(--info))] rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'لماذا تختار تدعيمكو؟' : 'Why Choose Tadeemco?'}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic
                ? 'نحن شركة متخصصة في أعمال نزح المياه الجوفية والتدعيم والحفر، نقدم حلولاً تقنية متطورة مع فريق من المهندسين ذوي الخبرة العالية'
                : 'We are a specialized contractor in groundwater dewatering, shoring, and excavation works, providing advanced technical solutions with our highly experienced engineering team'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Shield className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'معايير تقنية عالية' : 'High Technical Standards'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'نلتزم بأعلى المعايير التقنية في جميع مشاريعنا'
                  : 'We maintain the highest technical standards in all our projects'}
              </p>
            </Card>

            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Wrench className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'فريق مهندسين متخصص' : 'Specialized Engineering Team'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'فريق من المهندسين ذوي الخبرة والتخصص العالي'
                  : 'Experienced and highly specialized engineering team'}
              </p>
            </Card>

            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Droplets className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'تقنيات متطورة' : 'Advanced Technologies'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'استخدام أحدث التقنيات والمعدات في السوق'
                  : 'Utilizing the latest technologies and equipment in the market'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="service-card text-center group">
                <div className="text-primary mb-6 group-hover:scale-110 transition-professional">
                  <service.icon className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="btn-hero">
                {isArabic ? 'تفاصيل الخدمات' : 'Service Details'}
                <ArrowIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'مشاريع مميزة' : 'Featured Projects'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="project-card">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${dewateringImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? 'مشروع السالمية' : 'Salmiya Project'}
                </h3>
                <p className="text-muted-foreground">
                  {isArabic ? 'نزح المياه الجوفية والتدعيم' : 'Dewatering & Shoring Works'}
                </p>
              </div>
            </Card>

            <Card className="project-card">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${shoringImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? 'مشروع الشويخ' : 'Shuwaikh Project'}
                </h3>
                <p className="text-muted-foreground">
                  {isArabic ? 'أعمال الحفر والتدعيم' : 'Excavation & Shoring'}
                </p>
              </div>
            </Card>

            <Card className="project-card">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${kuwaitProject})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? 'مشروع مشرف' : 'Mishref Project'}
                </h3>
                <p className="text-muted-foreground">
                  {isArabic ? 'العازل المائي والحفر' : 'Waterproofing & Excavation'}
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/projects">
              <Button className="btn-hero">
                {isArabic ? 'جميع المشاريع' : 'All Projects'}
                <ArrowIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding construction-gradient text-white">
        <div className="container-width text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'جاهزون لمشروعكم القادم؟' : 'Ready for Your Next Project?'}
          </h2>
          <p className={`text-xl mb-8 opacity-90 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic
              ? 'تواصلوا معنا اليوم للحصول على استشارة مجانية'
              : 'Contact us today for a free consultation'}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'justify-end' : 'justify-center'}`}>
            <Link to="/contact">
              <Button className="btn-outline-white">
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
                <ArrowIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};