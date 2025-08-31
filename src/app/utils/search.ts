import { Advocate } from "@/db/schema";

export const filterSearch = (searchTerm: string, advocates: Advocate[]): Advocate[] => {
  const term = searchTerm.toLowerCase();
  return advocates.filter((advocate: Advocate) => 
    advocate.firstName.toLowerCase().includes(term) ||
    advocate.lastName.toLowerCase().includes(term) ||
    advocate.city.toLowerCase().includes(term) ||
    advocate.degree.toLowerCase().includes(term) ||
    String(advocate.yearsOfExperience).includes(term) ||
    advocate.specialties.some(specialty => specialty.toLowerCase().includes(term))
  );
};
