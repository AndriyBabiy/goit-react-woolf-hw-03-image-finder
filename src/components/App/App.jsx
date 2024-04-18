import { getPhotos } from 'api/getPhotos';
import { Button } from 'components/Button/Button.styled';
import { Container } from 'components/Container/Container.styled';
import {
  GalleryPhoto,
  ImageGallery,
} from 'components/ImageGallery/ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Text } from 'components/Text/Text.styled';
import { NavBar } from 'components/TopBar/TopBar.styled';
import { Component } from 'react';

export class App extends Component {
  state = {
    page: 1,
    search: '',
    images: [],
    showMoreBtn: false,
    isEmpty: false,
    isError: '',
    isLoading: false,
    modalOpen: false,
    modalImage: '',
    modalAlt: '',
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const data = await getPhotos(this.state.search, this.state.page);

        if (data.hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          showMoreBtn: Math.ceil(data.totalHits / 15) > this.state.page,
        }));
      } catch (err) {
        this.setState({ isEmpty: err.message });
        alert(err.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = searchTerm => {
    if (searchTerm === this.state.search) {
      alert('We have already displayed these photos');
      return;
    }

    this.setState({
      search: searchTerm,
      page: 1,
      images: [],
      showMoreBtn: false,
      isEmpty: false,
    });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = (image, alt) => {
    this.setState({
      modalOpen: true,
      modalImage: image,
      modalAlt: alt,
    });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    console.log(this.state.images);
    return (
      <Container>
        <NavBar>
          <SearchBar handleSearch={this.handleSearch} />
        </NavBar>
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {this.state.isError && (
          <Text textAlign="center">
            Something went wrong, try again later... 😥
          </Text>
        )}
        <ImageGallery>
          {this.state.images.map(image => (
            <GalleryPhoto
              key={image.id}
              onClick={() => this.showModal(image.largeImageURL, image.tags)}
            >
              <img src={image.webformatURL} alt={image.tags} />
            </GalleryPhoto>
          ))}
        </ImageGallery>
        {this.state.modalOpen && (
          <Modal
            img={this.state.modalImage}
            alt={this.state.modalAlt}
            closeModal={this.closeModal}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.showMoreBtn && (
          <Button onClick={this.handleClick}>Load more</Button>
        )}
      </Container>
    );
  }
}
