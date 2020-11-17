import React from 'react';
import styled from 'styled-components'

const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <Ul>
                {pageNumbers.map(number => (
                    <Li key={number}>
                        <A onClick={() => paginate(number)} href='/accueil/!#'>
                            {number}
                        </A>
                    </Li>
                ))}
            </Ul>
        </nav>
    );
};
const Ul = styled.ul`
    list-style: none;
    margin-left: 32%;
    margin-top: 10%;
`
const Li = styled.li`
    display: inline;
    margin: 3%;
    font-size: 135%;
`
const A = styled.a`
    text-decoration: none;
    color: #fff;
`

export default Pagination;