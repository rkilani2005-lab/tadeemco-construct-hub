import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
interface ContactProps {
  language: 'ar' | 'en';
}
export const Contact = ({
  language
}: ContactProps) => {
  const isArabic = language === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <div className={`${isArabic ? 'font-cairo' : 'font-roboto'} min-h-screen`}>
      {/* Hero Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center">
            <h1 className={`text-5xl font-bold text-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'نحن هنا لمساعدتكم في جميع احتياجاتكم التقنية. تواصلوا معنا للحصول على استشارة مجانية' : 'We are here to help you with all your technical needs. Contact us for a free consultation'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className={`text-3xl font-bold text-foreground mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معلومات التواصل' : 'Contact Information'}
              </h2>

              <div className="space-y-8">
                <Card className="service-card">
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {isArabic ? 'العنوان' : 'Address'}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {isArabic ? 'مدينة الكويت – مبنى الدروازة 51 – دور 6 – مكتب 30' : 'Kuwait City - Darwaza Building 51 - Floor 6 - Office 30'}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="service-card">
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {isArabic ? 'أرقام الهاتف' : 'Phone Numbers'}
                      </h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>90001662</p>
                        <p>9222 3657</p>
                        <p>9966 7785</p>
                        <p>9088 8809</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="service-card">
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {isArabic ? 'البريد الإلكتروني' : 'Email'}
                      </h3>
                      <p className="text-muted-foreground">info@tadeemco.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="service-card">
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {isArabic ? 'ساعات العمل' : 'Working Hours'}
                      </h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>{isArabic ? 'الأحد - الخميس: 8:00 ص - 5:00 م' : 'Sunday - Thursday: 8:00 AM - 5:00 PM'}</p>
                        <p>{isArabic ? 'الجمعة والسبت: مغلق' : 'Friday & Saturday: Closed'}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className={`text-3xl font-bold text-foreground mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>

              <Card className="service-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full" placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full" placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full" placeholder={isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number'} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {isArabic ? 'الرسالة' : 'Message'}
                    </label>
                    <Textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full" placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'} />
                  </div>

                  <Button type="submit" className="btn-hero w-full">
                    {isArabic ? 'إرسال الرسالة' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold text-foreground mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'موقعنا' : 'Our Location'}
            </h2>
          </div>
          
          <Card className="overflow-hidden shadow-construction">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {isArabic ? 'مكتبنا في الكويت' : 'Our Office in Kuwait'}
                </h3>
                <p className="text-muted-foreground">
                  {isArabic ? 'مدينة الكويت – مبنى الدروازة 51 – دور 6 – مكتب 30' : 'Kuwait City - Darwaza Building 51 - Floor 6 - Office 30'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>;
};