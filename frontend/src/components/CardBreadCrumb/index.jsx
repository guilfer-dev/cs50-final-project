
import { Breadcrumb } from 'react-bootstrap'

import "./styles.css"

export default function CardBreadCrumb () {

    return (

        <Breadcrumb className="card-breadcrumb">
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
    )
}