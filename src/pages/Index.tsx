import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Product, CartItem, products } from '@/types/product';
import Header from '@/components/Header';
import CatalogSection from '@/components/CatalogSection';
import LaserCuttingSection from '@/components/LaserCuttingSection';

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
      <Header 
        cart={cart}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onUpdateQuantity={updateQuantity}
        onOrderSubmit={handleOrderSubmit}
        totalPrice={totalPrice}
      />

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
        <CatalogSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={setSelectedCategory}
          onAddToCart={addToCart}
        />
      )}

      {activeTab === 'laser' && (
        <LaserCuttingSection
          laserParams={laserParams}
          onLaserParamsChange={setLaserParams}
          onLaserOrder={handleLaserOrder}
          calculatePrice={calculateLaserPrice}
        />
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
