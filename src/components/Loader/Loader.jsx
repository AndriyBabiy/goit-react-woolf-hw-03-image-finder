import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export class Loader extends Component {
  render() {
    return (
      <LoaderContainer>
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </LoaderContainer>
    );
  }
}
