import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  language: 'ar' | 'en';
}

export const Footer = ({ language }: FooterProps) => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className={language === 'ar' ? 'font-cairo text-right' : 'font-roboto text-left'}>
            <h3 className="text-xl font-bold mb-4">
              {language === 'ar' ? 'شركة تدعيمكو' : 'Tadeemco'}
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              {language === 'ar'
                ? 'خبرة في نزح المياه والتدعيم وأعمال الحفر'
                : 'Experts in Dewatering, Shoring & Excavation Works'}
            </p>
          </div>

          {/* Contact Info */}
          <div className={language === 'ar' ? 'font-cairo text-right' : 'font-roboto text-left'}>
            <h3 className="text-xl font-bold mb-4">
              {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">
                  {language === 'ar'
                    ? 'مدينة الكويت – مبنى الدروازة 51 – دور 6 – مكتب 30'
                    : 'Kuwait City - Darwaza Building 51 - Floor 6 - Office 30'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span className="text-sm">9000 1662 | 9222 3657</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span className="text-sm">info@tadeemco.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className={language === 'ar' ? 'font-cairo text-right' : 'font-roboto text-left'}>
            <h3 className="text-xl font-bold mb-4">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>{language === 'ar' ? 'نزح المياه الجوفية' : 'Groundwater Dewatering'}</li>
              <li>{language === 'ar' ? 'أعمال التدعيم' : 'Shoring Works'}</li>
              <li>{language === 'ar' ? 'أعمال الحفر' : 'Excavation Works'}</li>
              <li>{language === 'ar' ? 'العازل المائي' : 'Waterproofing'}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 {language === 'ar' ? 'شركة تدعيمكو' : 'Tadeemco'}. 
            {language === 'ar' ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};