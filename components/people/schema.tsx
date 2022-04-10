export interface IList {
  arrPeople: any[];
}

export interface IArrayPeople {
  id: string;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
  mass: string;
  skinColor: string;
  created: string;
  edited: string;
  species: ISpecies;
  homeworld: IPlanet;
  filmConnection: IFilmConnection;
}

export interface ISpecies {
  id: string;
  name: string;
}

export interface IPlanet {
  id: string;
  name: string;
}

export interface IFilmConnection {
  films: IFilm[];
}

export interface IFilm {
  id: string;
  title: string;
  episodeID: number;
  director: string;
  created: string;
}
