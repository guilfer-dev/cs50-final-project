
import { Breadcrumb } from 'react-bootstrap'

import "./styles.css"

export default function CardBreadCrumb({ category, subcategory }) {

    return (
        // render what category and subcategory that card relates to
        <Breadcrumb className="card-breadcrumb">
            <Breadcrumb.Item >{category}</Breadcrumb.Item>
            <Breadcrumb.Item active className='current-breadcrum-location'>{subcategory}</Breadcrumb.Item>
        </Breadcrumb>
    )
}