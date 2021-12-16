
import { Breadcrumb } from 'react-bootstrap'

import "./styles.css"

const CATEGORY = "category"
const SUBCATEGORY = "subcategory"

export default function CardBreadCrumb({ category, subcategory }) {

    return (

        <Breadcrumb className="card-breadcrumb">
            <Breadcrumb.Item href="#">{category}</Breadcrumb.Item>
            <Breadcrumb.Item active className='current-breadcrum-location'>{subcategory}</Breadcrumb.Item>
        </Breadcrumb>
    )
}