import React, { Component, useEffect } from "react";

const rideType = null;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:9292/todo", {
      method: "GET",
      headers: { "Content-Type": "application-json" },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        let dataSet = [];

        data.map((ride) => {
          dataSet.push(ride);
        });
        this.setState({
          dataSet: dataSet,
        });
      });
  }

  render() {
    return (
      <>
        <TopBar />
        <OptionsBar dataSet={this.state.dataSet} />
      </>
    );
  }
}

class TopBar extends Component {
  render() {
    return (
      <div className="topBar">
        <div className="topBar-bynar">Bynar Systems</div>
        <div className="profileInfo">
          Ali Ghieth
          <img
            className="profileImg"
            src="https://cdn.pixabay.com/photo/2017/08/22/11/56/linked-in-2668696_960_720.png"
          />
        </div>
      </div>
    );
  }
}

class OptionsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
    };
  }
  render() {
    return (
      <>
        <div className="rides-filter-div">
          <button
            onClick={() => {
              this.setState({ show: 0 });
            }}
          >
            Saved Notes
          </button>
          <button
            onClick={() => {
              this.setState({ show: 1 });
            }}
          >
            Add a Note
          </button>
        </div>
        <RidesList value={this.state.show} dataSet={this.props.dataSet} />
      </>
    );
  }
}

class RidesDiv extends Component {
  render() {
    if (this.props.dataSet == null) {
      return;
    }
    let dataSet = this.props.dataSet;
    if (dataSet.length == 0) {
      return (
        <div className="emptyRides">
          <span>No Notes are saved</span>
        </div>
      );
    } else {
      return dataSet.map((ride) => (
        <>
          <div key={ride.id} className="ridesDiv">
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80"
              alt=""
            />
            <div className="rideInfo">
              <span>Title: {ride.title}</span>
              <span>Note: {ride.note}</span>
            </div>
          </div>
        </>
      ));
    }
  }
}

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      note: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event.target.id);
    const target = event.target;
    if (target.id == "titleIn") {
      this.setState({ title: target.value });
    }
    if (target.id == "noteIn") {
      this.setState({ note: target.value });
    }
  }

  postData(data = {}) {
    fetch("http://localhost:9292/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let titleIn = this.state.title;
    let noteIn = this.state.note;

    console.log(titleIn);
    console.log(noteIn);
    if (titleIn.length == 0 || noteIn.length == 0) {
      alert("Please fill all fields");
      return;
    } else {
      if (titleIn.length < 5) {
        alert("title should be atleast 5 letters");
        return;
      } else if (noteIn.length < 10) {
        alert("note should be atleast 10 letters");
        return;
      } else {
        this.postData({
          title: this.state.title,
          note: this.state.note,
        });
      }
    }
  }
  render() {
    return (
      <div className="addNote">
        <span>Please Fill All Fields</span>
        <form className="noteForm" onSubmit={this.handleSubmit}>
          <label>Title</label> <br />
          <input
            type="text"
            id="titleIn"
            placeholder="Title"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <br />
          <label>Note</label> <br />
          <input
            type="text"
            placeholder="Note"
            id="noteIn"
            value={this.state.value}
            onChange={this.handleChange}
          />{" "}
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class RidesList extends Component {
  render() {
    let value = this.props.value;
    if (value == 0) {
      return (
        <div className="availableRides">
          <RidesDiv dataSet={this.props.dataSet} />
        </div>
      );
    } else {
      return (
        <div>
          <AddNote />
        </div>
      );
    }
  }
}

//bundle exec rackup config.ru
export default HomePage;
