import React from 'react'
import classNames from 'classnames'
import { Badge } from './styles/Badge'

function CartBadge({classes, children, show, ...props}) {
    return (

        <Badge className={classNames(classes, 'badge')} show={show} {...props}>
            {children}
        </Badge>
    )
}

export default CartBadge
