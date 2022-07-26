import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import List from './components/List';

class App extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.validadeInfo = this.validadeInfo.bind(this);
    this.handleCardDelete = this.handleCardDelete.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      savedCards: [],
      hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    this.validadeInfo();
  }

  handleSaveButtonClick(event) {
    event.preventDefault();
    const { cardName, cardDescription, cardAttr1, cardAttr2 } = this.state;
    const { cardAttr3, cardImage, cardRare, cardTrunfo } = this.state;
    const cardInfo = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    if (cardTrunfo === true) {
      this.setState({
        hasTrunfo: true,
      });
    }
    this.setState((prev) => ({
      savedCards: [...prev.savedCards, cardInfo],
    }));
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    });
  }

  handleCardDelete({ target }) {
    const name = target.parentNode.firstChild.children[0].innerText;
    const isTrunfo = target.parentNode.firstChild.children[7];
    this.setState((prev) => ({
      savedCards: [...prev.savedCards].filter(({ cardName }) => cardName !== name),
    }));
    if (isTrunfo !== undefined) {
      this.setState({
        hasTrunfo: false,
      });
    }
  }

  validadeInfo() {
    const {
      cardName: name,
      cardDescription: desc,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const attr1Numb = parseInt(cardAttr1, 10);
    const attr2Numb = parseInt(cardAttr2, 10);
    const attr3Numb = parseInt(cardAttr3, 10);
    const maxValue = 90;
    const maxSum = 210;
    const one = name !== '' && desc !== '' && cardImage !== '' && cardRare !== '';
    const two = attr1Numb <= maxValue && attr2Numb <= maxValue && attr3Numb <= maxValue;
    const tree = attr1Numb + attr2Numb + attr3Numb <= maxSum;
    const four = attr1Numb > 0 && attr2Numb > 0 && attr3Numb > 0;
    if (one && two && tree && four) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      savedCards,
    } = this.state;
    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.handleSaveButtonClick }
        />
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
        <List
          savedCards={ savedCards }
          handleCardDelete={ this.handleCardDelete }
        />
      </div>
    );
  }
}

export default App;
