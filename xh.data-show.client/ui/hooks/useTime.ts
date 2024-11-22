import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function useTime () {
	return useState<Dayjs>(dayjs());

}