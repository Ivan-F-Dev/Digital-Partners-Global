import React, {useState} from 'react';
import './App.scss';
import {useInput} from "./hooks/useInput";
import Input from "./components/other/Input/Input";

function App() {

    const name = useInput('',{minLength:1,maxLength:20,isEmpty:true})
    const email = useInput('',{minLength:5,maxLength:40,isEmpty:true,email:true})
    const phone = useInput('',{minLength:1,maxLength:20,isEmpty:true,phone:true})
    const subject = useInput('',{minLength:1,maxLength:40,isEmpty:true})
    //const message = useInput('',{minLength:1,maxLength:20,isEmpty:true})
    const [message,setMessage] = useState<string>('')

    console.log("render")

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        alert("click")
    }

    return (
        <main className='app__img--container'>
            <div className='app__container'>
                <div className="app__content">
                    <h1 className="app__title">Hello</h1>
                    <div className='form__wrapper'>
                        <div className='form__note'>For business enquiries please use the form below</div>
                        <div className='form__note-under'>*Required</div>
                        <form className='form__form' action="">
                            <Input value={name.value} onChange={name.onChange} onBlur={name.onBlur} title={'Name*'} isDirty={name.isDirty} inputValid={name.inputValid} errors={name.errors}/>
                            <Input value={email.value} onChange={email.onChange} onBlur={email.onBlur} title={'E-mail*'} isDirty={email.isDirty} inputValid={email.inputValid} errors={email.errors}/>
                            <Input value={phone.value} onChange={phone.onChange} onBlur={phone.onBlur} title={'Phone'} isDirty={phone.isDirty} inputValid={phone.inputValid} errors={phone.errors}/>
                            <Input value={subject.value} onChange={subject.onChange} onBlur={subject.onBlur} title={'Subject'} isDirty={subject.isDirty} inputValid={subject.inputValid} errors={subject.errors}/>

                            <div className='input__wrapper'>
                                <label className='input__label' htmlFor="input05">Message*</label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='input__input input__input_message' required id='input05' aria-label='qwerty'/>
                            </div>
                            <div className='form__checkbox-wrapper'>
                                <input id='check' className='form__checkbox' type="checkbox"/>
                                <div className='form__checkbox-text'>
                                    I accept
                                    <a className='form__checkbox-link' href="">Terms and Privacy Policy</a>
                                </div>
                            </div>
                            <div className='form__button-wrapper'>
                                <button  onClick={(e) => onClick(e)} type='submit' className='form__button'>Send</button>
                            </div>

                        </form>


                    </div>
                </div>

            </div>
        </main>
    );
}

export default App;
