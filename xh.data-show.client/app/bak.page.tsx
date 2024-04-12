"use client";
import { times } from "lodash";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function App() {
	return (
		<div className="h-full w-full">
			<div className="flex flex-col h-full w-full">
				<div className="h-[40px] bg-white w-full">HELLO</div>
				<div className="w-full h-full bg-opacity-50 bg-white flex flex-row">
					<div className="basis-1/4 w-0 h-full border"></div>
					<div className="basis-1/2 w-0 grow-0 h-full border flex flex-col">
						<Swiper
							className="h-40 bg-white w-full"
							// autoplay={{ delay: 1000 }}
							navigation={{  }}
							spaceBetween={8}
							slidesPerView={1}
							virtual
							modules={[Virtual, Autoplay, Navigation]}
						>
							{times(100, (i) => (
								<SwiperSlide className="bg-red-50" virtualIndex={i} key={i}>
									<div>{i + 1}</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="basis-1/4 w-0 h-full border"></div>
				</div>
			</div>
		</div>
	);
}
