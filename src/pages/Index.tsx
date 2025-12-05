import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PaymentDialog from '@/components/PaymentDialog';
import JournalDialog from '@/components/JournalDialog';
import BeforeSessionDialog from '@/components/BeforeSessionDialog';
import SessionTab from '@/components/SessionTab';
import JournalTab from '@/components/JournalTab';

type SoundType = 'click' | 'pulse' | 'clap' | 'bell' | 'chime' | 'drum' | 'marimba' | 'wave' | 'beep' | 'tick';

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

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [soundType, setSoundType] = useState<SoundType>('click');
  const [sessionDuration, setSessionDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [dotPosition, setDotPosition] = useState(50);
  const [dotDirection, setDotDirection] = useState(1);
  const [isLeftChannel, setIsLeftChannel] = useState(true);
  const [sessionHistory, setSessionHistory] = useState<Array<{ date: string; duration: number; bpm: number }>>([]);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(true);
  const [cardNumber, setCardNumber] = useState('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showJournalDialog, setShowJournalDialog] = useState(false);
  const [showBeforeDialog, setShowBeforeDialog] = useState(false);
  const [beforeSessionText, setBeforeSessionText] = useState('');
  const [afterSessionText, setAfterSessionText] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [showVisualStimulation, setShowVisualStimulation] = useState(true);
  const [tempBeforeText, setTempBeforeText] = useState('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const playSound = (type: SoundType, isLeft: boolean) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const panner = ctx.createStereoPanner();

    oscillator.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(ctx.destination);

    panner.pan.value = isLeft ? -1 : 1;

    switch (type) {
      case 'click':
        oscillator.frequency.value = 1000;
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
        break;
      case 'pulse':
        oscillator.frequency.value = 440;
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;
      case 'clap':
        oscillator.type = 'square';
        oscillator.frequency.value = 200;
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;
      case 'bell':
        oscillator.frequency.value = 880;
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
      case 'chime':
        oscillator.type = 'sine';
        oscillator.frequency.value = 1320;
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
        break;
      case 'drum':
        oscillator.type = 'triangle';
        oscillator.frequency.value = 80;
        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;
      case 'marimba':
        oscillator.type = 'sine';
        oscillator.frequency.value = 660;
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.25);
        break;
      case 'wave':
        oscillator.type = 'sine';
        oscillator.frequency.value = 220;
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.5);
        break;
      case 'beep':
        oscillator.type = 'square';
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.06);
        break;
      case 'tick':
        oscillator.frequency.value = 1500;
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.03);
        break;
    }
  };

  const startAnimation = (speed: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    const interval = 60000 / speed;
    let currentDirection = 1;
    
    intervalRef.current = setInterval(() => {
      setDotPosition(prev => {
        const newPos = prev + currentDirection * 2;
        if (newPos >= 100) {
          currentDirection = -1;
          setIsLeftChannel(left => {
            playSound(soundType, !left);
            return !left;
          });
          return 100;
        } else if (newPos <= 0) {
          currentDirection = 1;
          setIsLeftChannel(left => {
            playSound(soundType, !left);
            return !left;
          });
          return 0;
        }
        return newPos;
      });
    }, interval / 50);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
      
      if (sessionDuration > 0) {
        const newSession = {
          date: new Date().toLocaleDateString('ru-RU'),
          duration: sessionDuration,
          bpm: bpm
        };
        setSessionHistory(prev => [newSession, ...prev].slice(0, 10));
        setBeforeSessionText(tempBeforeText);
        setShowJournalDialog(true);
      }
      
      setSessionDuration(0);
      setDotPosition(50);
      setDotDirection(1);
    } else {
      startAnimation(bpm);

      sessionTimerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);

      setActiveTab('session');
    }
    setIsPlaying(!isPlaying);
  };

  const handlePayment = () => {
    if (cardNumber.replace(/\s/g, '').length === 16) {
      setHasSubscription(true);
      setShowPaymentDialog(false);
    }
  };

  const saveJournalEntry = () => {
    if (beforeSessionText || afterSessionText) {
      const now = new Date();
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: now.toLocaleDateString('ru-RU'),
        time: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        beforeSession: beforeSessionText,
        sessionDuration: sessionHistory[0]?.duration || 0,
        afterSession: afterSessionText
      };
      setJournalEntries(prev => [entry, ...prev]);
    }
    setBeforeSessionText('');
    setAfterSessionText('');
    setTempBeforeText('');
    setShowJournalDialog(false);
  };

  const openBeforeDialog = () => {
    setShowBeforeDialog(true);
  };

  const saveBeforeSession = (text: string) => {
    setTempBeforeText(text);
    setShowBeforeDialog(false);
  };

  const addNote = () => {
    if (newNoteText.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        content: newNoteText
      };
      setNotes(prev => [note, ...prev]);
      setNewNoteText('');
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAnimation(bpm);
    }
  }, [bpm]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!hasSubscription) {
    return (
      <PaymentDialog
        showPaymentDialog={showPaymentDialog}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        handlePayment={handlePayment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      <BeforeSessionDialog
        showBeforeDialog={showBeforeDialog}
        setShowBeforeDialog={setShowBeforeDialog}
        tempBeforeText={tempBeforeText}
        saveBeforeSession={saveBeforeSession}
      />

      <JournalDialog
        showJournalDialog={showJournalDialog}
        setShowJournalDialog={setShowJournalDialog}
        beforeSessionText={beforeSessionText}
        setBeforeSessionText={setBeforeSessionText}
        afterSessionText={afterSessionText}
        setAfterSessionText={setAfterSessionText}
        sessionDuration={sessionHistory[0]?.duration || 0}
        formatTime={formatTime}
        saveJournalEntry={saveJournalEntry}
      />

      <div className="container max-w-md mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="home" className="flex items-center gap-1">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="session" className="flex items-center gap-1">
              <Icon name="Activity" size={16} />
              <span className="hidden sm:inline">Сессия</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-1">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Дневник</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Icon name="History" size={16} />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EMDR Терапия
              </h1>
              <p className="text-muted-foreground">Самостоятельная практика движения глаз</p>
            </div>

            <Card className="p-8 backdrop-blur-sm bg-white/80 border-purple-100">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧘‍♀️</div>
                  <h2 className="text-2xl font-semibold mb-2">Добро пожаловать</h2>
                  <p className="text-sm text-muted-foreground">
                    EMDR (Десенсибилизация и переработка движением глаз) — это метод психотерапии для работы с травматическими воспоминаниями
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon name="Check" size={20} className="text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Безопасно</h3>
                      <p className="text-sm text-muted-foreground">Практика в комфортном темпе</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon name="Clock" size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Контроль времени</h3>
                      <p className="text-sm text-muted-foreground">Встроенный таймер сессий</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon name="BarChart" size={20} className="text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">История</h3>
                      <p className="text-sm text-muted-foreground">Отслеживание прогресса</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setActiveTab('session')} 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  size="lg"
                >
                  Начать сессию
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="session" className="space-y-6 animate-fade-in">
            <SessionTab
              isPlaying={isPlaying}
              sessionDuration={sessionDuration}
              formatTime={formatTime}
              dotPosition={dotPosition}
              togglePlayPause={togglePlayPause}
              bpm={bpm}
              setBpm={setBpm}
              showVisualStimulation={showVisualStimulation}
              setShowVisualStimulation={setShowVisualStimulation}
              openBeforeDialog={openBeforeDialog}
              hasBeforeText={!!tempBeforeText}
            />
          </TabsContent>

          <TabsContent value="journal" className="space-y-4 animate-fade-in">
            <JournalTab
              journalEntries={journalEntries}
              notes={notes}
              newNoteText={newNoteText}
              setNewNoteText={setNewNoteText}
              addNote={addNote}
              formatTime={formatTime}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 animate-fade-in">
            <Card className="p-6 backdrop-blur-sm bg-white/80 border-purple-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Volume2" size={24} />
                Звуковая стимуляция
              </h2>
              
              <div className="space-y-3">
                {[
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
                ].map((sound) => (
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
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
