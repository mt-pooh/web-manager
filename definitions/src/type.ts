/**
 * @TJS-pattern ^[0-9]{7}$
 */
type HotelId = string;

/**
 * @TJS-format date
 */
type Date = string;

type TyHotel = {
    hotelId: HotelId;
    startDate: Date;
    endDate: Date;
};

type TyHotelList = TyHotel[];

export type TypeSchema = {
    TyHotelList: TyHotelList;
};
