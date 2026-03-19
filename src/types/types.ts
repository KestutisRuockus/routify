export type Waypoint = {
  id: number;
  coordinates: [number, number];
  name: string;
};

export type RouteResult = {
  coords: [number, number][];
  distance: number;
  duration: number;
};
