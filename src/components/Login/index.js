import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import logo from '../../images/ubereat.png'
import { Link, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

import SecuredRoute from '../PrivateRoute'

const Login = () => {
    // Gestion de la redirection
    const history = useHistory();

    // Utilisation du firebase depuis notre context
    const firebase = useContext(FirebaseContext)
    console.log(firebase)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [button, setButton] = useState(false)
    const [erreur, setErreur] = useState('')

    // Controle de saisi
    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setButton(true)
        } else if (button) {
            setButton(false)
        }
    }, [password, email, button])

    const handleSubmit = e => {
        e.preventDefault();

        // Appel de la fonction login pour connecter l'utilisateur
        firebase.login(email, password)
            .then(res => {
                console.log(res)
                SecuredRoute.authentication.onAuthentication();
                history.push('/accueil')
            })
            .catch(err => {
                setErreur(err)
                // Nous allons vider les variables de connexion
                setEmail('')
                setPassword('')
            })
    }

    return (
        <First_div>
            <div>
                <Second_div>
                    <Img src={logo} />
                    {erreur !== '' ? <Span>erreur</Span> : ''}
                    <form onSubmit={ handleSubmit }>
                        <p>
                            
                            <Input onChange={e => setEmail(e.target.value)} value={email} type="email" required autoComplete="on" />
                        </p>
                        <p>
                            <Input onChange={e => setPassword(e.target.value)} value={password} type="password" required autoComplete="off" />
                            
                        </p>

                        <Third_div className="">
                            {button ? <Input_1 type="submit" value="SEND" /> : <Input_1 disabled type="submit" value="SEND" />}
                            <Quart_div></Quart_div>
                        </Third_div>
                    </form>
                    <Dinq_div className="teste">
                        <NavLink className="" to="/signup">Nouveau ? Inscrivez-vous maintenent</NavLink>
                    </Dinq_div>
                </Second_div>
            </div> 
        </First_div>
    )
}

const Span = styled.span`
    margin-left: -78%;
    color: red;
`

const NavLink = styled(Link)`
    color: var(--white-color);
    text-decoration: none;
    font-size: 16px;
    color: #fff;

    &:hover {
        color: var(--red-color);
    }
`

const Dinq_div = styled.div`
    height: 50px;
    margin-top: 35px;
    padding-top: 15px;
    border-top: 1px dashed var(--light-grey-color);
`

const Img = styled.img`
    width: 55%;
    margin-left: 23%;
    margin-top: -9%;
`

const First_div = styled.div`
    background-color: #152228;
`

const Third_div = styled.div`
    &:hover {
        width: 100%;
        background-color: white;
    }
`

const Quart_div = styled.div`
    width: 0px;
    height: 74px;
    background-color: #fbfbfb;
    -webkit-transition: .3s ease;
    -moz-transition: .3s ease;
    -o-transition: .3s ease;
    -ms-transition: .3s ease;
    transition: .3s ease;
`

const Input_1 = styled.input`
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    float: left;
    width: 100%;
    border: #fbfbfb solid 4px;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    font-size: 24px;
    padding-top: 22px;
    padding-bottom: 22px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    margin-top: -4px;
    font-weight: 700;

    &:hover{
        background-color: rgba(0,0,0,0);
        color: #0493bd;
    }
`

const Input = styled.input`
    color: #3c3c3c;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 18px;
    border-radius: 0;
    line-height: 22px;
    background-color: #fbfbfb;
    padding: 13px 13px 13px 54px;
    margin-bottom: 10px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px solid rgba(0,0,0,0);
`

const Second_div = styled.div`
    background-color: rgba(72,72,72,0.4);
    padding-left: 35px;
    padding-right: 35px;
    padding-top: 35px;
    padding-bottom: 50px;
    width: 450px;
    float: left;
    left: 50%;
    position: absolute;
    margin-top: 30px;
    margin-left: -260px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
`

export default Login;