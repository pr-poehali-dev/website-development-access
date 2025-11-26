export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  specs: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
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
