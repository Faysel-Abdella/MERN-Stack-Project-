import {
  Link,
  Form,
  useNavigation,
  redirect,
  useActionData,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../util/customFetch.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { message: "" };
  if (data.password.length < 3) {
    errors.message = "password too short";
    return errors;
  }

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login success");
    return redirect("/dashboard");
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    error.message = error?.response?.data?.message;
    return error;
  }
};

const LogIn = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation === "submitting";

  // using the data returned from the action
  const errors = useActionData();
  //If the the action did not return any value this will be undefined
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        {errors?.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <p></p>
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "submit"}
        </button>
        <button type="button" className="btn btn-block">
          Explore the app
        </button>
      </Form>

      <p>
        Not a member yet?
        <Link to="/register" className="member-btn">
          Register
        </Link>
      </p>
    </Wrapper>
  );
};
export default LogIn;
