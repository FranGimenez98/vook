import { Field, Form, Formik, ErrorMessage } from "formik";
import Layout from "../Layouts/Layout";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .trim("No whitespace")
    .strict(true)
    .min(5, "Username is too short!")
    .max(15, "Username is too long!")
    .trim("No whitespace")
    .strict(true)
    .required("Username is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .min(5, "Password is too short!")
    .max(15, "Password is too long!")
    .required("Password is required!"),
});

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  return (
    <Layout title="Sign up">
      <div className="max-w-full h-screen px-2">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            axios.post("/api/users", {
              username: values.username,
              email: values.email,
              password: values.password,
              image:
                "http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8-300x300.jpg",
            });

            const result = signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            });

            if (result.error) {
              console.log("error");
            }
          }}
        >
          <Form className="mx-auto max-w-screen-sm mt-[8rem]">
            <h1 className="mb-5 text-xl font-semibold">Sign up</h1>
            <div className="mb-4 ">
              <label className="font-semibold ">Username</label>
              <Field
                name="username"
                placeholder="Username"
                className="w-full input mt-2"
              />
              <ErrorMessage
                name="username"
                render={(msg) => (
                  <div className="text-red-500 text-base mt-2">{msg}</div>
                )}
              />
            </div>
            <div className="mb-4 ">
              <label className="font-semibold ">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full input mt-1"
              />
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <div className="text-red-500 text-base mt-2">{msg}</div>
                )}
              />
            </div>
            <div className="mb-4 ">
              <label className="font-semibold ">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full input mt-1"
              />
              <ErrorMessage
                name="password"
                render={(msg) => (
                  <div className="text-red-500 text-base mt-2">{msg}</div>
                )}
              />
            </div>
            <div className="mb-4 ">
              <button className="button py-1 px-3" type="submit">
                Sign Up
              </button>
            </div>
            <div className="mb-4 ">
              Already have an account? &nbsp;
              <Link href="/login">
                <a className="text-[#9d4edd] font-semibold">Login</a>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
}
