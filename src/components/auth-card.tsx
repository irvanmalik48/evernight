"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { AtSign, Check, Eye, EyeOff, KeyRound, X } from "lucide-react";
import { useMemo, useState } from "react";

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
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    if (score === 4) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score <= 3) return "Medium password";
    if (score === 4) return "Strong password";
    return "Very strong password";
  };

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async (values) => {
      setPasswordVisible(false);
      setConfirmPasswordVisible(false);
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
      setPasswordVisible(false);
      setConfirmPasswordVisible(false);
      toast.success("Registration successful!");
      console.log(values);
    },
  });

  return (
    <Tabs defaultValue="login" className={props.className}>
      <TabsList className="w-full rounded-full">
        <TabsTrigger
          className="rounded-full"
          onClick={() => {
            setPassword("");
            setPasswordVisible(false);
            setConfirmPasswordVisible(false);
            return registerForm.reset();
          }}
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full"
          onClick={() => {
            setPasswordVisible(false);
            setConfirmPasswordVisible(false);
            return loginForm.reset();
          }}
          value="register"
        >
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
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
                        <InputGroup>
                          <InputGroupInput
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
                          <InputGroupAddon align="inline-start">
                            <AtSign />
                          </InputGroupAddon>
                        </InputGroup>
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
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            type={passwordVisible ? "text" : "password"}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Please enter your password"
                            autoComplete="current-password"
                          />
                          <InputGroupAddon align="inline-start">
                            <KeyRound />
                          </InputGroupAddon>
                          {passwordVisible ? (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                className="cursor-pointer"
                                onClick={() => setPasswordVisible(false)}
                              >
                                <EyeOff />
                              </InputGroupButton>
                            </InputGroupAddon>
                          ) : (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                className="cursor-pointer"
                                onClick={() => setPasswordVisible(true)}
                              >
                                <Eye />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
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
                        <InputGroup>
                          <InputGroupInput
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
                          <InputGroupAddon align="inline-start">
                            <AtSign />
                          </InputGroupAddon>
                        </InputGroup>
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
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            type={passwordVisible ? "text" : "password"}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              return field.handleChange(e.target.value);
                            }}
                            aria-invalid={isInvalid}
                            placeholder="Please enter your password"
                            autoComplete="new-password"
                          />
                          <InputGroupAddon align="inline-start">
                            <KeyRound />
                          </InputGroupAddon>
                          {passwordVisible ? (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                className="cursor-pointer"
                                onClick={() => setPasswordVisible(false)}
                              >
                                <EyeOff />
                              </InputGroupButton>
                            </InputGroupAddon>
                          ) : (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                className="cursor-pointer"
                                onClick={() => setPasswordVisible(true)}
                              >
                                <Eye />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                        <div
                          className="my-1 h-1 w-full overflow-hidden rounded-full bg-border"
                          role="progressbar"
                          aria-valuenow={strengthScore}
                          aria-valuemin={0}
                          aria-valuemax={5}
                          aria-label="Password strength"
                        >
                          <div
                            className={`h-full ${getStrengthColor(
                              strengthScore,
                            )} transition-all duration-500 ease-out`}
                            style={{ width: `${(strengthScore / 5) * 100}%` }}
                          ></div>
                        </div>
                        <p
                          id="password-strength"
                          className="mb-1 text-sm font-medium text-foreground"
                        >
                          {getStrengthText(strengthScore)}.
                        </p>
                        <ul
                          className="space-y-1.5"
                          aria-label="Password requirements"
                        >
                          {strength.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              {req.met ? (
                                <Check
                                  size={16}
                                  className="text-emerald-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <X
                                  size={16}
                                  className="text-muted-foreground/80"
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                className={`text-xs ${
                                  req.met
                                    ? "text-emerald-600"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {req.text}
                                <span className="sr-only">
                                  {req.met
                                    ? " - Requirement met"
                                    : " - Requirement not met"}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
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
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            type={confirmPasswordVisible ? "text" : "password"}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Please confirm your password"
                            autoComplete="new-password"
                          />
                          <InputGroupAddon align="inline-start">
                            <KeyRound />
                          </InputGroupAddon>
                          {confirmPasswordVisible ? (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                className="cursor-pointer"
                                onClick={() => setConfirmPasswordVisible(false)}
                              >
                                <EyeOff />
                              </InputGroupButton>
                            </InputGroupAddon>
                          ) : (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                className="cursor-pointer"
                                onClick={() => setConfirmPasswordVisible(true)}
                              >
                                <Eye />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
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
                onClick={() => {
                  setPassword("");
                  return registerForm.reset();
                }}
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
