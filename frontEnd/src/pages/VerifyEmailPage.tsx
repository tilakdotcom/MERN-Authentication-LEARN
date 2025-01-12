import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
// import { errorToast, successToast } from "@/lib/toast";
import { verifyTokenSchema } from "@/schemas/verifyTokenSchema";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof verifyTokenSchema>>({
    resolver: zodResolver(verifyTokenSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onSubmit(values: z.infer<typeof verifyTokenSchema>) {
    setLoading(true);
    console.log(values)
  }
  return (
    <div className="h-full lg:px-20 flex justify-center items-center px-10 py-5 my-auto">
      <div className="flex justify-center items-center">
      <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full bg-green-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
        >
        <h2 className="text-2xl font-bold text-center text-white ">
           VerifyEmail
        </h2>
        <p className="text-center text-gray-200">
          Please enter the code sent to your email
        </p>
  
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
          <FormItem>
            <FormLabel className="block md:text-base font-medium text-gray-100 ">
            Code
            </FormLabel>
            <FormControl>
            <Input
              className="w-full px-4 py-2 rounded-md bg-green-900 text-gray-100 border border-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none md:text-base "
              placeholder="Enter your Code "
              {...field}
              maxLength={6}
            />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        <div className="py-2 md:py-4">
          <Button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-green-400 hover:bg-green-500 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ease-linear ${
            loading ? " cursor-not-allowed bg-green-300" : ""
          }`}
          >
          {loading ? "Wait" : "Verify"}
          </Button>
        </div>
        </form>
      </Form>
      </div>
    </div>
  );
}
