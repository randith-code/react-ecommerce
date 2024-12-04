import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useNotification } from "@/contexts/NotificationContext";

const Register = () => {
  const navigate = useNavigate();
  const notifications = useNotification();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      notifications.showNotification(
        `Registration successful: ${values.name}`,
        "success"
      );
      console.log("Registration successful:", values);
      navigate("/login");
    },
  });

  return (
    <main className="w-full h-screen grid place-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Sign up to unlock seamless shopping experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={formik.handleReset}
              >
                Clear
              </Button>
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;
