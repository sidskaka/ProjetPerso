import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Recipes = ({ recipes, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <Ul>
            {recipes.map(rec => (
                <Li key={rec.id}>
                    <ImgRecip src={`https://spoonacular.com/cdn/ingredients_100x100/${rec.image}`} />
                    <br />
                    <div>
                        <NavLink to={`/details/${rec.id}`}>
                            {rec.name}
                        </NavLink>
                    </div>
                </Li>
            ))}
        </Ul>
    );
};
const Li = styled.li`
    margin-left: -9%;
`
const ImgRecip = styled.img`
	width: 100%;
	height: 200px;
`
const Ul = styled.ul`
    list-style: none;
`
const NavLink = styled(Link)`
	display: block;
    text-align: center;
    font-size: 150%;
    text-decoration: none;
`

export default Recipes;