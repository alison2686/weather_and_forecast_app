import React from 'react';
// import './styles';
// import { Button } from 'semantic-ui-react'
// import styled from 'styled-components'

import { Card } from 'semantic-ui-react'

const CardExampleCard = ({weatherData}) => (
  <Card>
    <Card.Content>
        <Card.Header className="header">{weatherData.name}</Card.Header>
    </Card.Content>
  </Card>
)

export default CardExampleCard;

// function Weather({weatherData}) {
//     return (
//         <div className="main">
//             <div className="top">
//                 <p className="header">Hello!</p>
//             </div>
//         </div>
//     )
// }

// export default Weather