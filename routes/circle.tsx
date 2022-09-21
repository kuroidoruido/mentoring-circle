import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  name: string;
  beMentored: boolean;
  beMentor: boolean;
}

interface MentoringPair {
  mentor: string;
  mentored: string;
}

export const handler: Handlers<MentoringPair[]> = {
  async GET(_, ctx) {
    const users: User[] = JSON.parse(
      await Deno.readTextFile("./data/users.json").catch(() => "[]")
    );
    const mentoringPairs: MentoringPair[] = [];
    const mentors = users.filter((u) => u.beMentor);
    const mentoreds = users.filter((u) => u.beMentored);
    mentors.sort(() => Math.random() * 100 - 50);
    mentoreds.sort(() => Math.random() * 100 - 50);
    for (const mentored of mentoreds) {
      if (mentors.length === 0) {
        mentors.push(...users.filter((u) => u.beMentor));
        mentors.sort(() => Math.random() * 100 - 50);
      }
      const mentorIndex = mentors.findIndex((u) => u.name !== mentored.name);
      const [mentor] = mentors.splice(mentorIndex, 1);
      mentoringPairs.push({ mentor: mentor.name, mentored: mentored.name });
    }
    return ctx.render(mentoringPairs);
  },
};

export default function Home({ data }: PageProps<MentoringPair[]>) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Mentor</th>
            <th>Mentored</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ mentor, mentored }) => {
            return (
              <tr>
                <td>{mentor}</td>
                <td>{mentored}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
