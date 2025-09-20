import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Droplets, Shield, Shovel, Wrench, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import dewateringImage from '@/assets/dewatering-equipment.jpg';
import shoringImage from '@/assets/shoring-excavation.jpg';

interface ServicesProps {
  language: 'ar' | 'en';
}

export const Services = ({ language }: ServicesProps) => {
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const services = [
    {
      id: 'dewatering',
      icon: Droplets,
      title: isArabic ? 'نزح المياه الجوفية' : 'Groundwater Dewatering',
      description: isArabic 
        ? 'حلول متطورة لنزح المياه الجوفية باستخدام أحدث المضخات والتقنيات لضمان بيئة عمل آمنة وجافة'
        : 'Advanced groundwater dewatering solutions using latest pumps and technologies to ensure safe and dry working environment',
      image: dewateringImage,
      features: isArabic ? [
        'مضخات طرد مركزي عالية الكفاءة',
        'أنظمة الآبار النقطية (Wellpoint)',
        'مضخات غاطسة متنوعة الأحجام',
        'مراقبة مستوى المياه الجوفية',
        'تصريف المياه وفقاً للمعايير البيئية'
      ] : [
        'High-efficiency centrifugal pumps',
        'Wellpoint dewatering systems',
        'Various sizes submersible pumps',
        'Groundwater level monitoring',
        'Environmental-compliant water discharge'
      ]
    },
    {
      id: 'shoring',
      icon: Shield,
      title: isArabic ? 'أعمال التدعيم' : 'Shoring Works',
      description: isArabic
        ? 'أنظمة تدعيم متقدمة لضمان سلامة أعمال الحفر والبناء مع استخدام أحدث تقنيات التدعيم'
        : 'Advanced shoring systems ensuring safety in excavation and construction using latest shoring technologies',
      image: shoringImage,
      features: isArabic ? [
        'تدعيم الجدران الاستنادية',
        'أنظمة الدعامات الفولاذية',
        'تدعيم الحفريات العميقة',
        'حماية المباني المجاورة',
        'تصميم هندسي متخصص'
      ] : [
        'Retaining wall support',
        'Steel strut systems',
        'Deep excavation shoring',
        'Adjacent building protection',
        'Specialized engineering design'
      ]
    },
    {
      id: 'excavation',
      icon: Shovel,
      title: isArabic ? 'أعمال الحفر' : 'Excavation Works',
      description: isArabic
        ? 'خدمات حفر متخصصة لجميع أنواع المشاريع السكنية والتجارية والصناعية'
        : 'Specialized excavation services for all types of residential, commercial, and industrial projects',
      image: shoringImage,
      features: isArabic ? [
        'حفر الأساسات العميقة',
        'أعمال الحفر في التربة الصعبة',
        'حفر الخنادق والقنوات',
        'إزالة التربة والردم',
        'استخدام معدات متطورة'
      ] : [
        'Deep foundation excavation',
        'Difficult soil excavation',
        'Trenching and channel digging',
        'Soil removal and backfilling',
        'Advanced equipment usage'
      ]
    },
    {
      id: 'waterproofing',
      icon: Wrench,
      title: isArabic ? 'العازل المائي' : 'Waterproofing',
      description: isArabic
        ? 'حلول عزل مائي شاملة لحماية الأساسات والمباني من تسرب المياه'
        : 'Comprehensive waterproofing solutions for foundation and building protection from water infiltration',
      image: dewateringImage,
      features: isArabic ? [
        'عزل الأساسات والقبو',
        'أنظمة العزل المتطورة',
        'مواد عزل عالية الجودة',
        'الحماية من الرطوبة',
        'ضمانات طويلة المدى'
      ] : [
        'Foundation and basement waterproofing',
        'Advanced waterproofing systems',
        'High-quality waterproofing materials',
        'Moisture protection',
        'Long-term warranties'
      ]
    }
  ];

  return (
    <div className={`${isArabic ? 'font-cairo' : 'font-roboto'} min-h-screen`}>
      {/* Hero Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center">
            <h1 className={`text-5xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic
                ? 'نقدم مجموعة شاملة من الخدمات المتخصصة في مجال نزح المياه والتدعيم والحفر والعزل المائي'
                : 'We provide comprehensive specialized services in dewatering, shoring, excavation, and waterproofing'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding">
        <div className="container-width">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-primary">
                      <service.icon className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-semibold text-foreground">
                      {isArabic ? 'الخصائص الرئيسية:' : 'Key Features:'}
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact">
                    <Button className="btn-hero">
                      {isArabic ? 'اطلب استشارة' : 'Request Consultation'}
                      <ArrowIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="overflow-hidden shadow-construction">
                    <div 
                      className="h-96 bg-cover bg-center"
                      style={{ backgroundImage: `url(${service.image})` }}
                    ></div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding construction-gradient text-white">
        <div className="container-width text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'هل تحتاج لاستشارة تقنية؟' : 'Need Technical Consultation?'}
          </h2>
          <p className={`text-xl mb-8 opacity-90 max-w-3xl mx-auto ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic
              ? 'فريقنا من المهندسين المتخصصين جاهز لتقديم الاستشارة التقنية المناسبة لمشروعكم'
              : 'Our team of specialized engineers is ready to provide the right technical consultation for your project'}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'justify-end' : 'justify-center'}`}>
            <Link to="/contact">
              <Button className="btn-outline-white">
                {isArabic ? 'تواصل معنا الآن' : 'Contact Us Now'}
                <ArrowIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};