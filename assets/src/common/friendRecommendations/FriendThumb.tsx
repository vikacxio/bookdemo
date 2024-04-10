import React from "react";

import Brenda from "../../images/avatars/Brenda.png";
// import Erin from "../../images/avatars/Erin.png";
// import Jacob from "../../images/avatars/Jacob.png";
// import Jeff from "../../images/avatars/Jeff.png";
// import Jennifer from "../../images/avatars/Jennifer.png";
// import John from "../../images/avatars/John.png";
// import Sarah from "../../images/avatars/Sarah.png";

//const friends = [Brenda, Erin, Jacob, Jeff, Jennifer, John, Sarah];

interface FriendThumbProps {
  friends: any[]

}

export class FriendThumb extends React.Component<FriendThumbProps> {

  constructor(props: FriendThumbProps) {
    super(props);
  
  }
  render() {
    const { friends } = this.props; 
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];
    return (

      <div>
      {/* Use map() function on this.props.friends to map over each friend */}
      {friends.map((friend, index) => (
        <li key={index}>
          {/* Use friend as src and alt for each img */}
          <img className="friend-thumb" src={Brenda} alt={friend} />
        </li>
      ))}
      </div>
    
    );
  }
}

export default FriendThumb;
