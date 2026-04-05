import React, { FC, useState } from 'react'
import { Box, Typography } from '@mui/material'
import config from '../utils/config'
import { GratitudePictureList } from '../utils/interfaces'

export const LazyLoadGratitude: FC<{ pictures: GratitudePictureList[] }> = ({ pictures }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!pictures || pictures.length === 0) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 3,
      }}
    >
      <Box
        component='img'
        src={`${config.staticUrl}${pictures[activeIndex].url}` || `${config.url}/assets/truck.jpg`}
        alt={pictures[activeIndex].name}
        sx={{
          width: '100%',
          maxWidth: 900,
          maxHeight: { xs: 400, md: 600 },
          objectFit: 'contain',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          maxWidth: '100%',
          px: 2,
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: 10,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: 10,
            '&:hover': {
              backgroundColor: '#555',
            },
          },
        }}
      >
        {pictures.map((element, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              flexShrink: 0,
            }}
          >
            <Box
              component='img'
              src={
                `${config.thumbUrl}${element.url}?dim=150x150` || `${config.url}/assets/truck.jpg`
              }
              alt={element.name}
              onClick={() => setActiveIndex(index)}
              sx={{
                height: { xs: 80, sm: 100 },
                width: { xs: 80, sm: 100 },
                objectFit: 'cover',
                borderRadius: '8px',
                cursor: 'pointer',
                opacity: activeIndex === index ? 1 : 0.6,
                border: activeIndex === index ? '3px solid' : '3px solid transparent',
                borderColor: 'primary.main',
                transition: 'all 0.2s',
                '&:hover': {
                  opacity: 1,
                  transform: 'scale(1.05)',
                },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                color: activeIndex === index ? 'primary.main' : 'text.secondary',
                textAlign: 'center',
                maxWidth: { xs: 80, sm: 100 },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontWeight: activeIndex === index ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              {element.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
