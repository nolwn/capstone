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
  margin: "64px 0px 64px 20px",
  height: 6 * 64 + "px",
  minWidth: "124px"
}

const TakenPieces = props => {
  const captives = findMissingPieces(props.game.position.board);
  const flip = props.game.black == props.authentication.id;

  return (
    <div style={ captivesStyle }>
      <div>
        {
          [ ..."PQRNB" ].map(el => {
            if (captives[ flip ? "B" : "W" ][el]) {
              return <Captive
                color={ flip ? "B" : "W" }
                piece={ el }
                qty={ captives[ flip ? "B" : "W" ][el] } />
            }
          })
        }
      </div>
      <div style={{ position: "absolute", bottom: "0px" }}>
        {
          [ ..."PQRNB" ].map(el => {
            if (captives[ flip ? "W" : "B" ][el]) {
              return <Captive
                  color={ flip ? "W" : "B" }
                  piece={ el }
                  qty={ captives[ flip ? "W" : "B" ][el] }
                />
            }
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ authentication, game }) =>
  ({ authentication, game });

export default connect(mapStateToProps)(TakenPieces);
