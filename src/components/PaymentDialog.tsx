import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PaymentDialogProps {
  showPaymentDialog: boolean;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  handlePayment: () => void;
}

const PaymentDialog = ({ showPaymentDialog, cardNumber, setCardNumber, handlePayment }: PaymentDialogProps) => {
  return (
    <Dialog open={showPaymentDialog} onOpenChange={() => {}}>
      <DialogContent className="max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">💎 Подписка EMDR</DialogTitle>
          <DialogDescription className="text-center text-base">
            Для использования приложения необходима подписка
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">200 ₽</div>
            <div className="text-sm text-muted-foreground">в месяц</div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-purple-500 mt-1" />
              <span className="text-sm">Неограниченные EMDR сессии</span>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-purple-500 mt-1" />
              <span className="text-sm">Дневник ощущений</span>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-purple-500 mt-1" />
              <span className="text-sm">История и статистика</span>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-purple-500 mt-1" />
              <span className="text-sm">Персональные заметки</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="card">Номер карты</Label>
            <Input
              id="card"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                setCardNumber(formatted);
              }}
              maxLength={19}
              className="text-center text-lg"
            />
          </div>

          <Button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            size="lg"
            disabled={cardNumber.replace(/\s/g, '').length !== 16}
          >
            Оформить подписку
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Автоматическое списание 200₽ каждый месяц. Отмена в любое время.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
