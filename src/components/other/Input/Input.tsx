import React, { FC } from "react";
import './Input.scss'

interface InputProps {
    title?:string
    value:string
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
    type?:string
    width?: string
    errors?: Array<string>
    isDirty?: boolean
    inputValid?: boolean
}

const Input:FC<InputProps> = React.memo(({title,value, onChange,onBlur, type, width,errors,inputValid,isDirty}) => {

    return (
        <div className='input__wrapper'>
            {isDirty &&!inputValid && <div className='input__hint'>{errors && errors.join(', ')}</div>}
            <label className='input__label' htmlFor="input04">{title}</label>
            <input value={value} onChange={onChange} onBlur={onBlur} className='input__input' id='input04' aria-label='qwerty' type="text"/>
        </div>
    )
})

export default Input