import {
  isUserWantsToBeMentor,
  isUserWantsToBeMentored,
  MentoringPair,
  User,
} from "../models/index.ts";

export function computeMentoringPairs(users: User[]) {
  const mentoringPairs = computePairs(users);
  mentoringPairs.sort(compareMentoringPairs);
  return mentoringPairs;
}

function compareMentoringPairs(a: MentoringPair, b: MentoringPair): number {
  const mentorCompare = a.mentor.localeCompare(b.mentor);
  if (mentorCompare !== 0) {
    return mentorCompare;
  } else {
    return a.mentored.localeCompare(b.mentored);
  }
}

function computePairs(users: User[]) {
  const mentoringPairs: MentoringPair[] = [];
  const mentors = users.filter(isUserWantsToBeMentor);
  const mentoreds = users.filter(isUserWantsToBeMentored);
  mentors.sort(shuffle);
  mentoreds.sort(shuffle);
  for (const mentored of mentoreds) {
    if (
      mentors.length === 0 ||
      (mentors.length === 1 && mentors[0].name === mentored.name)
    ) {
      mentors.push(...users.filter(isUserWantsToBeMentor));
      mentors.sort(shuffle);
    }
    const mentorIndex = findMentorIndex(mentors, mentored, mentoringPairs);
    const [mentor] = mentors.splice(mentorIndex, 1);
    mentoringPairs.push({ mentor: mentor.name, mentored: mentored.name });
  }
  return mentoringPairs;
}

function findMentorIndex(
  potentialMentors: User[],
  mentored: User,
  actualMentoringPairs: MentoringPair[]
) {
  return potentialMentors.findIndex(
    (potentialMentor) =>
      isNotItSelf(mentored, potentialMentor) &&
      isNotRegisteredPair(
        { mentor: mentored.name, mentored: potentialMentor.name },
        actualMentoringPairs
      )
  );
}

function isNotItSelf(mentored: User, potentialMentor: User): boolean {
  return potentialMentor.name !== mentored.name;
}

function isNotRegisteredPair(
  potentialPair: MentoringPair,
  mentoringPairs: MentoringPair[]
): boolean {
  return mentoringPairs.every(
    (pair) =>
      !(
        pair.mentor === potentialPair.mentor &&
        pair.mentored === potentialPair.mentored
      )
  );
}

function shuffle() {
  return Math.random() * 100 - 50;
}
