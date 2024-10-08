"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginAction } from "../actions";
import { useServerAction } from "zsa-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, isPending } = useServerAction(loginAction, {
    onSuccess(result) {
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });

      console.log("Login successful", result);
      router.push("/booking");
    },
    onError({ err }) {

      console.log("Login failed", err);
      toast({
        title: "Login Failed",
        description: err.message,
        variant: 'destructive',
    
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    execute(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
