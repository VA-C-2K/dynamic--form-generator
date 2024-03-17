import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Auth } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Auth>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    defaultValues: {},
  });

  const onSignUp = async ({ email, password }: Auth) => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const onSignIn = async ({ email, password }: Auth) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-2 p-8">
        <h1 className="text-2xl"> Welcome</h1>
        <Input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value doesn't match email format",
            },
          })}
          error={errors.email?.message}
        />
        <Input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: 8,
          })}
          error={errors.password?.message}
        />
        <div className="grid gap-2">
          <Button onClick={handleSubmit(onSignUp)} type="button">
            Sign up
          </Button>
          <Button onClick={handleSubmit(onSignIn)} type="button">
            Sign in
          </Button>
          <Button onClick={handleSignOut} type="button">
            Sign out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
