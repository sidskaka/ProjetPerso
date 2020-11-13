import React, {  useEffect, useState, useContext } from 'react'
import logo from '../../../images/ubereat.png'
import iconeLog from '../../../images/log.png'
import styled from 'styled-components'
import { Link, useParams, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../../Firebase'
import axios from 'axios'

const RecipeDetails = () => {
	//console.log(props)
	const history = useHistory();
	const PUBLIC_KEY = process.env.REACT_APP_RECIPE_API_KEY;
	const firebase = useContext(FirebaseContext)

	const [recipe, setRecipe] = useState([])
	const [pUnits, setPUnits] = useState([])

	const handleClick = () => {
		firebase.disconnect()
		localStorage.clear();
		history.push("/")
	}
	const id = useParams('id').id;
	//const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${id}`
	const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/${id}/information`
	console.log(url)

	useEffect(() => {
		axios({
			method: 'GET',
			url: url,
			headers: {
				"x-rapidapi-key": PUBLIC_KEY,
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"useQueryString": true
			}
		})
			.then(res => {
				setRecipe(res.data)
				setPUnits(res.data.possibleUnits)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	console.log(pUnits)

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
					<div key={recipe.id}>
						<ImgRecip src={`https://spoonacular.com/cdn/ingredients_100x100/${recipe.image}`} />
						<br />
						<div>
							<div style={{ float: 'left' }}>
								<div>
									{recipe.name}
								</div>
								<div>
									<span>Aisle: </span><span>{recipe.aisle}</span>
								</div>
						
								<div>
									<span>Consistency: </span><span>{recipe.consistency}</span>
								</div>
								<div>
									<span>Original: </span><span>{recipe.original}</span>
								</div>
								<div>
									<span>Original name: </span><span>{recipe.originalName}</span>
								</div>
								<div>
									<span>Possible units: </span><br />
									<ul>
										{pUnits.map(pu =>
											<li key={ pu }>{ pu }</li>	
										)}
									</ul>
								</div>
							</div>
							<div style={{ float: 'left' }}>
								xxx
							</div>
						</div>
						<br />
						<br />

					</div>
					<div style={{clear: "both", height: "0"}}>
						<NavLink to="/accueil">Retour</NavLink>
					</div>
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

const ImgRecip = styled.img`
	width: 100%;
	height: 200px;
`

const NavLink = styled(Link)`
	font-size: 138%;
    text-decoration: none;
    color: #fff;
	display: block;
    text-align: right;
`

const First_div = styled.div`
    background-color: #152228;
`

const DivDisconnect = styled.div`
	float: right;
`

const Nav = styled.nav`
	width: 100%;
    margin: 0 auto;
    background-color: white;
    position: sticky;
    top: 0px;
`

const Ul = styled.ul`
	list-style-type: none;
    display: flex;
	margin-left: -43%;
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

const Li = styled.li`
	flex: 1 1 auto;
    text-align: center;
    position: relative;

	&:hover ${SousUl} {
		display: flex;
		flex-flow: column wrap;
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

const SousLi = styled.li`
	flex: 1 1 auto;
    text-align: left;
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

const SpanTitle = styled.span`
	font-size: 136%;
    color: #fff;
`

export default RecipeDetails