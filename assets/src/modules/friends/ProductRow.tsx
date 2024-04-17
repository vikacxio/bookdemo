import React from "react";
import "../../common/styles/productRow.css";
import StarRating from "../../common/starRating/StarRating";
//import { API } from "aws-amplify";
import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";

import { Book } from "../bestSellers/BestSellerProductRow";

//console.log("hello from product row")

interface ProductRowProps {
  bookId: string;
}

interface ProductRowState {
  book: Book | undefined;
}

export class ProductRow extends React.Component<ProductRowProps, ProductRowState> {
  constructor(props: ProductRowProps) {
    super(props);
    //console.log(this.props.bookId)

    this.state = {
      book: undefined,
    };
  }

  async componentDidMount() {

    // API.get("books", `/books/${this.props.bookId}`, null)
    //   .then(response => this.setState({ book: response }))
    //   .catch(error => alert(error));

    try {
      
      const book = await this.getBook(this.props.bookId);

      this.setState({ book });
    } catch (e) {
      alert(e);
    }


  }




  async getBook(id: string) {
    const requestBody = {
      bookId: id
    };

    const bookOrder = await fetch('http://172.232.117.60:8000/getBook?blocking=true&result=true', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
    });
    let data = await bookOrder.json();
    const filtered = data.data;
    return filtered[0];
  }





  render() {
    if (!this.state.book) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle no-padding">
            <img className="product-thumb border" src={this.state.book.cover} alt={`${this.state.book.name} cover`} />
          </div>
          <div className="media-body product-padding padding-20">
            <h3 className="media-heading">{this.state.book.name}
              <small className="pull-right ">${this.state.book.price}</small>
            </h3>
            <p className="no-margin"><small>{this.state.book.category}</small></p>
            <FriendRecommendations bookId={this.props.bookId} />
            <div>
              Rating
              <AddToCart bookId={this.state.book.id} price={this.state.book.price} />
            </div>
            <StarRating stars={this.state.book.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;


