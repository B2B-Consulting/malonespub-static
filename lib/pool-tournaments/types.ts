export const TOURNAMENT_STATUSES = [
  "Draft",
  "Registration Open",
  "Registration Closed",
  "In Progress",
  "Completed",
  "Archived",
] as const;

export type TournamentStatus = (typeof TOURNAMENT_STATUSES)[number];
export type RegistrationStatus = "Open" | "Closed";
export type PlayerRegistrationStatus = "Registered" | "Cancelled";

export type BracketSlot = {
  name: string;
  score: string;
};

export type PoolTournament = {
  id: string;
  slug: string;
  name: string;
  date: string;
  startTime: string;
  checkInTime: string;
  entryFee: string;
  maxPlayers: number;
  format: string;
  rules: string[];
  prizeInformation: string;
  registrationStatus: RegistrationStatus;
  status: TournamentStatus;
  isPublic: boolean;
  isActivePublic: boolean;
  createdAt: string;
  archivedAt: string | null;
  legacyBracket?: Record<string, BracketSlot>;
};

export type PoolRegistration = {
  id: string;
  tournamentId: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: PlayerRegistrationStatus;
  checkedIn: boolean;
};

export type PublicPoolTournament = Omit<
  PoolTournament,
  "legacyBracket" | "slug" | "isActivePublic" | "archivedAt" | "createdAt"
> & {
  availableSpots: number;
};

export type TournamentInput = Pick<
  PoolTournament,
  | "name"
  | "slug"
  | "date"
  | "startTime"
  | "checkInTime"
  | "entryFee"
  | "maxPlayers"
  | "format"
  | "rules"
  | "prizeInformation"
  | "registrationStatus"
  | "status"
  | "isPublic"
>;

export type RegistrationInput = {
  name: string;
  phone: string;
  email: string;
};
