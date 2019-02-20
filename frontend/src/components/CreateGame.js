import React from "react";
import { Table, Button, CardBody } from "reactstrap";

import CreateButton from "./CreateButton";

const CreateGame = props =>
  <>
      <tr colSpan="2">
        <td style={{ "border": "none" }}>
          <h4>
            Create a new game
          </h4>
        </td>
      </tr>
      <tr colSpan="2">
        <td style={{ "border": "none" }}>
          <CreateButton color="white" />
        </td>
        <td style={{ "border": "none" }}>
          <CreateButton color="black" />
        </td>
      </tr>
  </>;

export default CreateGame;
