import React, { Component } from "react";
import BaseListPage from "../../../base/BaseListPage";
import BookAppointmentPresenter from "./BookAppointmentPresenter";
import { findObjectUseCase } from "../../../usecases/object";
import BaseFormPresenter from "../../../base/BaseFormPresenter";
import NavBar from "../../../components/navbar";
import withRouter from "../../../withRouter";
import { Badge, Calendar } from "antd";

class BookAppointment extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new BookAppointmentPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
    };
  }

  getCollectionName() {
    return "schedules";
  }

  setObjects(objects) {
    this.setState({ objects });
  }

  dateCellRender = (value) => {
    const objects = this.state.objects; // Assuming objects is an array containing objects like the one you provided
    const { id } = this.getParams();
    const formattedDate = value.format("YYYY-MM-DD");
    const objectWithTime = objects.find(
      (obj) =>
        obj?.date?.split("T")[0] === formattedDate && obj.createdBy === id
    );

    const timesToDisplay = objectWithTime
      ? objectWithTime.time.map((t) => t.time)
      : [];

    return (
      <div onClick={() => console.log("Clicked", objects[0]?.id)}>
        {timesToDisplay.length > 0 && (
          <span style={{ color: "green" }}>
            {timesToDisplay.map((t) => (
              <ul key={t}>
                <li>{t}</li>
              </ul>
            ))}
          </span>
        )}
      </div>
    );
  };

  render() {
    const getTime = this.state.objects;
    console.log("get", getTime);
    const id = this.getParams();

    console.log("iddd", id);
    return (
      <>
        <NavBar />

        <div>
          <Calendar cellRender={this.dateCellRender} />
        </div>
      </>
    );
  }
}

export default withRouter(BookAppointment);
