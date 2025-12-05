import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HistoryTabProps {
  sessionHistory: Array<{ date: string; duration: number; bpm: number }>;
  formatTime: (seconds: number) => string;
}

const HistoryTab = ({ sessionHistory, formatTime }: HistoryTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/80 border-purple-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="Calendar" size={24} />
          История сессий
        </h2>

        {sessionHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-muted-foreground">
              Пока нет завершённых сессий
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Начните первую сессию, чтобы увидеть статистику
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessionHistory.map((session, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{session.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(session.duration)} • {session.bpm} BPM
                    </div>
                  </div>
                  <div className="text-2xl">✅</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sessionHistory.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium mb-3">Статистика</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50">
                <div className="text-2xl font-bold text-blue-600">{sessionHistory.length}</div>
                <div className="text-sm text-muted-foreground">Всего сессий</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50">
                <div className="text-2xl font-bold text-purple-600">
                  {formatTime(sessionHistory.reduce((acc, s) => acc + s.duration, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Общее время</div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryTab;
