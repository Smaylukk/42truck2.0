import React, { FC } from 'react'
import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import config from '../utils/config'
import { GratitudePictureList } from '../utils/interfaces'

export const LazyLoadGratitude: FC<{ pictures: GratitudePictureList[] }> = ({ pictures }) => {
  return (
    <div
      style={{
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <LightGallery
        allowMediaOverlap
        toggleThumb
        closable
        closeOnTap
        showCloseIcon
        showZoomInOutIcons
        plugins={[lgThumbnail, lgZoom]}
      >
        {pictures.map((element, index) => (
          <a
            key={index}
            href={`${config.staticUrl}${element.url}` || `${config.url}/assets/truck.jpg`}
          >
            <img
              alt={element.name}
              src={
                `${config.thumbUrl}${element.url}?dim=200x200` || `${config.url}/assets/truck.jpg`
              }
              style={{ height: '200px', margin: '0px 4px' }}
            />
          </a>
        ))}
      </LightGallery>
    </div>
  )
}
