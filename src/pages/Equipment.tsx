import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Droplets, Zap, Settings, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import dewateringImage from '@/assets/dewatering-equipment.jpg';
import shoringImage from '@/assets/shoring-excavation.jpg';

interface EquipmentProps {
  language: 'ar' | 'en';
}

export const Equipment = ({ language }: EquipmentProps) => {
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const equipmentCategories = [
    {
      id: 'pumps',
      icon: Droplets,
      title: isArabic ? 'المضخات المتخصصة' : 'Specialized Pumps',
      description: isArabic 
        ? 'مجموعة شاملة من المضخات عالية الكفاءة لجميع أنواع أعمال نزح المياه'
        : 'Comprehensive range of high-efficiency pumps for all types of dewatering works',
      image: dewateringImage,
      equipment: isArabic ? [
        'مضخات طرد مركزي عالية الكفاءة',
        'مضخات غاطسة متنوعة الأحجام',
        'مضخات الضغط العالي',
        'مضخات التفريغ (Vacuum Pumps)',
        'أنظمة المضخات المتنقلة'
      ] : [
        'High-efficiency centrifugal pumps',
        'Various sizes submersible pumps',
        'High-pressure pumps',
        'Vacuum pumps',
        'Mobile pump systems'
      ]
    },
    {
      id: 'wellpoint',
      icon: Zap,
      title: isArabic ? 'أنظمة الآبار النقطية' : 'Wellpoint Systems',
      description: isArabic
        ? 'أنظمة متطورة للآبار النقطية لنزح المياه الجوفية بكفاءة عالية'
        : 'Advanced wellpoint systems for highly efficient groundwater dewatering',
      image: shoringImage,
      equipment: isArabic ? [
        'آبار نقطية بأقطار متنوعة',
        'أنظمة الشفط المركزية',
        'أنابيب الربط والتوزيع',
        'أجهزة مراقبة مستوى المياه',
        'معدات التركيب المتخصصة'
      ] : [
        'Various diameter wellpoints',
        'Central vacuum systems',
        'Connection and distribution pipes',
        'Water level monitoring devices',
        'Specialized installation equipment'
      ]
    },
    {
      id: 'shoring',
      icon: Shield,
      title: isArabic ? 'معدات التدعيم' : 'Shoring Equipment',
      description: isArabic
        ? 'أنظمة تدعيم متطورة لضمان سلامة أعمال الحفر والبناء'
        : 'Advanced shoring systems ensuring safety in excavation and construction works',
      image: dewateringImage,
      equipment: isArabic ? [
        'دعائم فولاذية قابلة للتعديل',
        'ألواح التدعيم المعدنية',
        'أنظمة التدعيم الهيدروليكية',
        'قوالب الخرسانة المسلحة',
        'معدات الحماية الجانبية'
      ] : [
        'Adjustable steel struts',
        'Metal shoring panels',
        'Hydraulic shoring systems',
        'Reinforced concrete forms',
        'Side protection equipment'
      ]
    },
    {
      id: 'excavation',
      icon: Settings,
      title: isArabic ? 'معدات الحفر' : 'Excavation Equipment',
      description: isArabic
        ? 'مجموعة متكاملة من معدات الحفر المتطورة لجميع أنواع التربة'
        : 'Complete range of advanced excavation equipment for all soil types',
      image: shoringImage,
      equipment: isArabic ? [
        'حفارات هيدروليكية متنوعة الأحجام',
        'معدات الحفر في التربة الصخرية',
        'أجهزة الحفر الدقيق',
        'معدات نقل ورفع المواد',
        'أدوات القياس والمسح'
      ] : [
        'Various sizes hydraulic excavators',
        'Rock excavation equipment',
        'Precision drilling equipment',
        'Material handling and lifting equipment',
        'Measurement and surveying tools'
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
              {isArabic ? 'معداتنا المتطورة' : 'Our Advanced Equipment'}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic
                ? 'نمتلك أحدث المعدات والتقنيات المتطورة لضمان تنفيذ المشاريع بأعلى معايير الجودة والكفاءة'
                : 'We possess the latest equipment and advanced technologies to ensure project execution with the highest standards of quality and efficiency'}
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="section-padding">
        <div className="container-width">
          <div className="space-y-16">
            {equipmentCategories.map((category, index) => (
              <div key={category.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-primary">
                      <category.icon className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-semibold text-foreground">
                      {isArabic ? 'المعدات المتوفرة:' : 'Available Equipment:'}
                    </h3>
                    <ul className="space-y-3">
                      {category.equipment.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact">
                    <Button className="btn-hero">
                      {isArabic ? 'استفسر عن المعدات' : 'Inquire About Equipment'}
                      <ArrowIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="overflow-hidden shadow-construction">
                    <div 
                      className="h-96 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${category.image})` }}
                    >
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground">
                            {isArabic ? 'معدات عالية الجودة' : 'High Quality Equipment'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? 'معايير دولية' : 'International Standards'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Features */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'مزايا معداتنا' : 'Our Equipment Advantages'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Zap className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'كفاءة عالية' : 'High Efficiency'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'معدات عالية الكفاءة لضمان الأداء الأمثل'
                  : 'High-efficiency equipment ensuring optimal performance'}
              </p>
            </Card>
            
            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Shield className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'أمان متقدم' : 'Advanced Safety'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'أنظمة أمان متطورة لحماية العمال والمشروع'
                  : 'Advanced safety systems protecting workers and project'}
              </p>
            </Card>
            
            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Settings className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'صيانة دورية' : 'Regular Maintenance'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'برنامج صيانة دورية لضمان الأداء المستمر'
                  : 'Regular maintenance program ensuring continuous performance'}
              </p>
            </Card>
            
            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Droplets className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'تقنيات حديثة' : 'Modern Technology'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'أحدث التقنيات في مجال نزح المياه والتدعيم'
                  : 'Latest technologies in dewatering and shoring'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding construction-gradient text-white">
        <div className="container-width text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'هل تحتاج لمعدات متخصصة؟' : 'Need Specialized Equipment?'}
          </h2>
          <p className={`text-xl mb-8 opacity-90 max-w-3xl mx-auto ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic
              ? 'معداتنا المتطورة متاحة لمشاريعكم مع فريق تشغيل متخصص'
              : 'Our advanced equipment is available for your projects with specialized operation team'}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'justify-end' : 'justify-center'}`}>
            <Link to="/contact">
              <Button className="btn-outline-white">
                {isArabic ? 'اطلب عرض سعر' : 'Request Quote'}
                <ArrowIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};