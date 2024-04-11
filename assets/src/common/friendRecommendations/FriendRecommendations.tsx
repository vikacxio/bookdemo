//import { API } from 'aws-amplify';
import React from 'react';
import  FriendThumb  from './FriendThumb';

interface FriendRecommendationsProps {
  bookId: string;
}

interface FriendRecommendationsState {
  friends: any[];
}

class FriendRecommendations extends React.Component<FriendRecommendationsProps, FriendRecommendationsState> {
  constructor(props: FriendRecommendationsProps) {
    super(props);
  //  console.log("hi from constructor")

    this.state = {
      friends: []
    };
  }

  getFriends = async (id: string) => {
    //return API.get("recommendations", `/recommendations/${this.props.bookId}`, null);

    
    //console.log(id);
    const requestBody = {
      customerId:"bovyva@closetab.email",
      bookId: id
    };

  const bookOrder = await fetch('http://172.105.55.215:3233/api/v1/namespaces/_/actions/getRecommendationsByBook?blocking=true&result=true', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP') }
    });
    let data = await bookOrder.json();

    //console.log(data)

   return data;


  }

  async componentDidMount() {
    try {
     // console.log(this.props.bookId);
     // console.log("from recommendation")
      const friendsData = await this.getFriends(this.props.bookId);
      //console.log(friendsData)               

      const customerIds = friendsData.getFriendsCustomerList.records.map((record: { _fields: { properties: { customerId: any; }; }[]; }) => record._fields[0].properties.customerId);

     // console.log(customerIds);
      this.setState(prevState => ({
        friends: prevState.friends.concat(customerIds)
      }));
    console.log(this.state.friends)

    } catch (e) {
      alert(e);
    }
  }

  render() {
    // No recommendations to show
    if (!(this.state.friends &&  this.state.friends.length > 0)) {
      return <div className="no-friends-padding" />
    }
    // if (!(this.state.friends[0] && this.state.friends[0].friendsPurchased && this.state.friends[0].friendsPurchased.length > 0)) {
    //   return <div className="no-friends-padding" />
    // }
    
    const numFriendsPurchased = this.state.friends.length;
    //console.log(numFriendsPurchased)
    const friends = this.state.friends;
    console.log(friends);
    return (
      <div>
        <div>Friends who bought this book</div>
        <p>
          <FriendThumb  friends={friends} />
          {numFriendsPurchased > 3 && <span className="orange">{` +${numFriendsPurchased - 3} ${(numFriendsPurchased - 3) > 1 ? "others" : "other"}`}</span>}
        </p>
      </div>
    );
  }
}

export default FriendRecommendations;