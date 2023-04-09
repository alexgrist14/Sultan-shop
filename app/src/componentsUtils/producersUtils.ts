import IProduct from "../types/IProduct";

export type GroupedProduct = {
    producer: string;
    count: number;
}

export const groupByProducer = (products:IProduct[]): GroupedProduct[] => {
    const groupedData: { [key: string]: number } = {};
    products.forEach((p) => {
        const producer = p.producer;
        if (producer in groupedData) {
            groupedData[producer]++;
        } else {
            groupedData[producer] = 1;
        }
    });
    const groupedArray = Object.entries(groupedData).map(
        ([producer, count]) => ({
            producer,
            count,
        })
    );
    return groupedArray;
};
