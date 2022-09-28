export interface User {
  name: string;
  beMentored: boolean;
  beMentor: boolean;
}

export function isUserWantsToBeMentor(user: User) {
  return user.beMentor;
}
export function isUserWantsToBeMentored(user: User) {
  return user.beMentored;
}

export interface MentoringPair {
  mentor: string;
  mentored: string;
}
