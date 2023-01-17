import React, {useCallback, useEffect, useState} from "react";

interface IUseInputReturn {
    value:string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void
    isDirty: boolean
    isEmpty?: boolean
    minLengthError?: boolean
    maxLengthError?: boolean
    emailError?: boolean
    phoneError?: boolean
    inputValid: boolean
    errors:Array<string>
}

interface IValidations {
    isEmpty?: boolean
    minLength?: number
    maxLength?: number
    email?: boolean
    phone?: boolean
}
interface IUseValidationReturn {
    isEmpty: boolean
    minLengthError?: boolean
    maxLengthError?: boolean
    emailError?: boolean
    phoneError?: boolean
    inputValid: boolean
    errors:Array<string>
}

export const useInput = (initialValue:string,validations:IValidations):IUseInputReturn => {
    const [value,setValue] = useState<string>(initialValue)
    const [isDirty,setDirty] = useState<boolean>(false)
    const valid = useValidation(value,validations)

    const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(e.target.value)
    },[])
    const onBlur = useCallback((): void => {
        setDirty(true)
    },[])

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

const useValidation = (value:string, validations:IValidations):IUseValidationReturn => {

    const [isEmpty,setEmpty] = useState<boolean>(true)
    const [minLengthError,setMinLengthError] = useState<boolean>(typeof validations['minLength'] === "number")
    const [maxLengthError,setMaxLengthError] = useState<boolean>(typeof validations['maxLength'] === "number")
    const [emailError,setEmailError] = useState<boolean>(true)
    const [phoneError,setPhoneError] = useState<boolean>(true)

    const [errors, setErrors] = useState<Array<string>>([])
    const [inputValid, setInputValid] = useState<boolean>(false)

    useEffect(() => {
        for (let validation in validations) {
            switch (validation) {

                case 'minLength':
                    if (typeof validations['minLength'] === "number") {
                        value.length < validations['minLength'] ? setMinLengthError(true) : setMinLengthError(false)
                    }
                    break

                case 'maxLength':
                    if (typeof validations['maxLength'] === "number") {
                        value.length > validations['maxLength'] ? setMaxLengthError(true) : setMaxLengthError(false)
                    }
                    break
                case 'email':
                    const re = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');///^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                        re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break

                case 'phone':
                    const reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
                    reg.test(String(value).toLowerCase()) ? setPhoneError(false) : setPhoneError(true)
                    break

                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
            }

        }
    },[value])

    useEffect(() => {
        if (isEmpty||minLengthError||maxLengthError||emailError||phoneError) {
            setInputValid(false)

            if (isEmpty && !errors.some(value => value === `Поле не заполнено`)) {
                setErrors(prevState => [...prevState, `Поле не заполнено`])
            } else if (!isEmpty && errors.some(value => value === `Поле не заполнено`)) {
                setErrors(prevState => prevState.filter(value => value!== `Поле не заполнено`))
            }

            if (validations['minLength'] && minLengthError && !errors.some(value => value === `должно быть минимум ${validations['minLength']} символов`)) {
                setErrors(prevState => [...prevState, `должно быть минимум ${validations['minLength']} символов`])
            } else if (!minLengthError && errors.some(value => value === `должно быть минимум ${validations['minLength']} символов`)) {
                setErrors(prevState => prevState.filter(value => value!== `должно быть минимум ${validations['minLength']} символов`))
            }

            if (validations['maxLength'] && maxLengthError && !errors.some(value => value === `должно быть максимум ${validations['maxLength']} символов`)) {
                setErrors(prevState => [...prevState, `должно быть максимум ${validations['maxLength']} символов`])
            } else if (!maxLengthError && errors.some(value => value === `должно быть максимум ${validations['maxLength']} символов`)) {
                setErrors(prevState => prevState.filter(value => value!== `должно быть максимум ${validations['maxLength']} символов`))
            }

            if (validations['email'] && emailError && !errors.some(value => value === `некорректный email`)) {
                setErrors(prevState => [...prevState, `некорректный email`])
            } else if (!emailError && errors.some(value => value === `некорректный email`)) {
                setErrors(prevState => prevState.filter(value => value!== `некорректный email`))
            }

            if (validations['phone'] && phoneError && !errors.some(value => value === `некорректный номер`)) {
                setErrors(prevState => [...prevState, `некорректный номер`])
            } else if (!phoneError && errors.some(value => value === `некорректный номер`)) {
                setErrors(prevState => prevState.filter(value => value!== `некорректный номер`))
            }
        } else {
            setErrors([])
            setInputValid(true)
        }
    },[isEmpty, minLengthError,maxLengthError,emailError,phoneError])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        phoneError,
        inputValid,
        errors
    }
}
