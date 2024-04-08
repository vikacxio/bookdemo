import React from "react";
import "../../common/styles/productRow.css";
//import { API } from "aws-amplify";
import StarRating from "../../common/starRating/StarRating";
//import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Glyphicon } from "react-bootstrap";
import { Book } from "../bestSellers/BestSellerProductRow";

export interface Order {
  bookId: string;
  quantity: number;
  price: number
}

interface CartProductRowProps {
  order: Order;
  calculateTotal: () => void;
}

interface CartProductRowState {
  book: Book | undefined;
  removeLoading: boolean;
}

export class CartProductRow extends React.Component<CartProductRowProps, CartProductRowState> {
  constructor(props: CartProductRowProps) {
    super(props);

   
    this.state = {
      book: undefined,
      removeLoading: false
    };
  }

  async componentDidMount() {
    try {
      const book = await this.getBook(this.props.order);
      
      this.setState({ book });
    } catch (e) {
      alert(e);
    }
  }

  async getBook(order: Order) {

    //old api call
    //return API.get("books", `/books/${order.bookId}`, null);

    //new api call

    const requestBody = {
      bookId: order.bookId
  };

  const bookOrder= await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/getBook?blocking=true&result=true', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json',  'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
  });
  let data = await bookOrder.json();
  const filtered = data.data;
  return filtered[0];



    
  //   const bookOrder = await fetch('http://172.232.117.60:8000/booksdata?result=true&&blocking=true', {
  //   method: 'POST',
  //   headers: {  'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
  // });

  // let data = await bookOrder.json();
  // const filtered = data.data.filter((item:any) => item.id === `${order.bookId}`);
  // console.log(filtered[0]);

  // return filtered[0];

  }



  onRemove = async () => {
    this.setState({ removeLoading: true });

    //old api call
        // API.del("cart", "/cart", {
    //   body: {
    //     bookId: this.props.order.bookId,
    //   }
    // });



    //new api call
    var requestBodyDelete = {
  
      "customerId": "bovyva@closetab.email",
      "bookId": this.props.order.bookId,
  };
  await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/deleteCart?blocking=true&result=true', {
    method: 'POST',
    body: JSON.stringify(requestBodyDelete ),
    headers: { 'Content-Type': 'application/json',  'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
   })
  
    


    this.props.calculateTotal();
  }

 

  onQuantityUpdated = async (event: any) => {
       var requestBodyUpdate = {
  
      customerId: "bovyva@closetab.email",
      bookId: this.props.order.bookId,
    quantity:parseInt(event.target.value, 10)
  };
  await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/updateCart?blocking=true&result=true', {
    method: 'POST',
    body: JSON.stringify(requestBodyUpdate),
    //	mode: 'no-cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
   })
    
    // API.put("cart", "/cart", {
    //   body: {
    //     bookId: this.props.order.bookId,
    //     quantity: parseInt(event.target.value, 10)
    //   }
    // });
  }

  render() {
    if (!this.state.book) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle">
            <img className="media-object product-thumb" src={this.state.book.cover} alt={`${this.state.book.name} cover`} />
          </div>
          <div className="media-body">
            <h3 className="media-heading">{this.state.book.name}
              <div className="pull-right margin-1">
                <small>${this.state.book.price}</small>
              </div>
            </h3>
            <p>
              <small>{this.state.book.category}</small>
            </p>
            {/*<FriendRecommendations bookId={this.props.order.bookId} />*/}
            <div>
              Rating
              <div className="pull-right">
                <div className="input-group">

                  <input type="number" className="form-control" placeholder="Quantity" defaultValue={this.props.order.quantity?this.props.order.quantity.toString():0} onChange={this.onQuantityUpdated} min={1} />
                  <span className="input-group-btn">
                    <button className="btn btn-black" type="button" onClick={this.onRemove} disabled={this.state.removeLoading}>
                      {this.state.removeLoading && <Glyphicon glyph="refresh" className="spinning" />} 
                      Remove
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <p><StarRating stars={this.state.book.rating} /></p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProductRow;


