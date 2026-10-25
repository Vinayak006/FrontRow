import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/shared/TextInput";
import { registerSchema, type RegisterFormValues } from "../helpers/zod/auth";
import { useRegister } from "../../../hooks/useRegister";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register = ({ onSwitchToLogin }: RegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, data, isPending } = useRegister({});

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setShowPassword(false);
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      {data && (
        <div role="status" className="rounded-lg border p-3 text-sm">
          Account created successfully
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium underline underline-offset-4"
          >
            Login
          </button>
        </div>
      )}

      <TextInput
        control={form.control}
        name="name"
        label="Full name"
        placeholder="Your name"
        leftIcon={<UserRound size={16} />}
      />

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
        placeholder="At least 8 characters"
        leftIcon={<LockKeyhole size={16} />}
        rightElement={
          <Button
            variant="ghost"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        }
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle size={16} className="mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight size={16} className="ml-2" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default Register;
