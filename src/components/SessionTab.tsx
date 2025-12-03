import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface SessionTabProps {
  isPlaying: boolean;
  sessionDuration: number;
  formatTime: (seconds: number) => string;
  dotPosition: number;
  togglePlayPause: () => void;
  bpm: number;
  setBpm: (value: number) => void;
}

const SessionTab = ({
  isPlaying,
  sessionDuration,
  formatTime,
  dotPosition,
  togglePlayPause,
  bpm,
  setBpm
}: SessionTabProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/80 border-purple-100">
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-2">
            {isPlaying ? '🎯 Сессия активна' : '⏸️ Готовы начать?'}
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {formatTime(sessionDuration)}
          </div>
        </div>

        <div className="relative h-32 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 rounded-lg overflow-hidden">
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-lg transition-all duration-100"
            style={{ left: `calc(${dotPosition}% - 16px)` }}
          >
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50"></div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={togglePlayPause}
            size="lg"
            className={`${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
            } px-8`}
          >
            {isPlaying ? (
              <>
                <Icon name="Pause" size={20} className="mr-2" />
                Стоп
              </>
            ) : (
              <>
                <Icon name="Play" size={20} className="mr-2" />
                Старт
              </>
            )}
          </Button>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Скорость</span>
            <span className="text-sm font-bold text-purple-600">{bpm} BPM</span>
          </div>
          <Slider
            value={[bpm]}
            onValueChange={(value) => setBpm(value[0])}
            min={60}
            max={200}
            step={5}
            className="mb-4"
          />
        </div>
      </div>
    </Card>
  );
};

export default SessionTab;
