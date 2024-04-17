import React from "react";
import { ProductRow } from "./ProductRow";
import { API } from "aws-amplify";

interface FriendsBoughtProps {

}

interface FriendsBoughtState {
  isLoading: boolean;
  recommendations: any[]; // FIXME
}

export class FriendsBought extends React.Component<FriendsBoughtProps, FriendsBoughtState> {
  constructor(props: FriendsBoughtProps) {
    super(props);

    this.state = {
      isLoading: true,
      recommendations: []
    };
  }


  getFriends = async () => {
    //return API.get("recommendations", `/recommendations/${this.props.bookId}`, null);

    
    //console.log(id);
    const requestBody = {
      customerId:"bovyva@closetab.email"
    };

  const bookOrder = await fetch('http://172.232.117.60:8000/getRecommendations?blocking=true&result=true', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
    });
    let data = await bookOrder.json();

    //console.log(data);
    //console.log("from friend bought")

   return data;


  }

 async componentDidMount() {

  //   API.get("recommendations", "/recommendations", null)
  //     .then(response => {
  //       this.setState({
  //         recommendations: response,
  //         isLoading: false
  //       });
  //     })
  //     .catch(error => alert(error));
  // }

  try {
    // console.log(this.props.bookId);
    // console.log("from recommendation")
     const friendsData = await this.getFriends();
     //console.log(friendsData)               

     const bookIds = friendsData.getRecommendedBooks.records.map((record: { _fields: { properties: { bookId: any; }; }[]; }) => record._fields[0].properties.bookId);

    //console.log(bookIds);
     this.setState(prevState => ({
      recommendations: prevState.recommendations.concat(bookIds)
     }));
   //console.log(this.state.recommendations)

   } catch (e) {
     alert(e);
   }

  }





  render() {
   // if (this.state.isLoading) return null;

    //console.log(this.state.recommendations.slice(0,5))

    return (
      <div className="well-bs no-padding-top col-md-12 no-border">
        <div className="container-category">
          <h3>Books your friends have bought</h3>
        </div>
        {this.state.recommendations.slice(0,5).map(recommendation =>
          <ProductRow bookId={recommendation} key={recommendation} />
        )}
      </div>
    );
  }
}

export default FriendsBought;