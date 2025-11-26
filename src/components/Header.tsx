import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { CartItem } from '@/types/product';

interface HeaderProps {
  cart: CartItem[];
  activeTab: 'catalog' | 'laser';
  onTabChange: (tab: 'catalog' | 'laser') => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onOrderSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  totalPrice: number;
}

const Header = ({ cart, activeTab, onTabChange, onUpdateQuantity, onOrderSubmit, totalPrice }: HeaderProps) => {
  return (
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
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
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
                    
                    <form onSubmit={onOrderSubmit} className="space-y-4 pt-4">
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
            onClick={() => onTabChange('catalog')}
          >
            <Icon name="Package" size={18} className="mr-2" />
            Каталог
          </Button>
          <Button 
            variant={activeTab === 'laser' ? 'default' : 'outline'}
            onClick={() => onTabChange('laser')}
          >
            <Icon name="Sparkles" size={18} className="mr-2" />
            Лазерная резка
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
