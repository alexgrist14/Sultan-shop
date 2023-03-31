import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import productsData from "../data/products.json";
import polygonIcon from "../assets/images/polygon.svg";

type GroupedProduct = {
    producer: string;
    count: number;
}

type ProducerFilterProps = {
    searchValue: string,
    updateProducersFilterList: (producers: string[]) => void
}

const ProducersFilter = ({searchValue, updateProducersFilterList}: ProducerFilterProps): ReactElement => {
    const [showAll, setShowAll] = useState(false);
    const [selectedProducers, setSelectedProducers] = useState<string[]>([]);
    const [groupedData, setGroupedData] = useState<GroupedProduct[]>([]);

    let products: any;
    if (!localStorage.getItem('products')) {
        products = productsData.products;
    } else {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        }
    }

    const groupByProducer = (): GroupedProduct[] => {
        const groupedData: { [key: string]: number } = {};
        products.forEach((p: any) => {
            const producer = p.producer;
            if (producer in groupedData) {
                groupedData[producer]++;
            } else {
                groupedData[producer] = 1;
            }
        });
        const groupedArray: GroupedProduct[] = Object.entries(groupedData).map(
            ([producer, count]) => ({
                producer,
                count,
            })
        );
        return groupedArray;
    };
    useEffect(() => {
        const groupData = groupByProducer();
        if (searchValue !== '') {
            setGroupedData(groupData.filter((data) => data.producer.toLowerCase().includes(searchValue.toLowerCase())))
        } else {
            setGroupedData(groupData);
        }

    }, [searchValue])

    useEffect(() => {
        updateProducersFilterList(selectedProducers);
    }, [selectedProducers, updateProducersFilterList])

    const toggleShowAll = (): void => {
        setShowAll(!showAll);
    }

    const toggleShowLess = (): void => {
        setShowAll(false);
    }

    const addSelectedProducer = (event: ChangeEvent<HTMLInputElement>, producer: string): void => {
        if (event.target.checked) {
            setSelectedProducers(prevState => [...prevState, producer])
        } else {
            setSelectedProducers(prevState => prevState.filter(prod => prod !== producer));
        }
    }
    const producersToShow = showAll ? groupedData : groupedData.slice(0, 4);

    return (
        <>
            {
                producersToShow.map((producer: GroupedProduct, i: number) => (
                    <div key={i}>
                        <input type="checkbox" checked={selectedProducers.includes(producer.producer)}
                               onChange={(e) => addSelectedProducer(e, producer.producer)}/>
                        <span className='producer'>{producer.producer}</span> <span
                        className='count'>({producer.count})</span>
                    </div>

                ))
            }
            {!showAll ? (
                <div onClick={toggleShowAll} className='show-all'><span>Показать все</span>
                    <div><img src={polygonIcon} alt="polygon_icon"/></div>
                </div>
            ) : (
                <div onClick={toggleShowLess} className='show-all opened'><span>Скрыть</span>
                    <div><img src={polygonIcon} alt="polygon_icon"/></div>
                </div>
            )
            }
        </>
    )
}

export default ProducersFilter