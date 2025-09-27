import { Card } from '@/components/ui/card';
import { Users, Award, Building, Target } from 'lucide-react';

interface AboutProps {
  language: 'ar' | 'en';
}

export const About = ({ language }: AboutProps) => {
  const isArabic = language === 'ar';

  return (
    <div className={`${isArabic ? 'font-cairo' : 'font-roboto'} min-h-screen`}>
      {/* Hero Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center">
            <h1 className={`text-5xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'من نحن' : 'About Tadeemco'}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic
                ? 'ﺷﺮﻛﺔ ﺗﺪﻋﻴﻤﻜﻮ ﻣﺘﺨﺼﺼﺔ ﻓﻲ أﻋﻤﺎل اﻟﺤﻔﺮ ، اﻟﺘﺪﻋﻴﻢ وﺳﺤﺐ  اﻟﻤﻴﺎه اﻟﺠﻮﻓﻴﺔ، واﻟﺘﻲﺗُﻌﺪ ﻣﻦ اﻷﻋﻤﺎل اﻷوﻟﻰ ﻓﻲ ﺗﻨﻔﻴﺬ ﻣﺸﺎرﻳﻊ  اﻟﺒﻨﻴﺔ اﻟﺘﺤﺘﻴﺔ ﻣﻦ ﻣﻘﺎوﻻت اﻟﺒﻨﺎء.  ﺗﺘﻤﻴﺰ اﻟﺸﺮﻛﺔ ﺑﻜﻮﻧﻬﺎ ﻓﻲ ﻣﻘﺪﻣﺔ اﻟﺸﺮﻛﺎت اﻟﺤﺪﻳﺜﺔ اﻟﻌﺎﻣﻠﺔ وﻓﻖ  أﻋﻠﻰ اﻟﻤﻌﺎﻳﻴﺮ اﻟﻔﻨﻴﺔ واﻟﺘﻘﻨﻴﺎت اﻟﻤﺘﻘﺪﻣﺔ، وﻳﻘﻮد أﻋﻤﺎﻟﻬﺎ ﻓﺮﻳﻖ ﻣﻦ  اﻟﻤﻬﻨﺪﺳﻴﻦ واﻟﻔﻨﻴﻴﻦ ذوي اﻟﺨﺒﺮة اﻟﻮاﺳﻌﺔ ﻓﻲ ﻣﺠﺎﻻت ﻧﺰح اﻟﻤﻴﺎه،  اﻟﺘﺪﻋﻴﻢ، ﺣﻔﺮ اﻷﺳﺎس.'
                : 'Tadeemco is a Kuwaiti specialized contractor in groundwater dewatering, shoring, and excavation works, established to provide advanced technical solutions in construction and infrastructure'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="service-card">
              <div className="text-primary mb-6">
                <Target className="h-16 w-16" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {isArabic ? 'رؤيتنا' : 'Our Vision'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {isArabic
                  ? 'أن نكون الشركة الرائدة في الكويت ومنطقة الخليج في مجال نزح المياه الجوفية والتدعيم وأعمال الحفر، من خلال تقديم حلول تقنية مبتكرة ومتطورة'
                  : 'To be the leading company in Kuwait and the Gulf region in groundwater dewatering, shoring, and excavation works, through providing innovative and advanced technical solutions'}
              </p>
            </Card>

            <Card className="service-card">
              <div className="text-primary mb-6">
                <Award className="h-16 w-16" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {isArabic ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {isArabic
                  ? 'تقديم خدمات متخصصة عالية الجودة في مجال نزح المياه والتدعيم والحفر، مع الالتزام بأعلى معايير الأمان والجودة والكفاءة'
                  : 'Providing high-quality specialized services in dewatering, shoring, and excavation, while maintaining the highest standards of safety, quality, and efficiency'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'قيمنا الأساسية' : 'Our Core Values'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Building className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'الجودة' : 'Quality'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'نلتزم بأعلى معايير الجودة في جميع أعمالنا'
                  : 'We maintain the highest quality standards in all our work'}
              </p>
            </Card>

            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Users className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'الفريق المتخصص' : 'Expert Team'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'فريق من المهندسين والفنيين ذوي الخبرة العالية'
                  : 'Team of highly experienced engineers and technicians'}
              </p>
            </Card>

            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Award className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'الابتكار' : 'Innovation'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'نستخدم أحدث التقنيات والحلول المبتكرة'
                  : 'We utilize latest technologies and innovative solutions'}
              </p>
            </Card>

            <Card className="service-card text-center">
              <div className="text-primary mb-4">
                <Target className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'الالتزام' : 'Commitment'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'نلتزم بالمواعيد المحددة وتسليم المشاريع في الوقت المطلوب'
                  : 'We commit to deadlines and deliver projects on time'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Expertise */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'خبرتنا التقنية' : 'Our Technical Expertise'}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isArabic ? 'التحكم في المياه الجوفية' : 'Groundwater Control'}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isArabic
                      ? 'خبرة واسعة في أنظمة نزح المياه الجوفية المتطورة'
                      : 'Extensive experience in advanced groundwater dewatering systems'}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isArabic ? 'أنظمة التدعيم' : 'Shoring Systems'}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isArabic
                      ? 'تصميم وتنفيذ أنظمة تدعيم متطورة لضمان الأمان'
                      : 'Design and implementation of advanced shoring systems for safety'}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isArabic ? 'أعمال الحفر المتخصصة' : 'Specialized Excavation'}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isArabic
                      ? 'تنفيذ أعمال حفر للأساسات في ظروف تربة متنوعة'
                      : 'Foundation excavation works in various soil conditions'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-8 rounded-xl">
              <h3 className={`text-2xl font-bold mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معايير الجودة' : 'Quality Standards'}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{isArabic ? 'معايير السلامة الدولية' : 'International Safety Standards'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{isArabic ? 'فريق مهندسين مؤهل' : 'Qualified Engineering Team'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{isArabic ? 'معدات حديثة ومتطورة' : 'Modern Advanced Equipment'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{isArabic ? 'ضمان الجودة والأداء' : 'Quality and Performance Guarantee'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};