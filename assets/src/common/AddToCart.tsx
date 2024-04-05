import React from 'react';
//import { API } from 'aws-amplify';
import { Redirect } from 'react-router';
import { Glyphicon } from 'react-bootstrap';

interface AddToCartProps {
  bookId: string;
  price: number;
  variant?: string;
}

interface AddToCartState {
  loading: boolean;
  toCart: boolean;
}

class AddToCart extends React.Component<AddToCartProps, AddToCartState> {
  constructor(props: AddToCartProps) {
    super(props);

    this.state = {
      loading: false,
      toCart: false
    };
  }

  onAddToCart = async () => {
    this.setState({ loading: true });




    var requestBody = {
      bookId: this.props.bookId,
      customerId: "bovyva@closetab.email"
  };

 

  //old api call
    //const bookInCart = await API.get("cart", `/cart/${this.props.bookId}`, null);

    //new api call
    const bookCartData = await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/getCart?blocking=true&result=true', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 
        'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
     });

     const data = await bookCartData.json();
     const bookInCart= data.data;
     

    

    // if the book already exists in the cart, increase the quantity
    if (bookInCart.length!==0) {

      //old api call
       // API.put("cart", "/cart", {
      //   body: {
      //     bookId: this.props.bookId,
      //     quantity: bookInCart.quantity + 1
      //   }
      // }).then(() => this.setState({
      //   toCart: true
      // }));


      //new api call
      var requestBodyUpdate = {
  
        customerId: "bovyva@closetab.email",
        bookId: this.props.bookId,
      quantity: bookInCart.quantity + 1
    };
      fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/updateCart?blocking=true&result=true', {
      method: 'POST',
      body: JSON.stringify(requestBodyUpdate),
      //	mode: 'no-cors',
      headers: {  'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
     }).then(() => this.setState({
       toCart: true
      }));


     
    }

    // if the book does not exist in the cart, add it
    else {

      const requestBodyCart = {
        customerId: "bovyva@closetab.email",
        bookId: this.props.bookId,
         price: this.props.price,
         quantity: 1,
    };

      //old api call
       // API.post("cart", "/cart", {
      //   body: {
      //     bookId: this.props.bookId,
      //     price: this.props.price,
      //     quantity: 1,
      //   }
      // }).then(() => this.setState({
      //   toCart: true
      // }));

    //new api call
     await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/mongocart?blocking=true&result=true', {
      method: 'POST',
      body: JSON.stringify(requestBodyCart),
      headers: { 'Content-Type': 'application/json',  'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
    }).then(() => this.setState({
      toCart: true
    }));
  }
}
   
     

  getVariant = () => {
    let style = "btn btn-black"
    return this.props.variant && this.props.variant === "center" ? style + ` btn-black-center` : style + ` pull-right`;
  }

  render() {
    if (this.state.toCart) return <Redirect to='/cart' />
    
    return (
      <button 
        className={this.getVariant()} 
        disabled={this.state.loading}
        type="button" 
        onClick={this.onAddToCart}>
        {this.state.loading && <Glyphicon glyph="refresh" className="spinning" />}
        {this.props.variant === "buyAgain" ? `Buy again` : `Add to cart`}
      </button>
    );
  }
}

export default AddToCart;