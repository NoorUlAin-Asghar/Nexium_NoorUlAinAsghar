import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link";

export default function SignInPage() {
  console.log("Rendering SignInPage");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-[#008080] to-[#00f5f5]">
    <Card className="w-full max-w-sm p-6">
      <CardHeader>
        <h1 className="text-5xl text-center italic font-bold font-dancing text-black mb-6">Sign Up</h1>
        <CardDescription>
          Let's Get Started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
            <div className="flex flex-col gap-3">
                <div className="grid">
                <Input
                    id="fname"
                    type="text"
                    placeholder="First Name"
                    required
                />
                </div>
                <div className="grid ">
                <Input
                    id="fname"
                    type="text"
                    placeholder="Last Name"
                    required
                />
                </div>
                <div className="grid ">
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                />
                </div>
                <div className="grid">
                <Input id="password" type="password" placeholder="Password" required />
                </div>
                <div className="grid">
                <Input id="password" type="password" placeholder="Repeat Password" required />
                </div>
            </div>
        </form>
      </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full  bg-[#008080]">
            Submit
            </Button>
            <div className="flex justify-center items-center text-sm gap-1">
            <span className="text-muted-foreground">Already have an account?</span>
            <Button variant="link" className="text-[#008080] p-0 h-auto">
               <Link href="/sign-in"  className="active:text-black">Sign In</Link>
            </Button>
            </div>
        </CardFooter>
    </Card>
    </div>
  )
}
