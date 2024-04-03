import React from "react";
import "../../common/styles/gallery.css";
import { API } from "aws-amplify";
import CategoryGalleryBook from "./CategoryGalleryBook";
import { Book } from "../bestSellers/BestSellerProductRow";

interface CategoryGalleryProps {
  match: any;
}

interface CategoryGalleryState {
  isLoading: boolean;
  books: Book[];
}

export class CategoryGallery extends React.Component<CategoryGalleryProps, CategoryGalleryState> {
  constructor(props: CategoryGalleryProps) {
    super(props);

    this.state = {
      isLoading: true,
      books: []
    };
  }

  async componentDidMount() {
    try {
      const response = await this.listBooks();

      let data = await response.json();
      const filtered = data.data.filter((item:any) => item.category === `${this.props.match.params.id}`);

      console.log(filtered);
    // books(filtered);
      this.setState({ books:filtered });
     // this.setState({ books });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  listBooks() {
    return fetch('http://172.232.117.60:8000/booksdata?result=true&&blocking=true', {
    method: 'POST',
    //	mode: 'no-cors',
    headers: { 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
  });

  //OlD
   // return API.get("books", `/books?category=${this.props.match.params.id}`, null);
  }

  render() {
    return (
      this.state.isLoading ? <div className="loader" /> :
      <div>
        <div className="well-bs no-radius">
          <div className="container-category">
            <h3>{this.props.match.params.id}</h3>
            <div className="row">
              {this.state.books.map(book => <CategoryGalleryBook book={book} key={book.id} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryGallery;