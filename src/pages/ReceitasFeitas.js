import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function ReceeitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // const doneRecipes = [{
  //   id: '52977',
  //   type: 'comidas',
  //   area: ' area-da-receita-ou-texto-vazio',
  //   category: 'asdasd',
  //   alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  //   name: 'nome-da-receita',
  //   image: 'imagem-da-receita',
  //   doneDate: 'quando-a-receita-foi-concluida',
  //   tags: ['0', '1'],
  // },
  // {
  //   id: '52977',
  //   type: 'bebidas',
  //   area: ' area-da-receita-ou-texto-vazio',
  //   category: 'asdasd',
  //   alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  //   name: 'nome-da-receita',
  //   image: 'imagem-da-receita',
  //   doneDate: 'quando-a-receita-foi-concluida',
  //   tags: ['0', '1'],
  // },
  // ];

  const [categories, setCategories] = useState('All');

  return (
    <>
      <Header pageTitle="Receitas Feitas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setCategories('All') }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setCategories('comidas') }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setCategories('bebidas') }
        >
          Drinks

        </button>
        {/* <div> */}
        { doneRecipes.filter((recipe) => {
          if (categories === 'All') return recipe;
          if (recipe.type === categories) return recipe;
          return null;
        }).map((recipe, index) => (
          <div key={ recipe.id }>
            <Link
              className="card"
              key={ recipe.id }
              to={ (recipe.type === 'comidas'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <p
              className="categories-text"
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.category }

            </p>
            <Link
              className="card"
              key={ recipe.id }
              to={ (recipe.type === 'comidas'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
            >
              <p
                className="recipes-text"
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }

              </p>
            </Link>
            <p
              className="date"
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }

            </p>
            <div>
              {recipe.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </p>
              ))}
            </div>
            <ShareButton
              url={ (recipe.type === 'comidas'
                ? `
                http://localhost:3000/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
              index={ index }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ReceeitasFeitas;
