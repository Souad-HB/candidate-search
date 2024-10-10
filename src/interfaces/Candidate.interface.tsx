// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate { // check here the right properties of the interfaceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  readonly name: string;
  readonly login: string;
  readonly location: string;
  readonly avatar_url: string;
  readonly email: string;
  readonly company: string;
  readonly html_url: string;
}

export default Candidate;
