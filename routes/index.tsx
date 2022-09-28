import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  CardContent,
  CardFooter,
  CardHeader,
  FloatingCard,
} from "../components/FloatingCard.tsx";
import { User } from "../models/index.ts";

export const handler: Handlers<User | null> = {
  async POST(req, ctx) {
    const form = await getBodyFormAsMap(req);
    console.log("posted form", form);
    const newUser: User = {
      name: form.get("name") ?? "",
      beMentored: form.get("beMentored") === "yes",
      beMentor: form.get("beMentor") === "yes",
    };
    Deno.writeTextFileSync(
      "./data/users.json",
      JSON.stringify([
        ...JSON.parse(
          await Deno.readTextFile("./data/users.json").catch(() => "[]")
        ),
        newUser,
      ])
    );
    return ctx.render(newUser);
  },
};

async function getBodyFormAsMap(req: Request): Promise<Map<string, string>> {
  const form = new Map<string, string>();

  const bodyUintArray = (await req.body?.getReader().read())?.value;
  const bodyString = new TextDecoder().decode(bodyUintArray);
  bodyString
    .split("&")
    .map((part) => part.split("="))
    .forEach(([k, v]) => form.set(k, v));
  return form;
}

export default function Home(props: PageProps<User>) {
  const content = (() => {
    if (props.data) {
      return <RegisterConfirm {...props} />;
    } else {
      return <RegisterForm />;
    }
  })();

  return (
    <>
      <Head>
        <title>Mentoring Circle</title>
        <link rel="stylesheet" href="./styles.min.css" />
      </Head>
      {content}
    </>
  );
}

export function RegisterForm() {
  return (
    <form method="POST">
      <FloatingCard>
        <CardHeader>
          <h1>Register</h1>
        </CardHeader>
        <CardContent>
          <div className="field">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="field options">
            <span className="options-label">Do you want to be mentored?</span>
            <div className="option">
              <input
                type="radio"
                id="be-mentored-yes"
                name="beMentored"
                value="yes"
              />
              <label for="be-mentored-yes">I want to be mentored</label>
            </div>
            <div className="option">
              <input
                type="radio"
                id="be-mentored-no"
                name="beMentored"
                value="no"
                checked
              />
              <label for="be-mentored-no">I do not want to be mentored</label>
            </div>
          </div>
          <div className="field options">
            <span className="options-label">Do you want to be a mentor?</span>
            <div className="option">
              <input
                type="radio"
                id="be-mentor-yes"
                name="beMentor"
                value="yes"
              />
              <label for="be-mentor-yes">I want to be a mentor</label>
            </div>
            <div className="option">
              <input
                type="radio"
                id="be-mentor-no"
                name="beMentor"
                value="no"
                checked
              />
              <label for="be-mentor-no">I do not want to be a mentor</label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button>Register</button>
        </CardFooter>
      </FloatingCard>
    </form>
  );
}
export function RegisterConfirm({ data }: PageProps<User>) {
  const details = (() => {
    if (data.beMentor && data.beMentored) {
      return " as wanting to be a mentor and wanting to be mentored.";
    } else if (data.beMentor) {
      return " as wanting to be a mentor.";
    } else if (data.beMentored) {
      return " as wanting to be mentored.";
    } else {
      return " as being a solo player.";
    }
  })();
  return (
    <div>
      <h1>Register</h1>
      <p>
        Thanks {data.name} you had been registerd {details}
      </p>
    </div>
  );
}
