import React from "react";
import "../../common/styles/gallery.css";
import { API } from "aws-amplify";
import CategoryGalleryBook from "../category/CategoryGalleryBook";
import { Book } from "../bestSellers/BestSellerProductRow";

interface SearchGalleryProps {
  match: any;
}

interface SearchGalleryState {
  isLoading: boolean;
  books: Book[];
}

export class SearchGallery extends React.Component<SearchGalleryProps, SearchGalleryState> {
  constructor(props: SearchGalleryProps) {
    super(props);

    this.state = {
      isLoading: true,
      books: []
    };
  }

  async componentDidMount() {
    try {
      const searchResults = await this.searchBooks();

      // Map the search results to a book object
      const books = [];
      for (var i = 0; i < searchResults.hits.total.value; i++) {
        var hit = searchResults.hits.hits[i] && searchResults.hits.hits[i]._source;
        hit && books.push({
          author: hit.author,
          category: hit.category,
          cover: hit.cover,
          id: hit.id,
          name: hit.name,
          price: hit.price,
          rating: hit.rating,
        });
      }

      this.setState({ 
        books: books
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  async searchBooks() {
    //console.log(this.props.match.params.id);
   // return API.get("search", `/search?q=${this.props.match.params.id}`, null);



    const requestBodyCart = {
      q: this.props.match.params.id
  };

  // new api call
    const getCart = await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/search?blocking=true&result=true', {
    method: 'POST',
    body: JSON.stringify(requestBodyCart),
    headers: { 'Content-Type': 'application/json',  'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
  })
  const data = await getCart.json();
 // console.log(data);
  return data.body;

  }

  render() {
    return (
      this.state.isLoading ? <div className="loader" /> :
      <div>
        <div className="well-bs no-radius">
          <div className="container-category">
            <h3>Search results</h3>
            <div className="row">
              {this.state.books.map(book => <CategoryGalleryBook book={book} key={book.id} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchGallery;