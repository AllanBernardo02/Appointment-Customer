import React, { Component } from "react";
import NavBar from "../../../components/navbar";
import { Button, Search } from "nq-component";
import BaseListPage from "../../../base/BaseListPage";
import BookPresenter from "./BookPresenter";
import { findObjectUseCase } from "../../../usecases/object";

class BookPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new BookPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
    };
  }

  getCollectionName() {
    return "users";
  }

  onClickItem(index, field) {
    console.log("Index", field);
    this.presenter.onClickItem(index, field);
  }
  render() {
    const doctor = this.state.objects;
    console.log("Doctor:", doctor);
    return (
      <>
        <NavBar />
        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h1 className="fw-bold mt-3 text-capitalize">
              Appoint your Schedule Here!
            </h1>
            <Search
              className="mt-3"
              //   onSubmit={this.searchSubmit.bind(this)}
              //   fields={schema.fields}
            />
          </div>

          <div
            className="doctor-container"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {doctor.map((doc, index) => {
              return (
                <div
                  className="card p-2 cursor-pointer"
                  style={{ flex: "0 0 30%", margin: "10px" }}
                >
                  <div className="doctor-chat">
                    <h1 className="card-title">
                      {/* {doctor.firstname} {doctor.lastname} */}
                      {doc["firstName"]} {doc["lastName"]}
                    </h1>
                    {/* <MessageOutlined
              style={{ fontSize: "20px" }}
              onClick={() => chatDoctor(doctor._id)}
               /> */}
                  </div>
                  <hr />
                  <p>
                    <b>Specialization : </b>
                    {/* {doctor.specialization} */}
                  </p>
                  <p>
                    <b>Experience : </b>
                    {/* {doctor.experience} */}
                  </p>
                  <p>
                    <b>Consultation Fee : </b>
                    {/* {doctor.feeConsultation} */}
                  </p>
                  <p>
                    <b>Phone Number : </b>
                    {/* {doctor.phoneNumber} */}
                  </p>
                  {/* <p>
                    <b>Address : </b>
                    {doctor.address}
                </p> */}

                  <p>
                    {/* <b>Hours Schedule : </b> */}
                    {/* {doctor.timings[0]} - {doctor.timings[1]} */}
                  </p>
                  <Button
                    // onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                    // style={{ color: "white", backgroundColor: "#013737" }}
                    onClick={this.onClickItem.bind(this, index)}
                  >
                    Book
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default BookPage;
