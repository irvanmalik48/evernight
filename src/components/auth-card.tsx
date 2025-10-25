"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const loginFormSchema = z.object({
  email: z.email("Must be a valid email."),
  password: z
    .string()
    .min(8, "Must be at least 6 characters.")
    .max(256, "Must be at most 256 characters."),
});

const registerFormSchema = z
  .object({
    email: z.email("Must be a valid email."),
    password: z
      .string()
      .min(8, "Must be at least 6 characters.")
      .max(256, "Must be at most 256 characters."),
    confirmPassword: z
      .string()
      .min(8, "Must be at least 6 characters.")
      .max(256, "Must be at most 256 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function AuthCard(props: React.HTMLAttributes<HTMLDivElement>) {
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async (values) => {
      toast.success("Login successful!");
      console.log(values);
    },
  });

  const registerForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerFormSchema,
    },
    onSubmit: async (values) => {
      toast.success("Registration successful!");
      console.log(values);
    },
  });

  return (
    <Tabs defaultValue="login" className={props.className}>
      <TabsList className="w-full">
        <TabsTrigger onClick={() => registerForm.reset()} value="login">
          Login
        </TabsTrigger>
        <TabsTrigger onClick={() => loginForm.reset()} value="register">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-center w-full">Login</h2>
          </CardHeader>
          <CardContent>
            <form
              id="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                loginForm.handleSubmit();
              }}
            >
              <FieldGroup>
                <loginForm.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Please enter your email address"
                          autoComplete="email"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <loginForm.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Please enter your password"
                          autoComplete="current-password"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field
              orientation="horizontal"
              className="w-full flex items-center justify-end"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => loginForm.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="login-form">
                Submit
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-center w-full">Register</h2>
          </CardHeader>
          <CardContent>
            <form
              id="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                registerForm.handleSubmit();
              }}
            >
              <FieldGroup>
                <registerForm.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Please enter your email address"
                          autoComplete="email"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <registerForm.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Please enter your password"
                          autoComplete="new-password"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <registerForm.Field
                  name="confirmPassword"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Confirm Password
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Please confirm your password"
                          autoComplete="new-password"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field
              orientation="horizontal"
              className="w-full flex items-center justify-end"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => registerForm.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="register-form">
                Submit
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
