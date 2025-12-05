import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

const HomeTab = ({ setActiveTab }: HomeTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
};

export default HomeTab;
