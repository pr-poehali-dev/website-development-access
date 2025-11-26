import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  specs: string[];
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Труба стальная 57x3',
    category: 'Трубы',
    price: 450,
    unit: 'м',
    description: 'Водогазопроводная труба из стали марки Ст3',
    specs: ['Диаметр: 57мм', 'Толщина стенки: 3мм', 'ГОСТ 3262-75']
  },
  {
    id: 2,
    name: 'Лист стальной 3мм',
    category: 'Листовой прокат',
    price: 85000,
    unit: 'тонна',
    description: 'Горячекатаный лист из стали 09Г2С',
    specs: ['Толщина: 3мм', 'Размер: 1500x6000мм', 'ГОСТ 19903-74']
  },
  {
    id: 3,
    name: 'Арматура А500С 12мм',
    category: 'Арматура',
    price: 55000,
    unit: 'тонна',
    description: 'Строительная арматура периодического профиля',
    specs: ['Диаметр: 12мм', 'Класс А500С', 'ГОСТ 34028-2016']
  },
  {
    id: 4,
    name: 'Уголок 50x50x5',
    category: 'Уголки',
    price: 58000,
    unit: 'тонна',
    description: 'Равнополочный стальной уголок',
    specs: ['Ширина полки: 50мм', 'Толщина: 5мм', 'ГОСТ 8509-93']
  },
  {
    id: 5,
    name: 'Балка двутавровая №20',
    category: 'Балки',
    price: 62000,
    unit: 'тонна',
    description: 'Двутавровая балка горячекатаная',
    specs: ['Номер: 20', 'Высота: 200мм', 'ГОСТ 8239-89']
  },
  {
    id: 6,
    name: 'Швеллер 10П',
    category: 'Швеллеры',
    price: 59000,
    unit: 'тонна',
    description: 'Швеллер гнутый равнополочный',
    specs: ['Номер: 10П', 'Высота: 100мм', 'ГОСТ 8240-97']
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [activeTab, setActiveTab] = useState<'catalog' | 'laser'>('catalog');
  const [laserParams, setLaserParams] = useState({
    material: 'steel',
    thickness: 3,
    area: 0,
    complexity: 'simple'
  });
  const { toast } = useToast();

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast({
      title: 'Добавлено в корзину',
      description: product.name,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Заказ отправлен',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setCart([]);
  };

  const calculateLaserPrice = () => {
    const basePrices: Record<string, number> = {
      steel: 150,
      stainless: 250,
      aluminum: 200
    };
    const complexityMultiplier = laserParams.complexity === 'simple' ? 1 : laserParams.complexity === 'medium' ? 1.5 : 2;
    const thicknessMultiplier = 1 + (laserParams.thickness / 10);
    return Math.round(basePrices[laserParams.material] * laserParams.area * complexityMultiplier * thicknessMultiplier);
  };

  const handleLaserOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Заявка на лазерную резку отправлена',
      description: `Стоимость: ${calculateLaserPrice().toLocaleString()} ₽`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Factory" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">МеталлПром</h1>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Корзина пуста' : `Товаров: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription>{item.price.toLocaleString()} ₽/{item.unit}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                        <span className="ml-auto font-bold">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {cart.length > 0 && (
                  <>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString()} ₽</span>
                      </div>
                    </div>
                    
                    <form onSubmit={handleOrderSubmit} className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" required placeholder="Иван Иванов" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" required type="tel" placeholder="+7 (999) 123-45-67" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" required type="email" placeholder="email@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="comment">Комментарий</Label>
                        <Textarea id="comment" placeholder="Дополнительная информация" />
                      </div>
                      <Button type="submit" className="w-full">
                        Оформить заказ
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={activeTab === 'catalog' ? 'default' : 'outline'}
              onClick={() => setActiveTab('catalog')}
            >
              <Icon name="Package" size={18} className="mr-2" />
              Каталог
            </Button>
            <Button 
              variant={activeTab === 'laser' ? 'default' : 'outline'}
              onClick={() => setActiveTab('laser')}
            >
              <Icon name="Sparkles" size={18} className="mr-2" />
              Лазерная резка
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Металлопрокат оптом и в розницу
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Прямые поставки с заводов. Полный пакет документов. Доставка по России.
          </p>
        </div>
      </section>

      {activeTab === 'catalog' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Icon name="Package" className="text-muted-foreground" size={20} />
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 mb-4">
                      {product.specs.map((spec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="CheckCircle2" size={14} className="text-accent" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <div className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                      <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'laser' && (
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
                        onClick={() => setLaserParams({...laserParams, material: 'steel'})}
                        className="flex-1"
                      >
                        Сталь
                      </Button>
                      <Button
                        variant={laserParams.material === 'stainless' ? 'default' : 'outline'}
                        onClick={() => setLaserParams({...laserParams, material: 'stainless'})}
                        className="flex-1"
                      >
                        Нержавейка
                      </Button>
                      <Button
                        variant={laserParams.material === 'aluminum' ? 'default' : 'outline'}
                        onClick={() => setLaserParams({...laserParams, material: 'aluminum'})}
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
                      onChange={(e) => setLaserParams({...laserParams, thickness: parseFloat(e.target.value)})}
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
                      onChange={(e) => setLaserParams({...laserParams, area: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div>
                    <Label>Сложность контура</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={laserParams.complexity === 'simple' ? 'default' : 'outline'}
                        onClick={() => setLaserParams({...laserParams, complexity: 'simple'})}
                        className="flex-1"
                      >
                        Простая
                      </Button>
                      <Button
                        variant={laserParams.complexity === 'medium' ? 'default' : 'outline'}
                        onClick={() => setLaserParams({...laserParams, complexity: 'medium'})}
                        className="flex-1"
                      >
                        Средняя
                      </Button>
                      <Button
                        variant={laserParams.complexity === 'complex' ? 'default' : 'outline'}
                        onClick={() => setLaserParams({...laserParams, complexity: 'complex'})}
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
                          {calculateLaserPrice().toLocaleString()} ₽
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
                  <form onSubmit={handleLaserOrder} className="space-y-4">
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
      )}

      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">Наши преимущества</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Icon name="Truck" size={32} className="text-accent mb-2" />
                <CardTitle>Быстрая доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Собственный автопарк и работа с транспортными компаниями
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Shield" size={32} className="text-accent mb-2" />
                <CardTitle>Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Сертификаты соответствия на всю продукцию
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Calculator" size={32} className="text-accent mb-2" />
                <CardTitle>Выгодные цены</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Прямые поставки с металлургических заводов
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Factory" size={24} />
            <span className="text-xl font-bold">МеталлПром</span>
          </div>
          <p className="text-sm opacity-80">
            © 2024 МеталлПром. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;