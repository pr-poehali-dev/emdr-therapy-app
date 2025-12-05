import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface BeforeSessionDialogProps {
  showBeforeDialog: boolean;
  setShowBeforeDialog: (value: boolean) => void;
  tempBeforeText: string;
  saveBeforeSession: (text: string) => void;
}

const BeforeSessionDialog = ({
  showBeforeDialog,
  setShowBeforeDialog,
  tempBeforeText,
  saveBeforeSession
}: BeforeSessionDialogProps) => {
  const [localText, setLocalText] = useState(tempBeforeText);

  const handleSave = () => {
    saveBeforeSession(localText);
  };

  const handleCancel = () => {
    setLocalText(tempBeforeText);
    setShowBeforeDialog(false);
  };

  return (
    <Dialog open={showBeforeDialog} onOpenChange={(open) => {
      if (!open) handleCancel();
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>📝 Ощущения перед сессией</DialogTitle>
          <DialogDescription>
            Запишите, что вы чувствуете перед началом сессии
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="before-text" className="mb-2 block">
              Ваши ощущения
            </Label>
            <p className="text-xs text-muted-foreground mb-2">
              Что вы испытываете? Где? С чем это связано? (тревога в груди, паника в теле?)
            </p>
            <Textarea
              id="before-text"
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              placeholder="Опишите ваши ощущения..."
              rows={6}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BeforeSessionDialog;
