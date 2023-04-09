import {ChangeEvent, Dispatch, ReactElement, SetStateAction} from "react";

interface CatalogParametersPriceProps {
    minPrice: string,
    maxPrice: string,
    setMinPrice: Dispatch<SetStateAction<string>>,
    setMaxPrice: Dispatch<SetStateAction<string>>,
}

const parser = (inputValue: string): string => {
    const outputString: string = inputValue.replace(/\D/g, '');
    if (outputString === '') {
        return '0';
    } else if (outputString === '' || (outputString.charAt(0) !== '0' && parseInt(outputString) > 0)) {
        return outputString;
    }
    return '';
}

const CatalogParametersPrice = ({
                                    minPrice,
                                    maxPrice,
                                    setMaxPrice,
                                    setMinPrice
                                }: CatalogParametersPriceProps): ReactElement => {
    const handleInputMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMinPrice(parser(event.target.value));
    }

    const handleInputMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMaxPrice(parser(event.target.value));
    }

    return (
        <div className='catalog-filter__price'>
            <h4>Цена<span>₸</span></h4>
            <div className='catalog-filter__price-range'>
                <input className='min' value={minPrice} onChange={handleInputMinChange}/>
                -
                <input data-testid='maxPrice'
                       className='max'
                       value={maxPrice}
                       onChange={handleInputMaxChange}/>
            </div>
        </div>
    )
}

export default CatalogParametersPrice