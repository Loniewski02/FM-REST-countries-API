export type CountriesType = {
	name: { official: string; common: string };
	flags: { alt: string; png: string; svg: string };
	population: number;
	region: string;
	capital: string;
}[];

export type CountryDetailsData = {
	flags: { png: string; alt: string };
	name: { common: string; nativeName: { official: string; common: string }[]; official: string };
	population: number;
	region: string;
	subregion: string;
	capital: string;
	tld: string[];
	currencies: { name: string; symbol: string }[];
	languages: string[];
	borders: string[] | null;
};
