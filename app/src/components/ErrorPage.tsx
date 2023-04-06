import {ReactElement} from "react";

const ErrorPage = ():ReactElement =>{
    return (
        <div className='error-page' data-testid="not-found-page">
            Извините, страница не найдена.
        </div>
    )
}

export default ErrorPage