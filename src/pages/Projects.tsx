import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Building } from 'lucide-react';
import { useState } from 'react';
import dewateringImage from '@/assets/dewatering-equipment.jpg';
import shoringImage from '@/assets/shoring-excavation.jpg';
import kuwaitProject from '@/assets/kuwait-project.jpg';

interface ProjectsProps {
  language: 'ar' | 'en';
}

export const Projects = ({ language }: ProjectsProps) => {
  const isArabic = language === 'ar';
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = isArabic ? [
    { id: 'all', label: 'جميع المشاريع' },
    { id: 'residential', label: 'سكني' },
    { id: 'commercial', label: 'تجاري' },
    { id: 'industrial', label: 'صناعي' },
    { id: 'infrastructure', label: 'بنية تحتية' }
  ] : [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'infrastructure', label: 'Infrastructure' }
  ];

  const projects = [
    {
      id: 1,
      title: isArabic ? 'مشروع السالمية السكني' : 'Salmiya Residential Project',
      type: 'residential',
      location: isArabic ? 'السالمية، الكويت' : 'Salmiya, Kuwait',
      date: '2024',
      services: isArabic ? 'نزح المياه الجوفية والتدعيم' : 'Groundwater Dewatering & Shoring',
      description: isArabic 
        ? 'مشروع سكني متكامل تضمن أعمال نزح المياه الجوفية وتدعيم الحفريات لضمان سلامة البناء'
        : 'Complete residential project including groundwater dewatering and excavation shoring for safe construction',
      image: dewateringImage
    },
    {
      id: 2,
      title: isArabic ? 'مجمع الشويخ التجاري' : 'Shuwaikh Commercial Complex',
      type: 'commercial',
      location: isArabic ? 'الشويخ، الكويت' : 'Shuwaikh, Kuwait',
      date: '2024',
      services: isArabic ? 'أعمال الحفر والتدعيم والعزل' : 'Excavation, Shoring & Waterproofing',
      description: isArabic
        ? 'مشروع تجاري كبير شمل أعمال الحفر العميق والتدعيم المتطور للأساسات'
        : 'Large commercial project featuring deep excavation and advanced foundation shoring',
      image: shoringImage
    },
    {
      id: 3,
      title: isArabic ? 'مشروع مشرف الإسكاني' : 'Mishref Housing Project',
      type: 'residential',
      location: isArabic ? 'مشرف، الكويت' : 'Mishref, Kuwait',
      date: '2023',
      services: isArabic ? 'العزل المائي وأعمال الحفر' : 'Waterproofing & Excavation Works',
      description: isArabic
        ? 'مشروع إسكاني متميز تضمن أعمال العزل المائي المتطورة وحفر الأساسات'
        : 'Distinguished housing project with advanced waterproofing and foundation excavation',
      image: kuwaitProject
    },
    {
      id: 4,
      title: isArabic ? 'المنطقة الصناعية' : 'Industrial Zone Project',
      type: 'industrial',
      location: isArabic ? 'المنطقة الصناعية، الكويت' : 'Industrial Area, Kuwait',
      date: '2023',
      services: isArabic ? 'نزح المياه والحفر الصناعي' : 'Dewatering & Industrial Excavation',
      description: isArabic
        ? 'مشروع صناعي شامل تضمن أعمال نزح المياه للمصانع والمرافق الصناعية'
        : 'Comprehensive industrial project with dewatering for factories and industrial facilities',
      image: shoringImage
    },
    {
      id: 5,
      title: isArabic ? 'مشروع صباح السالم' : 'Sabah Al Salem Project',
      type: 'residential',
      location: isArabic ? 'صباح السالم، الكويت' : 'Sabah Al Salem, Kuwait',
      date: '2023',
      services: isArabic ? 'أعمال التدعيم والحفر' : 'Shoring & Excavation Works',
      description: isArabic
        ? 'مشروع سكني كبير شمل أعمال التدعيم المتقدمة والحفر الآمن'
        : 'Large residential project featuring advanced shoring and safe excavation',
      image: kuwaitProject
    },
    {
      id: 6,
      title: isArabic ? 'مشروع البنية التحتية' : 'Infrastructure Development',
      type: 'infrastructure',
      location: isArabic ? 'مدينة الكويت' : 'Kuwait City',
      date: '2023',
      services: isArabic ? 'جميع الخدمات المتخصصة' : 'All Specialized Services',
      description: isArabic
        ? 'مشروع بنية تحتية شامل تضمن جميع خدماتنا المتخصصة'
        : 'Comprehensive infrastructure project including all our specialized services',
      image: dewateringImage
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
    <div className={`${isArabic ? 'font-cairo' : 'font-roboto'} min-h-screen`}>
      {/* Hero Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center">
            <h1 className={`text-5xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'مشاريعنا المتميزة' : 'Our Featured Projects'}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic
                ? 'نفخر بإنجازاتنا في مجال نزح المياه والتدعيم والحفر عبر مختلف أنحاء الكويت'
                : 'We take pride in our achievements in dewatering, shoring, and excavation across Kuwait'}
            </p>
          </div>
        </div>
      </section>

      {/* Project Filters */}
      <section className="section-padding">
        <div className="container-width">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="transition-professional"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="project-card group">
                <div 
                  className="h-64 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-professional"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {project.date}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-professional">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">{project.services}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="service-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">
                {isArabic ? 'مشروع مكتمل' : 'Completed Projects'}
              </p>
            </Card>
            
            <Card className="service-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">
                {isArabic ? 'سنة خبرة' : 'Years of Experience'}
              </p>
            </Card>
            
            <Card className="service-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">
                {isArabic ? 'رضا العملاء' : 'Client Satisfaction'}
              </p>
            </Card>
            
            <Card className="service-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">
                {isArabic ? 'دعم تقني' : 'Technical Support'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding construction-gradient text-white">
        <div className="container-width text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'مستعدون لمشروعكم القادم؟' : 'Ready for Your Next Project?'}
          </h2>
          <p className={`text-xl mb-8 opacity-90 max-w-3xl mx-auto ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic
              ? 'انضموا إلى قائمة عملائنا الراضين واستفيدوا من خبرتنا المتميزة'
              : 'Join our list of satisfied clients and benefit from our distinguished expertise'}
          </p>
          <Button className="btn-outline-white">
            {isArabic ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
          </Button>
        </div>
      </section>
    </div>
  );
};