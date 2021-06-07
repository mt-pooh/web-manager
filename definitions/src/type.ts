type integer = number;

/**
 * @TJS-pattern ^[0-9]{7}$
 */
type HotelId = string;

/**
 * @TJS-format date
 */
type Date = string;

/**
 * @TJS-format email
 */
type Email = string;

type TyHotel = {
    hotelId: HotelId;
    startDate: Date;
    endDate: Date;
};

type TyHotelList = TyHotel[];

type MemberInfo = {
    id: integer;
    name: string;
    email: Email;
};

type MemberInfoList = MemberInfo[];

export type TypeSchema = {
    TyHotelList: TyHotelList;
    MemberInfoList: MemberInfoList;
};
