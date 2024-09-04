export interface Place {
  fsq_id: string;
  name: string;
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  categories: { name: string }[];
  location: {
    formatted_address: string;
  };
  website: string;
}
