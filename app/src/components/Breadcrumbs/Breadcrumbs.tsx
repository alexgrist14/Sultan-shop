import {Fragment, ReactElement} from "react";
import {Link} from "react-router-dom";

interface BreadcrumbsProps {
    items: BreadCrumbItem[]
}

interface BreadCrumbItem {
    path: string,
    title: string,
}

const Breadcrumbs = ({items}: BreadcrumbsProps): ReactElement => {
    return (
        <ul className='breadcrumbs'>
            <li><Link className='link' to="/">Главная</Link></li>
            <div className='dashed-border'></div>
            {
                items.map((item, i) => (
                    <Fragment key={i}>
                        <li>
                            <Link className={i + 1 === items.length ? 'last-link' : 'link'}
                                  to={item.path}>{item.title}</Link>

                        </li>
                        {
                            items.length - 1 === i ? '' : <div key={i} className='dashed-border'></div>
                        }
                    </Fragment>
                ))
            }
        </ul>
    )
}

export default Breadcrumbs