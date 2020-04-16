import React, { FunctionComponent } from 'react';
import './MyCloset.css';
import { Link, RouteComponentProps } from 'react-router-dom';

// interface MyClosetState {
//   clothes: Clothes[];
// }

interface Clothes {
  id: number;
  image: string;
}

const MyCloset: FunctionComponent<Clothes> = ({ id, image }) => {
  return (
    <tr>
      <div></div>
      <Link to={`/detail/${id}`}>이걸 누르면?{image}</Link>
    </tr>
  )
  // constructor(props: {}) {
  //   super(props);

  //   this.state = {
  //     clothes: []
  //   }
  // }
}

export default MyCloset;