import type { SortOption } from "../types/SortOption";

export interface FilterObject {
    name: string;
    login: string;
    location: string;
    email: string;
    company: string;
    avatar_url: string;
    html_url: string;
    sort: SortOption;
}