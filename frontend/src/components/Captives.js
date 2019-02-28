import React from "react";

import { connect } from "react-redux";
import Captive from "./Captive";


const findMissingPieces = board => {
  const captives = {
    W: {
      P: 8,
      Q: 1,
      R: 2,
      N: 2,
      B: 2,
    },
    B: {
      P: 8,
      Q: 1,
      R: 2,
      N: 2,
      B: 2,
    }
  };

  board.forEach((cur, idx) => {
    if (cur) {
      const piece = cur.type;
      const side = cur.side;

      captives[side][piece]--;
    }
  });

  return captives;
}

const captivesStyle = {
  position: "relative",
  width: 64 * 8 + "px",
  margin: "auto",
  minHeight: "40px"
}

const Captives = props => {
  const captives = findMissingPieces(props.game.position.board);
  const flip = props.game.black == props.authentication.id;

  return (
    <div style={ captivesStyle }>
      <div>
        {
          [ ..."PQRNB" ].map(el => {
            if (captives[ props.side ][el]) {
              return <Captive
                color={ props.side }
                piece={ el }
                qty={ captives[ props.side ][el] } />
            }
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ authentication, game }) =>
  ({ authentication, game });

export default connect(mapStateToProps)(Captives);
