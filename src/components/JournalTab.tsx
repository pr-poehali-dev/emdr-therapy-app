import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface JournalEntry {
  id: string;
  date: string;
  time: string;
  beforeSession: string;
  sessionDuration: number;
  afterSession: string;
}

interface Note {
  id: string;
  date: string;
  content: string;
}

interface JournalTabProps {
  journalEntries: JournalEntry[];
  notes: Note[];
  newNoteText: string;
  setNewNoteText: (value: string) => void;
  addNote: () => void;
  formatTime: (seconds: number) => string;
}

const JournalTab = ({
  journalEntries,
  notes,
  newNoteText,
  setNewNoteText,
  addNote,
  formatTime
}: JournalTabProps) => {
  return (
    <>
      <Card className="p-6 backdrop-blur-sm bg-white/80 border-purple-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="BookOpen" size={24} />
          Дневник ощущений
        </h2>

        {journalEntries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📔</div>
            <p className="text-muted-foreground">Дневник пока пуст</p>
            <p className="text-sm text-muted-foreground mt-2">
              Завершите сессию, чтобы добавить запись
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg border border-purple-100 bg-purple-50/30 space-y-3"
              >
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{entry.date}</span>
                  <span>{entry.time}</span>
                </div>
                
                {entry.beforeSession && (
                  <div>
                    <div className="text-xs font-medium text-purple-600 mb-1">До сессии:</div>
                    <p className="text-sm">{entry.beforeSession}</p>
                  </div>
                )}

                <div className="text-center py-2 bg-blue-50 rounded text-sm">
                  ⏱️ {formatTime(entry.sessionDuration)}
                </div>

                {entry.afterSession && (
                  <div>
                    <div className="text-xs font-medium text-blue-600 mb-1">После сессии:</div>
                    <p className="text-sm">{entry.afterSession}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 backdrop-blur-sm bg-white/80 border-blue-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="StickyNote" size={24} />
          Заметки
        </h2>

        <div className="space-y-3 mb-4">
          <Textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Что вы хотите проработать? Какую ситуацию или переживание..."
            rows={3}
          />
          <Button
            onClick={addNote}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            Добавить заметку
          </Button>
        </div>

        {notes.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-lg bg-blue-50/50 border border-blue-100"
              >
                <div className="text-xs text-muted-foreground mb-1">{note.date}</div>
                <p className="text-sm">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
};

export default JournalTab;
