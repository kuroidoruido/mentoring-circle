import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import CircleViz from "../islands/CircleViz.tsx";
import { MentoringPair, User } from "../models/index.ts";
import {
  CardContent,
  CardHeader,
  FloatingCard,
} from "../components/FloatingCard.tsx";
import { computeMentoringPairs } from "../utils/mentoring.utils.ts";

interface HandlersData {
  users: User[];
  pairs: MentoringPair[];
}

export const handler: Handlers<HandlersData> = {
  async GET(_, ctx) {
    const users: User[] = JSON.parse(
      await Deno.readTextFile("./data/users.json").catch(() => "[]")
    );
    const pairs = computeMentoringPairs(users);
    return ctx.render({ pairs, users });
  },
};

export default function Circle({ data }: PageProps<HandlersData>) {
  return (
    <>
      <Head>
        <title>Mentoring Circle</title>
        <link rel="stylesheet" href="./styles.min.css" />
      </Head>
      <FloatingCard>
        <CardContent>
          <h1>Summary</h1>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Wants to be mentor</th>
                <th>Wants to be mentored</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td className="col-aligh-center">
                      {user.beMentor ? "Yes" : "No"}
                    </td>
                    <td className="col-aligh-center">
                      {user.beMentored ? "Yes" : "No"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h1>Pairs</h1>
          <table>
            <thead>
              <tr>
                <th>Mentor</th>
                <th>Mentored</th>
              </tr>
            </thead>
            <tbody>
              {data.pairs.map(({ mentor, mentored }) => {
                return (
                  <tr>
                    <td>{mentor}</td>
                    <td>{mentored}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </FloatingCard>
      <CircleViz pairs={data.pairs} users={data.users} />
    </>
  );
}
