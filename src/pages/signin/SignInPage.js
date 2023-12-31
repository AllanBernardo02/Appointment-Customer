import React from "react";
import { Link } from "react-router-dom";
import SignInPresenter from "./SignInPresenter";
import { signInUseCase } from "../../usecases/user";
import { Button } from "nq-component";
import BasePage from "../../base/BasePage";
import withRouter from "../../withRouter";
import InputFactory from "../../components/InputFactory";

class SignInPage extends BasePage {
  constructor() {
    super();
    this.presenter = new SignInPresenter(this, signInUseCase());
    this.state = { progress: false };
  }

  formSubmit(e) {
    e.preventDefault();
    this.presenter.submit();
  }

  getMasterKey() {
    return this.props.params && this.props.params.masterKey;
  }

  showProgress() {
    this.setState({ progress: true });
  }

  hideProgress() {
    this.setState({ progress: false });
  }

  onChange(field, value) {
    this.presenter.onChange(field, value);
  }

  render() {
    const { user } = this.state;
    return (
      <div className="vh-100" style={{ backgroundColor: "rgba(0, 86, 86, 1)" }}>
        <div className="d-flex h-100">
          <div className="m-auto container p-3 px-lg-5 py-lg-4">
            <div className="bg-white shadow rounded p-3 px-lg-5 py-lg-4">
              <div className="row">
                <div className="col-md-6 border-end border-1">
                  <div className="h-100 d-flex align-items-center">
                    <div className="text-center p-3 w-100">
                      <img
                        className="img-fluid login-img mb-3 w-50"
                        // src="/logo.svg"
                        src="https://th.bing.com/th/id/R.56928c8cad5cf67245c1d24233ef3eed?rik=5nzyLbuc7SZItg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_460178.png&ehk=WMkhyZ5%2fOtyuugTk5l2pmCkpiXSGamSsLDgtxDyuQeQ%3d&risl=&pid=ImgRaw&r=0"
                        alt=""
                      />
                      <h1 className="fw-bold text-black">APPTIMIZER</h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 p-3 px-lg-5 py-lg-4">
                  <h2 className="fw-bold mb-3">Login</h2>
                  <form onSubmit={this.formSubmit.bind(this)}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-12">
                        <label className="form-label fs-sm">
                          Email Address
                        </label>
                        <InputFactory
                          required
                          type="Email"
                          autoComplete="nope"
                          className="form-control"
                          placeholder="Email Address"
                          onChange={this.onChange.bind(this, "username")}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fs-sm">Password</label>
                        <InputFactory
                          type="Password"
                          required
                          className="form-control"
                          placeholder="Password"
                          onChange={this.onChange.bind(this, "password")}
                        />
                      </div>
                    </div>
                    <div className="text-end mb-3">
                      <div className="mb-3 text-end">
                        <Link to="/forgot" className="fs-sm ms-2">
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <Button
                        progress={this.state.progress}
                        type="submit"
                        className="w-50"
                        style={{ backgroundColor: "rgba(0, 86, 86, 1)" }}
                      >
                        {this.state.progress ? "Please wait..." : "LOGIN"}
                      </Button>
                    </div>
                    <div className="text-center">
                      <span className="fs-sm">
                        Don't have an account?
                        <Link to="/signup" className="ms-1">
                          <span className="text-decoration-underline">
                            Sign up
                          </span>
                        </Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);
