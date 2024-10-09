// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  readonly name: string;
  readonly username: string;
  readonly location: string;
  readonly avatar: string;
  readonly email: string;
  readonly htmlUrl: string;
  readonly company: string;
  readonly bio: string;
}
