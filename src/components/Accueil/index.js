import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../images/ubereat.png'
import { FirebaseContext } from '../Firebase'
import iconeLog from '../../images/log.png'


const Accueil = () => {

	const history = useHistory();

	const firebase = useContext(FirebaseContext);

	const PUBLIC_KEY = process.env.REACT_APP_RECIPE_API_KEY;

	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information',
			headers: {
				"x-rapidapi-key": PUBLIC_KEY,
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"useQueryString": true
			}
		})
			.then(res => {
				//console.log(res.data.extendedIngredients)
				setRecipes(res.data.extendedIngredients)
			})
			.catch(err => {
				console.log(err)
			})
	},[])

	const handleClick = () => {
		firebase.disconnect()
		history.push('/')
    }

    return (
		<First_div>
			<div>
				<DivDisconnect>
					<div>
						<Div>
							<ImgIconLog src={iconeLog} />
						</Div>
						<Div>
							<Nav>
								<Ul>
									<Li>
										<ALink href="#">Mon compte &ensp;</ALink>
										<SousUl>
											<SousLi>
												<SousALink onClick={handleClick}>
													Deconnexion
												</SousALink>
											</SousLi>
										</SousUl>
									</Li>
								</Ul>
							</Nav>
						</Div>
					</div>
				</DivDisconnect>
				<Second_div>
					<Img src={logo} />
					<div>
						<SpanTitle>Veuillez proceder a votre commande</SpanTitle>
					</div>
					<br />
					{recipes.map(rec =>
						<div key={rec.id}>
							<ImgRecip src={`https://spoonacular.com/cdn/ingredients_100x100/${rec.image}`} />
							<br />
							<div>
								<NavLink to={`/details/${rec.id}`}>
									{rec.name}
								</NavLink>
							</div>
							<br />
							<br />
						</div>
					)}
				</Second_div>
			</div>
		</First_div>
    )
}

const Div = styled.div`
	float: left;
`

const ImgIconLog = styled.img`
	width: 8%;
	margin-left: 93%;
	margin-top: 1%;
`

const NavLink = styled(Link)`
	display: block;
    text-align: center;
    font-size: 150%;
    text-decoration: none;
`

const DivDisconnect = styled.div`
	float: right;
`

const SousLi = styled.li`
	flex: 1 1 auto;
    text-align: left;
`

const SousUl = styled.ul`
	display: none;
    box-shadow: 0px 1px 2px #CCC;
    background-color: white;
    position: absolute;
    width: 100%;
    z-index: 1000;
	margin:10;
    padding:0;
    list-style-type: none;
`

const SousALink = styled.a`
	display: block;
    text-decoration: none;
    color: black;
    border-bottom: 2px solid transparent;
    padding: 10px 0px;

	&:hover {
		border-bottom: none;
		background-color: RGBa(200,200,200,0.1);
	}
`

const ALink = styled.a`
	display: block;
    text-decoration: none;
    color: black;
    border-bottom: 2px solid transparent;
    padding: 10px 0px;

	&::after {
		content:" ▼";
		font-size: 12px;
	}
`

const Li = styled.li`
	flex: 1 1 auto;
    text-align: center;
    position: relative;

	&:hover ${SousUl} {
		display: flex;
		flex-flow: column wrap;
	}
`

const Ul = styled.ul`
	list-style-type: none;
    display: flex;
	margin-left: -43%;
`

const Nav = styled.nav`
	width: 100%;
    margin: 0 auto;
    background-color: white;
    position: sticky;
    top: 0px;
`

const First_div = styled.div`
    background-color: #152228;
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

const Img = styled.img`
    width: 55%;
    margin-left: 23%;
    margin-top: -9%;
`

const ImgRecip = styled.img`
	width: 100%;
	height: 200px;
`

const SpanTitle = styled.span`
	font-size: 136%;
    color: #fff;
`

export default Accueil;