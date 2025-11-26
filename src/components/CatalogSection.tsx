import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from '@/types/product';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

const CatalogSection = ({ 
  products, 
  selectedCategory, 
  categories, 
  onCategoryChange, 
  onAddToCart 
}: CatalogSectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
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
                  onClick={() => onAddToCart(product)}
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
  );
};

export default CatalogSection;
