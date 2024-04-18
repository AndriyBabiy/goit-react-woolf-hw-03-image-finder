import { Component } from 'react';
import { ModalBackdrop, ModalContent, ModalImage } from './Modal.styled';

export class Modal extends Component {
  state = {
    click: '',
  };

  handleEsc = ({ code }) => {
    console.log(code);
    if (code === 'Escape') this.props.closeModal();
  };

  componentDidMount() {
    this.setState({ click: '' });
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  backdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  contentClick = event => {
    event.stopPropagation();
  };

  render() {
    const { img, alt } = this.props;
    console.log();

    return (
      <ModalBackdrop onClick={this.backdropClick}>
        <ModalContent onClick={this.contentClick}>
          <ModalImage src={img} alt={alt} />
        </ModalContent>
      </ModalBackdrop>
    );
  }
}
