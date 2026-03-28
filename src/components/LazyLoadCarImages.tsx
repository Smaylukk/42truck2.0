import * as React from 'react'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import config from '../utils/config'

export const LazyLoadCarImages: FC<{ images: string[] }> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      style={{ width: '100%' }}
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <img
            src={`${config.staticUrl}${image}`}
            alt='preview'
            loading='lazy'
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
