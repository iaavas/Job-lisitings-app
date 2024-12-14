export default interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string[];
  salary?: number;
}
