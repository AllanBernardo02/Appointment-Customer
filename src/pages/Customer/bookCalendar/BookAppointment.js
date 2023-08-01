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

  dateCellRender = (value) => {
    const object = this.state.objects;
    const { id } = this.getParams();
    const formattedDate = value?.format("YYYY-MM-DD");
    const objectWithTime = object.find(
      (obj) => obj.date.split("T")[0] === formattedDate && obj.createdBy === id
    );

    const timeToDisplay = objectWithTime ? objectWithTime.time : null;

    return (
      <div onClick={() => console.log("haha", object[0].id)}>
        {timeToDisplay && (
          <span style={{ color: "green" }}>
            {timeToDisplay.map((t) => (
              <ul>
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
    const { id } = this.getParams();

    console.log("iddd", id);
    return (
      <>
        <NavBar />
        {/* <div>
          {getTime
            .filter((g) => g.createdBy === id)
            .map((t) => {
              return (
                <div>
                  <p>{t.time.map((t) => t)}</p>
                </div>
              );
            })}
        </div> */}
        <div>
          <Calendar cellRender={this.dateCellRender} />
        </div>
      </>
    );
  }
}

export default withRouter(BookAppointment);
