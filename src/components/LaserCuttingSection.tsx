import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface LaserParams {
  material: string;
  thickness: number;
  area: number;
  complexity: string;
}

interface LaserCuttingSectionProps {
  laserParams: LaserParams;
  onLaserParamsChange: (params: LaserParams) => void;
  onLaserOrder: (e: React.FormEvent<HTMLFormElement>) => void;
  calculatePrice: () => number;
}

const LaserCuttingSection = ({ 
  laserParams, 
  onLaserParamsChange, 
  onLaserOrder, 
  calculatePrice 
}: LaserCuttingSectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Лазерная резка металла</h2>
            <p className="text-muted-foreground text-lg">
              Высокоточная резка металла на современном оборудовании
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Icon name="Zap" size={32} className="text-accent mb-2" />
                <CardTitle>Точность резки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Погрешность не более 0,1 мм</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Layers" size={32} className="text-accent mb-2" />
                <CardTitle>Толщина материала</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">От 0,5 до 20 мм</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Maximize" size={32} className="text-accent mb-2" />
                <CardTitle>Размер листа</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">До 3000×1500 мм</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Clock" size={32} className="text-accent mb-2" />
                <CardTitle>Сроки изготовления</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">От 1 рабочего дня</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Калькулятор стоимости</CardTitle>
              <CardDescription>Рассчитайте примерную стоимость резки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Материал</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={laserParams.material === 'steel' ? 'default' : 'outline'}
                    onClick={() => onLaserParamsChange({...laserParams, material: 'steel'})}
                    className="flex-1"
                  >
                    Сталь
                  </Button>
                  <Button
                    variant={laserParams.material === 'stainless' ? 'default' : 'outline'}
                    onClick={() => onLaserParamsChange({...laserParams, material: 'stainless'})}
                    className="flex-1"
                  >
                    Нержавейка
                  </Button>
                  <Button
                    variant={laserParams.material === 'aluminum' ? 'default' : 'outline'}
                    onClick={() => onLaserParamsChange({...laserParams, material: 'aluminum'})}
                    className="flex-1"
                  >
                    Алюминий
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="thickness">Толщина металла (мм)</Label>
                <Input
                  id="thickness"
                  type="number"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={laserParams.thickness}
                  onChange={(e) => onLaserParamsChange({...laserParams, thickness: parseFloat(e.target.value)})}
                />
              </div>

              <div>
                <Label htmlFor="area">Площадь реза (м²)</Label>
                <Input
                  id="area"
                  type="number"
                  min="0"
                  step="0.1"
                  value={laserParams.area}
                  onChange={(e) => onLaserParamsChange({...laserParams, area: parseFloat(e.target.value)})}
                />
              </div>

              <div>
                <Label>Сложность контура</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={laserParams.complexity === 'simple' ? 'default' : 'outline'}
                    onClick={() => onLaserParamsChange({...laserParams, complexity: 'simple'})}
                    className="flex-1"
                  >
                    Простая
                  </Button>
                  <Button
                    variant={laserParams.complexity === 'medium' ? 'default' : 'outline'}
                    onClick={() => onLaserParamsChange({...laserParams, complexity: 'medium'})}
                    className="flex-1"
                  >
                    Средняя
                  </Button>
                  <Button
                    variant={laserParams.complexity === 'complex' ? 'default' : 'outline'}
                    onClick={() => onLaserParamsChange({...laserParams, complexity: 'complex'})}
                    className="flex-1"
                  >
                    Сложная
                  </Button>
                </div>
              </div>

              {laserParams.area > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Примерная стоимость:</span>
                    <span className="text-2xl font-bold text-primary">
                      {calculatePrice().toLocaleString()} ₽
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Оставить заявку</CardTitle>
              <CardDescription>Отправьте чертеж и мы рассчитаем точную стоимость</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onLaserOrder} className="space-y-4">
                <div>
                  <Label htmlFor="laser-name">Имя</Label>
                  <Input id="laser-name" required placeholder="Иван Иванов" />
                </div>
                <div>
                  <Label htmlFor="laser-phone">Телефон</Label>
                  <Input id="laser-phone" required type="tel" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <Label htmlFor="laser-email">Email</Label>
                  <Input id="laser-email" required type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="laser-file">Чертеж (DXF, DWG, PDF)</Label>
                  <Input id="laser-file" type="file" accept=".dxf,.dwg,.pdf" />
                </div>
                <div>
                  <Label htmlFor="laser-comment">Комментарий</Label>
                  <Textarea id="laser-comment" placeholder="Укажите количество деталей, сроки и другие требования" />
                </div>
                <Button type="submit" className="w-full">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LaserCuttingSection;
