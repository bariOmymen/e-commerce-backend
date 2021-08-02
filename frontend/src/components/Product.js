import React from 'react'
import classNames from 'classnames'

import { Card, CardBody, Title, Price, Image, Container} from './styles/Product'
export function Product( {children, classes, ...props}) {
   
    return (
      <Container  className={classNames('product-card', classes)} {...props}>
          {children}
      </Container>
    )
}

 Product.Card = function ProductCard ({children, classes, ...props}) {
    return (
        <Card className={classNames('product-card', classes)} {...props}>
            {children}
        </Card>
    )

}

Product.CardBody = function ProductBody ({children, classes, ...props}) {
    return (
        <CardBody className={classNames('product-body', classes)} {...props}>
            {children}
        </CardBody>
    )
}
Product.Title = function ProductTitle ({children, classes, ...props}) {
    return (
        <Title className={classNames('product-title', classes)} {...props}>
            {children}
        </Title>
    )
}
Product.Price = function ProductPrice ({children, classes, ...props}) {
    return (
        <Price className={classNames('product-price', classes)} {...props}>
            {children}
        </Price>
    )
}
Product.Image = function ProductImage ({children, classes, src, alt, ...props}) {
    return (
        <Image className={classNames('product-image', classes)} {...props}
        src={src}
        alt={alt}
        {...props}
             />
        
    )
}



