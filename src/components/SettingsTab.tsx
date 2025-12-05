import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type SoundType = 'click' | 'pulse' | 'clap' | 'bell' | 'chime' | 'drum' | 'marimba' | 'wave' | 'beep' | 'tick';

interface SettingsTabProps {
  soundType: SoundType;
  setSoundType: (type: SoundType) => void;
  playSound: (type: SoundType, isLeft: boolean) => void;
}

const SettingsTab = ({ soundType, setSoundType, playSound }: SettingsTabProps) => {
  const soundOptions = [
    { type: 'click' as SoundType, emoji: '🔔', name: 'Клик', desc: 'Короткий щелчок' },
    { type: 'pulse' as SoundType, emoji: '🎵', name: 'Пульс', desc: 'Мягкий тон' },
    { type: 'clap' as SoundType, emoji: '👏', name: 'Хлопок', desc: 'Резкий звук' },
    { type: 'bell' as SoundType, emoji: '🔔', name: 'Колокольчик', desc: 'Звонкий тон' },
    { type: 'chime' as SoundType, emoji: '🎐', name: 'Перезвон', desc: 'Высокий звон' },
    { type: 'drum' as SoundType, emoji: '🥁', name: 'Барабан', desc: 'Глубокий удар' },
    { type: 'marimba' as SoundType, emoji: '🎶', name: 'Маримба', desc: 'Мелодичный звук' },
    { type: 'wave' as SoundType, emoji: '🌊', name: 'Волна', desc: 'Мягкая волна' },
    { type: 'beep' as SoundType, emoji: '📟', name: 'Бип', desc: 'Электронный сигнал' },
    { type: 'tick' as SoundType, emoji: '⏱️', name: 'Тик', desc: 'Короткий тик' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/80 border-purple-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="Volume2" size={24} />
          Звуковая стимуляция
        </h2>
        
        <div className="space-y-3">
          {soundOptions.map((sound) => (
            <button
              key={sound.type}
              onClick={() => {
                setSoundType(sound.type);
                playSound(sound.type, true);
              }}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                soundType === sound.type
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{sound.emoji}</div>
                  <div className="text-left">
                    <div className="font-medium">{sound.name}</div>
                    <div className="text-sm text-muted-foreground">{sound.desc}</div>
                  </div>
                </div>
                {soundType === sound.type && <Icon name="Check" size={20} className="text-purple-500" />}
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-sm bg-white/80 border-blue-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="Info" size={24} />
          О методе EMDR
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Метод разработан Франсин Шапиро в 1987 году для работы с посттравматическим стрессом.
          </p>
          <p>
            Билатеральная стимуляция (движение глаз, звуки) помогает переработать травматические воспоминания.
          </p>
          <p className="text-yellow-700 bg-yellow-50 p-3 rounded-lg">
            ⚠️ Это приложение не заменяет работу с квалифицированным терапевтом при серьёзных травмах.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SettingsTab;
