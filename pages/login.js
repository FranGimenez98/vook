import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useEffect } from "react";
import Layout from "../Layouts/Layout";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .min(5, "Too short!")
    .max(15, "Too long!")
    .required("Password is required!"),
});

export default function LoginScreen() {
  // const { isAuth, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  return (
    <Layout title="Login">
      <div className="max-w-full h-screen px-2">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            await signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            })
              .then((error) => console.log(error))
              .catch((error) => console.log(error));

            // loginCall(
            //   {
            //     email: values.email,
            //     password: values.password,
            //   },
            //   dispatch
            // );
          }}
          validationSchema={loginSchema}
        >
          <Form className="mx-auto max-w-screen-sm mt-[8rem]">
            <h1 className="mb-5 text-xl font-semibold">Login</h1>
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
                Login
              </button>
            </div>
            <div className="mb-4 ">
              Don&apos;t have an account? &nbsp;
              <Link href="/signup">
                <a className="text-[#9d4edd] font-semibold">Register</a>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
}
