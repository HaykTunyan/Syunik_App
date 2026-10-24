export type TripDuration =
  | '2_hours'
  | 'half_day'
  | '1_day'
  | '2_3_days'
  | '1_week';

export type TripInterest =
  | 'nature'
  | 'history'
  | 'adventure'
  | 'food'
  | 'photography'
  | 'culture'
  | 'relaxation';

export type TransportType = 'car' | 'taxi' | 'public_transport' | 'walking';

export interface TripStop {
  id: string;
  placeId: string;
  order: number;
  startTime?: string;
  duration: number;
  travelTimeFromPrevious?: number;
  distanceFromPrevious?: number;
}

export interface Trip {
  id: string;
  title: string;
  duration: TripDuration;
  interests: TripInterest[];
  transport: TransportType;
  startLocation: string;
  totalDistanceKm?: number;
  totalDurationMinutes?: number;
  stops: TripStop[];
  createdAt: string;
}
