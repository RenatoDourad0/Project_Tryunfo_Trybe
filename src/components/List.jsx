import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class List extends React.Component {
  render() {
    const { savedCards, handleCardDelete } = this.props;
    return (
      savedCards.map((card, index) => {
        const {
          cardName,
          cardDescription,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardRare,
          cardTrunfo,
        } = card;
        return (
          <div
            key={ index }
            className="listCard"
          >
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
            <button
              type="button"
              data-testid="delete-button"
              onClick={ () => handleCardDelete(cardName, cardTrunfo) }
            >
              Excluir
            </button>
          </div>
        );
      })
    );
  }
}

List.propTypes = {
  savedCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCardDelete: PropTypes.func.isRequired,
};

export default List;
