import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/shared/TextInput";
import { loginSchema, type LoginFormValues } from "../helpers/zod/auth";
import { useLogin } from "../../../hooks/useLogin";
import { USERS_ME_QUERY_KEY } from "@/const/querykey";

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login = ({ onSwitchToRegister }: LoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useLogin({
    onSuccess(user) {
      queryClient.setQueryData(USERS_ME_QUERY_KEY, user);
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        const redirectUri = searchParams.get("redirect_uri");
        const navigateRoute = redirectUri || "/";
        return navigate(navigateRoute, { replace: true });
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      <TextInput
        control={form.control}
        name="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail size={16} />}
      />

      <TextInput
        control={form.control}
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        leftIcon={<LockKeyhole size={16} />}
        rightElement={
          <Button
            variant="link"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        }
      />

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <LoaderCircle size={16} className="mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight size={16} className="ml-2" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to FrontRow?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </button>
      </p>
    </form>
  );
};

export default Login;
