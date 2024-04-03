import React from "react";
import "../../common/styles/gallery.css";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import CategoryGalleryBook from "./CategoryGalleryBook";
import { Book } from "../bestSellers/BestSellerProductRow";

interface CategoryGalleryTeaserProps {}

interface CategoryGalleryTeaserState {
  isLoading: boolean;
  books: Book[];
}

export class CategoryGalleryTeaser extends React.Component<CategoryGalleryTeaserProps, CategoryGalleryTeaserState> {
  constructor(props: CategoryGalleryTeaserProps) {
    super(props);

    this.state = {
      isLoading: true,
      books: []
    };
  }

  async componentDidMount() {
    try {



      let response = await this.listBooks();
      //console.log(response)
      let data = await response.json();
      const filtered = data.data.filter((item:any) => item.category === "Cookbooks");

      console.log(filtered);
    // books(filtered);
      this.setState({ books:filtered });
      //console.log(data+"from api")
     
    
      // const books = await this.listBooks();
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
  //   return API.get("books", "/books?category=Cookbooks", null);
   }

  render() {
    return (
      this.state.isLoading ? <div className="loader" /> :
      <div>
        <div className="well-bs no-padding-top col-md-12 no-radius">
          <div className="container-category">
            <h3>Cookbooks <small><LinkContainer to="/category/Cookbooks"><a>Browse cookbooks</a></LinkContainer></small></h3>
            <div className="row">
              {this.state.books.slice(0,4).map(book => <CategoryGalleryBook book={book} key={book.id} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryGalleryTeaser;