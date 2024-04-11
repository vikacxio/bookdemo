import React from "react";
import { API } from "aws-amplify";

import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import StarRating from "../../common/starRating/StarRating";
import "../../common/styles/productRow.css";

interface ProductRowProps {
  bookId: string;
}

export interface Book {
  id: string;
  cover: string;
  price: number;
  category: string;
  name: string;
  rating: number;
  author: string;
}

interface ProductRowState {
  book: Book | undefined;
}

export class ProductRow extends React.Component<ProductRowProps, ProductRowState> {
  constructor(props: ProductRowProps) {
    super(props);

    this.state = {
      book: undefined,
    };
  }

  async componentDidMount() {
    try {
      const book = await this.getBook();
      this.setState({ book });
    } catch (e) {
      alert(e);
    }
  }

  async getBook() {
    //return API.get("books", `/books/${this.props.bookId}`, null);
    
    const requestBody = {
      customerId:"bovyva@closetab.email",
      bookId: this.props.bookId
    }

  const bookOrder = await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/getBook?blocking=true&result=true', {
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
            <img className="media-object product-thumb" src={this.state.book.cover} alt={`${this.state.book.name} cover`} />
          </div>
          <div className="media-body product-padding padding-20">
            <h3 className="media-heading">{this.state.book.name}
              <small className="pull-right margin-1"><h4>${this.state.book.price}</h4></small>
            </h3>
            <p><small>{this.state.book.category}</small></p>
            <FriendRecommendations bookId={this.props.bookId} />
            <div>
              Rating
              <AddToCart bookId={this.props.bookId} price={this.state.book.price} />
            </div>
            <StarRating stars={this.state.book.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;


