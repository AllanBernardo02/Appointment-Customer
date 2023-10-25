import React, { Component } from "react";
import BaseListPage from "../../../base/BaseListPage";
import BookAppointmentPresenter from "./BookAppointmentPresenter";
import { findObjectUseCase } from "../../../usecases/object";
import BaseFormPresenter from "../../../base/BaseFormPresenter";
import NavBar from "../../../components/navbar";
import withRouter from "../../../withRouter";
import { Modal, Calendar } from "antd";
import { Button, dialog } from "nq-component";

class BookAppointment extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new BookAppointmentPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
      selectedButtonIndex: "",
      selectedTime: null,
      selectedDoctor: null,
      selectedDate: null,
    };
  }

  getCollectionName() {
    return "schedules";
  }

  setObjects(objects) {
    this.setState({ objects });
  }

  handleBooking = async () => {
    const { selectedTime, selectedDoctor, selectedDate, selectedButtonIndex } =
      this.state;
    console.log("sbi", selectedButtonIndex);
    if (selectedTime && selectedDoctor && selectedDate) {
      console.log(
        `Booking details: Time - ${selectedTime}, Doctor - ${selectedDoctor}, Date - ${selectedDate}`
      );
    } else {
      console.log("Please select a time before booking.");
    }
  };

  openModal = async (objects) => {
    const { selectedButtonIndex } = this.state;
    const local = localStorage.getItem("index");
    console.log(local);

    console.log("lalalala", selectedButtonIndex);
    const { id } = this.getParams();
    const query = {
      where: {
        id: id,
      },
    };
    const docs = await findObjectUseCase().execute("users", query);

    dialog.fire({
      html: (
        <div>
          {docs.map((d) => (
            <>
              <h2>
                Dr. {d.firstName} {d.lastName}
              </h2>

              <hr />
              <div className="d-flex align-items-center justify-content-start">
                {objects?.time.map((t, index) => {
                  return (
                    <button
                      className=" m-2"
                      onClick={() => {
                        this.setState(
                          {
                            selectedButtonIndex: index,

                            selectedTime: t.time,
                            selectedDoctor: `Dr. ${d.firstName} ${d.lastName}`,
                            selectedDate: objects.date,
                          },
                          () => localStorage.setItem("index", index)
                        );
                      }}
                      style={{
                        backgroundColor:
                          localStorage.getItem("index") === index
                            ? "green"
                            : "transparent",
                      }}
                    >
                      {t.time}
                    </button>
                  );
                })}
              </div>
              <div className="text-end mb-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={this.handleBooking}
                >
                  Book
                </button>
                <button className="btn btn-primary">Go Back</button>
              </div>
            </>
          ))}
        </div>
      ),
      footer: false,
    });
  };

  dateCellRender = (value) => {
    const objects = this.state.objects;
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
      <div onClick={() => this.openModal(objectWithTime)}>
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
