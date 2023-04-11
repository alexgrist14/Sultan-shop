export interface IProduct {
    url: string,
    name: string,
    weightType: string,
    size: string,
    barcode: string,
    brand: string,
    description: string,
    producer: string,
    price: string,
    category: string[],
}

export interface CheckoutProduct extends IProduct{
    amount: number
}