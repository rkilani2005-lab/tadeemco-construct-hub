import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BilingualFieldProps {
  label: string;
  ar: string;
  en: string;
  onAr: (v: string) => void;
  onEn: (v: string) => void;
  multiline?: boolean;
}

/** AR (rtl) + EN side-by-side inputs used throughout the editors. */
export const BilingualField = ({ label, ar, en, onAr, onEn, multiline }: BilingualFieldProps) => {
  const Field = multiline ? Textarea : Input;
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-foreground">{label}</Label>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">العربية</span>
          <Field dir="rtl" value={ar} onChange={(e) => onAr(e.target.value)} className="font-cairo" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">English</span>
          <Field dir="ltr" value={en} onChange={(e) => onEn(e.target.value)} />
        </div>
      </div>
    </div>
  );
};
