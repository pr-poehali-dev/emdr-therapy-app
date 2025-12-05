import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface JournalDialogProps {
  showJournalDialog: boolean;
  setShowJournalDialog: (value: boolean) => void;
  beforeSessionText: string;
  setBeforeSessionText: (value: string) => void;
  afterSessionText: string;
  setAfterSessionText: (value: string) => void;
  sessionDuration: number;
  formatTime: (seconds: number) => string;
  saveJournalEntry: () => void;
}

const JournalDialog = ({
  showJournalDialog,
  setShowJournalDialog,
  beforeSessionText,
  setBeforeSessionText,
  afterSessionText,
  setAfterSessionText,
  sessionDuration,
  formatTime,
  saveJournalEntry
}: JournalDialogProps) => {
  return (
    <Dialog open={showJournalDialog} onOpenChange={setShowJournalDialog}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>📝 Дневник ощущений</DialogTitle>
          <DialogDescription>
            Сессия завершена! Запишите свои наблюдения
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="before" className="mb-2 block">
              Ощущения перед сессией
            </Label>
            <p className="text-xs text-muted-foreground mb-2">
              {beforeSessionText ? 'Вы записали:' : 'Что вы испытывали перед сессией?'}
            </p>
            <Textarea
              id="before"
              value={beforeSessionText}
              onChange={(e) => setBeforeSessionText(e.target.value)}
              placeholder="Опишите ваши ощущения..."
              rows={4}
              disabled={!!beforeSessionText}
              className={beforeSessionText ? 'bg-purple-50' : ''}
            />
          </div>

          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Длительность сессии</div>
            <div className="text-xl font-bold text-purple-600">
              {formatTime(sessionDuration)}
            </div>
          </div>

          <div>
            <Label htmlFor="after" className="mb-2 block">
              Ощущения после сессии
            </Label>
            <p className="text-xs text-muted-foreground mb-2">
              Что вы испытываете теперь? Что изменилось?
            </p>
            <Textarea
              id="after"
              value={afterSessionText}
              onChange={(e) => setAfterSessionText(e.target.value)}
              placeholder="Опишите ваши ощущения..."
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowJournalDialog(false)}
              className="flex-1"
            >
              Пропустить
            </Button>
            <Button
              onClick={saveJournalEntry}
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

export default JournalDialog;
