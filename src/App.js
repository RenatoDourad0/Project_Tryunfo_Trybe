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
    this.handleNameFilterChange = this.handleNameFilterChange.bind(this);
    this.handleRareFilterChange = this.handleRareFilterChange.bind(this);
    this.handleTrunfoFilterChange = this.handleTrunfoFilterChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleNextCLick = this.handleNextCLick.bind(this);
    this.handleReplay = this.handleReplay.bind(this);

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
      isListButtonDisabled: false,
      isNameFilterDisabled: false,
      isRareFilterDisabled: false,
      gameOn: [],
      playCardIndex: 0,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validadeInfo());
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

  handleCardDelete(name, trunfo) {
    this.setState((prev) => ({
      savedCards: [...prev.savedCards].filter(({ cardName }) => cardName !== name),
    }));
    if (trunfo === true) {
      this.setState({
        hasTrunfo: false,
      });
    }
  }

  handleNameFilterChange({ target }) {
    this.setState((prev) => ({
      savedCards: [...prev.savedCards]
        .filter((card) => card.cardName.includes(target.value)),
    }));
  }

  handleRareFilterChange({ target }) {
    if (target.value === 'todas') { return; }
    this.setState((prev) => ({
      savedCards: [...prev.savedCards]
        .filter((card) => card.cardRare === target.value),
    }));
  }

  handleTrunfoFilterChange({ target }) {
    if (target.checked) {
      this.setState((prev) => ({
        savedCards: [...prev.savedCards]
          .filter((card) => card.cardTrunfo === target.checked),
      }));
      this.setState({
        isNameFilterDisabled: true,
        isRareFilterDisabled: true,
      });
    } else {
      this.setState({
        isNameFilterDisabled: false,
        isRareFilterDisabled: false,
      });
    }
  }

  handlePlayClick() {
    const { savedCards } = this.state;
    const half = 0.5;
    const shuffle = savedCards.sort(() => Math.random() - half);
    this.setState({
      gameOn: shuffle,
      isListButtonDisabled: true,
    });
  }

  handleNextCLick() {
    const { playCardIndex, gameOn } = this.state;
    if (playCardIndex <= gameOn.length - 1) {
      this.setState((prev) => ({
        playCardIndex: prev.playCardIndex + 1,
      }));
    }
  }

  handleReplay() {
    const half = 0.5;
    this.setState((prev) => ({
      playCardIndex: 0,
      gameOn: prev.savedCards.sort(() => Math.random() - half),
    }));
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
    const four = attr1Numb >= 0 && attr2Numb >= 0 && attr3Numb >= 0;
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
      isListButtonDisabled,
      isNameFilterDisabled,
      isRareFilterDisabled,
      gameOn,
      playCardIndex,
    } = this.state;
    return (
      <div>
        <div className="inputContainer">
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
        </div>
        <div className="listContainer">
          <div className="aside">
            <p>Filtros de busca</p>
            <input
              type="text"
              data-testid="name-filter"
              placeholder="Nome da carta"
              onChange={ this.handleNameFilterChange }
              disabled={ isNameFilterDisabled }
            />
            <select
              id="teste"
              data-testid="rare-filter"
              onChange={ this.handleRareFilterChange }
              defaultValue="todas"
              disabled={ isRareFilterDisabled }
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
            <label htmlFor="trunfo">
              Super trunfo
              <input
                type="checkbox"
                name="trunfo"
                data-testid="trunfo-filter"
                onChange={ this.handleTrunfoFilterChange }
              />
            </label>
            <button
              type="button"
              onClick={ this.handlePlayClick }
            >
              Iniciar jogo
            </button>
            {
              playCardIndex === gameOn.length - 1
                ? <button
                    type="button"
                    onClick={ this.handleReplay }
                >
                    Embaralhar novamente
                </button>
                : <button
                    type="button"
                    onClick={ this.handleNextCLick }
                >
                    Próxima carta
                </button>
            }
          </div>
          { gameOn.length > 0
            ? <List
                savedCards={ [gameOn[playCardIndex]] }
                handleCardDelete={ this.handleCardDelete }
                listButtonStatus = { isListButtonDisabled }
            />
            : <List
                savedCards={ savedCards }
                handleCardDelete={ this.handleCardDelete }
                listButtonStatus = { isListButtonDisabled }
            /> }
        </div>
      </div>
    );
  }
}

export default App;
