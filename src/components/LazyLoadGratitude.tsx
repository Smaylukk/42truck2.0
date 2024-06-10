import React, { FC } from 'react'
import config from '../utils/config'
import { ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material'

export const LazyLoadGratitude: FC<{ images: string[] }> = ({ images }) => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const small = useMediaQuery(theme.breakpoints.only('sm'))
  const medium = useMediaQuery(theme.breakpoints.only('md'))
  return (
    <div>
      <ImageList
        sx={{
          width: '100%',
          height: '100%',
          // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
          transform: 'translateZ(0)',
        }}
        gap={5}
        cols={xs ? 1 : small || medium ? 2 : 3}
        rowHeight={'auto'}
      >
        {images.map((image, i) => (
          <ImageListItem className={'sliderWrapperGratitudeItem'} key={i}>
            <img
              srcSet={`${config.staticUrl}${image}`}
              src={`${config.staticUrl}${image}`}
              alt={'picture'}
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
