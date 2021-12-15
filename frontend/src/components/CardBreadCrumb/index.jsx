
import { Breadcrumb } from 'react-bootstrap'

import "./styles.css"

const CATEGORY = "category"
const SUBCATEGORY = "subcategory"

export default function CardBreadCrumb() {

    return (

        <Breadcrumb className="card-breadcrumb">
            <Breadcrumb.Item href="#">{CATEGORY}</Breadcrumb.Item>
            <Breadcrumb.Item active className='current-breadcrum-location'>{SUBCATEGORY}</Breadcrumb.Item>
        </Breadcrumb>
    )
}