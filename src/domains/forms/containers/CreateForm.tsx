import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const CreateForm = () => (
  <Card>
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <p> Card Contend </p>
    </CardContent>
    <CardFooter>
      <p> Card Footer </p>
    </CardFooter>
  </Card>
);

export { CreateForm };
