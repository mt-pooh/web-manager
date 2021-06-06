/**
 * @TJS-pattern ^[0-9]{7}$
 */
type HotelId = string;

/**
 * @TJS-format date
 */
type Date = string;

export type TyHotel = {
    hotelId: HotelId;
    startDate: Date;
    endDate: Date;
};

export type TyHotelList = TyHotel[];
