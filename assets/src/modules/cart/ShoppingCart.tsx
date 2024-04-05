import React, { Component } from "react";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import "../../common/hero/hero.css";
import { CartProductRow, Order } from "./CartProductRow";
import "../../common/styles/common.css";
//import { API } from "aws-amplify";
import { Redirect } from "react-router";

interface ShoppingCartProps {}

interface ShoppingCartState {
  isLoading: boolean;
  orders: any[]; // FIXME
  orderTotal: number | undefined;
  toCheckout: boolean;
}

export default class ShoppingCart extends Component<ShoppingCartProps, ShoppingCartState> {
  constructor(props: ShoppingCartProps) {
    super(props);

    this.state = {
      isLoading: true,
      orders: [],
      orderTotal: undefined,
      toCheckout: false
    };
  }

  async componentDidMount() {
    try {
      const ordersInCart = await this.listOrdersInCart();
     
      this.setState({ 
        orders: ordersInCart,
      });
    } catch (e) {
      alert(e);
    }

    this.getOrderTotal();
    this.setState({ isLoading: false });
  }

  async listOrdersInCart() {

    //old api call
    // return API.get("cart", "/cart", null);

    const requestBodyCart = {
      customerId: "bovyva@closetab.email"
  };

    //new api call
    const getCart = await fetch('http://172.232.117.60:3233/api/v1/namespaces/_/actions/getCart?blocking=true&result=true', {
    method: 'POST',
    body: JSON.stringify(requestBodyCart),
    headers: { 'Content-Type': 'application/json',  'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
  })
  const data = await getCart.json();
  return data.data;
  }

  getOrderTotal = async () => {
    const ordersInCart = await this.listOrdersInCart();
    this.setState({
      orders: ordersInCart,
    });

    let total = ordersInCart.reduce((total: number, book: Order) => {
      return total + book.price * book.quantity
    }, 0).toFixed(2);

    this.setState({
      orderTotal: total
    });
  }

  onCheckout = () => {
    this.setState({
      toCheckout: true
    });
  }

  render() {
    if (this.state.toCheckout) return <Redirect to='/checkout' />

    return (
      this.state.isLoading ? <div className="loader"></div> :
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <div className="well-bs padding-bottom-120">
            <div className="white-box no-margin-top">
            <h3>Shopping cart</h3>
          </div>
          {this.state.orders.map(order => <CartProductRow order={order} key={order.bookId} calculateTotal={() => this.getOrderTotal()} />)}
            <div className="pull-right checkout-padding">
              <button className="btn btn-black" type="button" disabled={this.state.orders.length < 1} onClick={this.onCheckout}>Checkout</button>
            </div>
          </div>
          <div className="well-bs col-md-12 full-page"></div>
        </div>
    );
  }
}