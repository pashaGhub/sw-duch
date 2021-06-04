import React, { useContext, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth, useMessage } from "../../../hooks";
import { AppContext, AuthContext } from "../../../context";
import { ROUTES } from "../../../constants";

import s from "./Login.module.scss";

interface ILoginForm {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { login, isAuthenticated } = useContext(AuthContext);
  const { handleSubmit, register, errors } = useForm<ILoginForm>();
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

  const onSubmit = async (props: ILoginForm) => {
    const data = await request(
      "https://sw-duch.netlify.app/api/auth/login",
      "POST",
      props
    );

    if (data.token) {
      login(data.token, data.userId);
      history.push(ROUTES.aMainPanel);
    } else {
      message(data.error, "error");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h2>Admin Panel</h2>
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
                  message: "invalid username",
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
              type="Password"
              name="password"
              placeholder="   "
              ref={register({
                required: "Required",
              })}
            />

            <label className={s.labelInside} htmlFor="password">
              Password
            </label>
          </div>

          <div>
            <button type="submit" disabled={loading} className={s.button}>
              Login
            </button>
          </div>
        </form>
        <Link to="/register" className={s.link}>
          Create user
        </Link>
      </div>
    </div>
  );
};
