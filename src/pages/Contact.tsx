import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';
interface ContactProps {
  language: 'ar' | 'en';
}
export const Contact = ({
  language
}: ContactProps) => {
  const isArabic = language === 'ar';
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast({
        title: isArabic ? "تم إرسال الرسالة بنجاح" : "Message sent successfully",
        description: isArabic ? "شكراً لتواصلكم معنا. سنقوم بالرد عليكم قريباً" : "Thank you for contacting us. We will get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: isArabic ? "خطأ في إرسال الرسالة" : "Error sending message",
        description: isArabic ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى" : "An error occurred while sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <div className={`${isArabic ? 'font-cairo' : 'font-roboto'} min-h-screen`}>
      <SEO page={seo.contact} language={language} />
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
                      <a 
                        href="https://maps.google.com/?q=Kuwait+City+Darwaza+Building+51+Floor+6+Office+30"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground leading-relaxed hover:text-primary transition-colors cursor-pointer"
                      >
                        {isArabic ? 'مدينة الكويت – مبنى الدروازة 51 – دور 6 – مكتب 30' : 'Kuwait City - Darwaza Building 51 - Floor 6 - Office 30'}
                      </a>
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
                        <a href="tel:+96590001662" className="block hover:text-primary transition-colors cursor-pointer">90001662</a>
                        <a href="tel:+96592223657" className="block hover:text-primary transition-colors cursor-pointer">92223657</a>
                        <a href="tel:+96599667785" className="block hover:text-primary transition-colors cursor-pointer">99667785</a>
                        <a href="tel:+96590888809" className="block hover:text-primary transition-colors cursor-pointer">90888809</a>
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
                      <a 
                        href="mailto:info@tadeemco.com"
                        className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        info@tadeemco.com
                      </a>
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
            <div id="contact-form">
              <h2 className={`text-3xl font-bold text-foreground mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>

              <Card className="service-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} required className={`w-full ${isArabic ? 'text-right' : 'text-left'}`} placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'} dir={isArabic ? 'rtl' : 'ltr'} />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full ${isArabic ? 'text-right' : 'text-left'}`} placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'} dir={isArabic ? 'rtl' : 'ltr'} />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full ${isArabic ? 'text-right' : 'text-left'}`} placeholder={isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number'} dir={isArabic ? 'rtl' : 'ltr'} />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'الرسالة' : 'Message'}
                    </label>
                    <Textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={`w-full ${isArabic ? 'text-right' : 'text-left'}`} placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'} dir={isArabic ? 'rtl' : 'ltr'} />
                  </div>

                  <Button type="submit" className="btn-hero w-full" disabled={isSubmitting}>
                    {isSubmitting 
                      ? (isArabic ? 'جاري الإرسال...' : 'Sending...') 
                      : (isArabic ? 'إرسال الرسالة' : 'Send Message')
                    }
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
            <a 
              href="https://maps.google.com/?q=Kuwait+City+Darwaza+Building+51+Floor+6+Office+30"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-96 bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer"
            >
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {isArabic ? 'مكتبنا في الكويت' : 'Our Office in Kuwait'}
                </h3>
                <p className="text-muted-foreground">
                  {isArabic ? 'مدينة الكويت – مبنى الدروازة 51 – دور 6 – مكتب 30' : 'Kuwait City - Darwaza Building 51 - Floor 6 - Office 30'}
                </p>
              </div>
            </a>
          </Card>
        </div>
      </section>
    </div>;
};