import {ChangeEvent, ReactElement, useEffect,useState} from "react";
import productsData from "../../data/products.json";
import polygonIcon from "../../assets/images/polygon.svg";
import IProduct from "../../types/IProduct";

type GroupedProduct = {
    producer: string;
    count: number;
}

type ProducerFilterProps = {
    searchValue: string,
    updateProducersFilterList: (producers: string[]) => void
}

function getProductsFromLocalStorage():IProduct[]{
    let products;
    if (!localStorage.getItem('products')) {
       products = productsData.products;
    } else {
        const storedProducts = localStorage.getItem('products') || '[]';
        products = JSON.parse(storedProducts) as IProduct[];
    }

    return products;
}

const ProducersFilter = ({searchValue, updateProducersFilterList}: ProducerFilterProps): ReactElement => {
    const [showAll, setShowAll] = useState(false);
    const [selectedProducers, setSelectedProducers] = useState<string[]>([]);
    const [groupedData, setGroupedData] = useState<GroupedProduct[]>([]);
    const products = getProductsFromLocalStorage();

    const groupByProducer = (): GroupedProduct[] => {
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
        setShowAll(true);
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
                        <input data-testid={`prod-checkbox-${i}`} type="checkbox" checked={selectedProducers.includes(producer.producer)}
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