import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
//import './App.css';
import Recipes from './Recipes'
/*import Posts from './components/Posts'
import Pagination from './components/Pagination';*/
import Pagination from './Pagination';
import styled from 'styled-components'
import iconeLog from '../../images/log.png'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import logo from '../../images/ubereat.png'

const Accueil = () => {
    //const [posts, setPosts] = useState([])
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    //const [postsPerPage, setPostsPerPage] = useState(10)
    const [recipesPerPage,] = useState(3)

    const PUBLIC_KEY = process.env.REACT_APP_RECIPE_API_KEY;
    const history = useHistory();
    const firebase = useContext(FirebaseContext);

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
                console.log(res.data.extendedIngredients)
                setLoading(false);
                setRecipes(res.data.extendedIngredients)
            })
            .catch(err => {
                setLoading(true);
                console.log(err)
            })
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - recipesPerPage;
    const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    console.log(paginate)

    const handleClick = () => {
        firebase.disconnect()
        localStorage.clear();
        history.push('/')
    }

    return (
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
                <Recipes recipes={currentPosts} loading={loading} />
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={recipes.length}
                    paginate={paginate}
                />
            </Second_div>
        </div>
    )
}
const SpanTitle = styled.span`
	font-size: 136%;
    color: #fff;
`
const Img = styled.img`
    width: 55%;
    margin-left: 23%;
    margin-top: -9%;
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
	background-color: inherit;
`
const ImgIconLog = styled.img`
	width: 8%;
	margin-left: 93%;
	margin-top: 2%;
`
const Div = styled.div`
	float: left;
`
const DivDisconnect = styled.div`
	float: right;
`
const Second_div = styled.div`
    background-color: rgba(65,185,56,0.9);
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

export default Accueil;
