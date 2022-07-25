import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.validadeInfo = this.validadeInfo.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      // hasTrunfo: false,
      // isSaveButtonDisabled: true,
      savedCards: [],
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
    });
  }

  // validadeInfo() {
  //   const { cardName, cardDescription, cardImage, cardRare } = this.state;
  //   const {cardAttr1, cardAttr2, cardAttr3} = this.state;
  //   if (this.state.cardTrunfo === true) {
  //     this.setState({
  //       hasTrunfo: true,
  //     })
  //   }
  // }
  //   return cardName !== '' ? cardImage !== '' ? cardDescription !== '' ?  parseInt(cardAttr1, 10) <= 90 ? parseInt(cardAttr1, 10) > 0 ?  parseInt(cardAttr2, 10) <= 90 ? parseInt(cardAttr2, 10) > 0 ?  parseInt(cardAttr3, 10) <= 90 ? parseInt(cardAttr3, 10) > 0 ? parseInt(cardAttr1, 10) + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10) <= 210 ? this.setState({
  //     isSaveButtonDisabled: false
  //   }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     }) : this.setState({
  //       isSaveButtonDisabled: true
  //     });

  // if (cardName.length > 0 && cardDescription.length > 0 && cardImage.length > 0 && cardRare.length > 0) {
  //   if (parseInt(cardAttr1, 10) <= 90 && parseInt(cardAttr2, 10) <= 90 && parseInt(cardAttr3, 10) <= 90) {
  //     if (parseInt(cardAttr1, 10) + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10) <= 210) {
  //       if(parseInt(cardAttr1, 10) > 0 && parseInt(cardAttr2, 10) > 0 && parseInt(cardAttr3, 10) > 0) {
  //         return this.setState({
  //           isSaveButtonDisabled: false
  //         });
  //       }
  //     }
  //   }
  // }
  // return this.setState({
  //   isSaveButtonDisabled: true
  // });
  // };

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2 } = this.state;
    const { cardAttr3, cardImage, cardRare, cardTrunfo } = this.state;
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
          onSaveButtonClick={ his.handleSaveButtonClick }
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
    );
  }
}

export default App;
