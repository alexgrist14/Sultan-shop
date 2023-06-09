export type SortBy = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export type GroupedProduct = {
    producer: string;
    count: number;
}

export const filterTypes = [
    'Уход за телом',
    'Уход за руками',
    'Уход за ногами',
    'Уход за лицом',
    'Уход за волосами',
    'Средства для загара',
    'Средства для бритья',
    'Подарочные наборы',
    'Гигиеническая продукция',
    'Гигиена полости рта',
    'Бумажная продукция'
];