import { Component } from 'react';
import { FormBtn, InputSearch, SearchFormStyled } from './Searchbar.styled';
import { SearchIcon } from 'components/SearchIcon/SearchIcon';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  handleChange = evt => {
    this.setState({ search: evt.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleSearch(this.state.search);
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <SearchIcon />
        </FormBtn>
        <InputSearch
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="What type of images do you want to see?"
          name="search"
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
