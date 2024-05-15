import React, { FC } from 'react'
import Slider, { CustomArrowProps, Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import config from '../utils/config'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const LazyLoadCarImages: FC<{ images: string[] }> = ({ images }) => {
  const settings: Settings = {
    dots: true,
    lazyLoad: 'anticipated',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    nextArrow: <CustomNextArrow className={'customNextArrow'} />,
    prevArrow: <CustomPrevArrow className={'customPrevArrow'} />,
  }
  return (
    <Box className='slider-container sliderWrapper'>
      <Slider {...settings} className={'sliderSlick'}>
        {images.map((image, i) => (
          <div key={i}>
            <img
              alt={'preview'}
              src={`${config.staticUrl}${image}`}
              loading='lazy'
              style={{
                // width: xs ? '90%' : small ? '90%' : 200,
                width: '90%',
                blockSize: 'fit-content',
              }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  )
}

const CustomNextArrow: FC<CustomArrowProps> = ({ style, onClick }) => {
  return (
    <div className={'customNextArrow'} style={{ ...style, display: 'block' }} onClick={onClick}>
      <ArrowForwardIcon />
    </div>
  )
}

const CustomPrevArrow: FC<CustomArrowProps> = ({ style, onClick }) => {
  return (
    <div className={'customPrevArrow'} style={{ ...style, display: 'block' }} onClick={onClick}>
      <ArrowBackIcon />
    </div>
  )
}
