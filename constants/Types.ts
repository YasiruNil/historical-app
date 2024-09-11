export interface GlobleState {
  places: PlaceState;
}

export interface PlaceState {
  places: {
    id: number;
    name: string;
    image: string;
    visited: boolean;
    description: string;
  }[];
}
