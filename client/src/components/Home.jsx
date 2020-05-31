import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = props => (
  <div>
    <div>
      <h1 itemProp="headline">Welcome to Hwankype</h1>
      <p>방 번호를 입력해주세요.</p>
      <input
        type="text"
        name="room"
        value={props.roomId}
        onChange={props.handleChange}
        pattern="^\w+$"
        maxLength="10"
        required
        autoFocus
        title="Room name should only contain letters or numbers."
      />
      <Link className="primary-button" to={"/room/" + props.roomId}>
        Join
      </Link>
      <Link className="primary-button" to={"/room/" + props.defaultRoomId}>
        Random
      </Link>
      {props.rooms.length !== 0 && <div>최근 등록 방:</div>}
      {props.rooms.map(room => (
        <Link key={room} className="recent-room" to={"/room/" + room}>
          {room}
        </Link>
      ))}
    </div>
  </div>
);

Home.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultRoomId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired
};

const mapStateToProps = store => ({ rooms: store.rooms });

export default connect(mapStateToProps)(Home);
