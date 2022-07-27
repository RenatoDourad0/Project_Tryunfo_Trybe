import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      cardImage,
      onInputChange,
      onSaveButtonClick,
      cardRare,
    } = this.props;
    const max = 210;
    return (
      <div className="form">
        <h2>Adicionar nova carta</h2>
        <label htmlFor="name">
          Nome
          <br />
          <input
            type="text"
            name="cardName"
            id="name"
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardDescription">
          Descrição
          <br />
          <textarea
            name="cardDescription"
            id="cardDescription"
            cols="17"
            rows="3"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="firstAtribut">
          Atributo 1
          <input
            type="number"
            name="cardAttr1"
            id="firstAtribut"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="secondAtribut">
          Atributo 2
          <input
            type="number"
            name="cardAttr2"
            id="secondAtribut"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="thirdAtribut">
          Atributo 3
          <input
            type="number"
            name="cardAttr3"
            id="thirdAtribut"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <span id="pontosRestantes">
          Pontos restantes -
          { max - cardAttr1 - cardAttr2 - cardAttr3 }
        </span>
        <label htmlFor="image">
          Imagem
          <input
            type="text"
            name="cardImage"
            id="image"
            data-testid="image-input"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="rarity">
          Raridade
          <br />
          <select
            name="cardRare"
            id="rarity"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>
        <label htmlFor="isSupertrunfo" id="supertrunfoLabel">
          { hasTrunfo ? 'Você já tem um Super Trunfo em seu baralho ' : <input
            type="checkbox"
            name="cardTrunfo"
            id="isSupertrunfo"
            data-testid="trunfo-input"
            checked={ cardTrunfo }
            onChange={ onInputChange }
          /> }
          Super Trunfo
        </label>
        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
