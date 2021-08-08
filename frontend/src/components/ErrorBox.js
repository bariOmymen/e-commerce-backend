import React from 'react'
import classNames from 'classnames'
import { ErrorWrapper, ErrorText } from './styles/ErrorText'

export default function ErrorBox({children, classes, ...props}) {
    return (
        <ErrorWrapper className={classNames(classes, 'error-wrapper')} {...props}>
            {children}
        </ErrorWrapper>
    )
};


ErrorBox.Text = function Text({children, classes, ...props}) {
    return(
        <ErrorText className={classNames(classes, 'error-text')}  {...props}>
            {children}
        </ErrorText>
    )
};


