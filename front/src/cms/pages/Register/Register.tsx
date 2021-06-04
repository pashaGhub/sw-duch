import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth, useMessage } from "../../../hooks";
import { AppContext, AuthContext } from "../../../context";
import { ROUTES } from "../../../constants";

import s from "./Register.module.scss";

interface IRegisterForm {
  username: string;
  password: string;
  rePassword: string;
}

export const Register: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { login, isAuthenticated } = useContext(AuthContext);
  const [passMismatched, setPassMismatched] = useState<boolean>(false);
  const { handleSubmit, register, errors } = useForm<IRegisterForm>();
  const { request, loading } = useAuth();

  const message = useMessage();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push(ROUTES.aMainPanel);
    }
  }, [isAuthenticated]);

  const onSubmit = async (props: IRegisterForm): Promise<any> => {
    const { username, password, rePassword } = props;
    if (password !== rePassword) {
      return setPassMismatched(true);
    }

    setPassMismatched(false);
    try {
      const data = await request(
        "https://sw-duch.netlify.app/api/auth/register",
        "POST",
        {
          username,
          password,
        }
      );

      if (data && !data.error) {
        login(data.token, data.userId);
      } else {
        message(data.error, "error");
      }
    } catch (e) {
      message(e.message, "error");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h2>Registration</h2>
      </div>
      <div className={s.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formItem}>
            <input
              type="text"
              name="username"
              placeholder="   "
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[a-z0-9_-]{3,16}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <label className={s.labelInside} htmlFor="username">
              Username
            </label>

            <div className={s.error}>
              {errors.username && errors.username.message}
            </div>
          </div>

          <div className={s.formItem}>
            <input
              type="password"
              name="password"
              placeholder="   "
              ref={register({
                required: "Required",
                pattern: {
                  value: /^((?!.*[\s])([A-Za-z0-9]).{5,15})$/i,
                  message:
                    "Password should not contain white spaces and be 6 to 15 in length",
                },
              })}
            />

            <label className={s.labelInside} htmlFor="password">
              Password
            </label>
            <div className={s.error}>
              {errors.password && errors.password.message}
              {passMismatched && "Passwords do not match"}
            </div>
          </div>
          <div className={s.formItem}>
            <input
              type="password"
              name="rePassword"
              placeholder="   "
              ref={register({
                required: "Required",
                pattern: {
                  value: /^((?!.*[\s])([A-Za-z0-9]).{5,15})$/i,
                  message:
                    "Password should not contain white spaces and be 6 to 15 in length",
                },
              })}
            />

            <label className={s.labelInside} htmlFor="rePassword">
              Repeat password
            </label>
            <div className={s.error}>
              {errors.rePassword && errors.rePassword.message}
              {passMismatched && "Passwords do not match"}
            </div>
          </div>

          <div>
            <button type="submit" disabled={loading} className={s.button}>
              Create user
            </button>
          </div>
        </form>
        <Link to="/login" className={s.link}>
          Login
        </Link>
      </div>
    </div>
  );
};
