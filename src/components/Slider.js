import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getArrSlider } from '../ultis/fn'
import * as action from '../store/actions'

const Slider = () => {
  const { banner } = useSelector(state => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    const sliderElements = document.getElementsByClassName('slider-item')
    let start = 0
    let end = 2
    const intervalId = setInterval(() => {
      const arraySlider = getArrSlider(start, end, sliderElements.length - 1)
      for (let i = 0; i < sliderElements.length; i++) {
        // Delete classnames (css)
        sliderElements[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-10')
        sliderElements[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-20')
        sliderElements[i]?.classList?.remove('animate-slide-left-2', 'order-2', 'z-20')

        // Hide or show banner
        if (arraySlider.some(item => item === i)) {
          sliderElements[i].style.cssText = 'display: block'
        } else {
          sliderElements[i].style.cssText = 'display: none'
        }
      }

      // Add animation by adding classNames
      arraySlider.forEach(item => {
        if (item === end) {
          sliderElements[item]?.classList?.add('animate-slide-right', 'order-last', 'z-10')
        } else if (item === start) {
          sliderElements[item]?.classList?.add('animate-slide-left', 'order-first', 'z-20')
        } else {
          sliderElements[item]?.classList?.add('animate-slide-left-2', 'order-2', 'z-20')
        }
      })

      start = (start === sliderElements.length - 1) ? start = 0 : start + 1
      end = (end === sliderElements.length - 1) ? end = 0 : end + 1
    }, 4000)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [])

  const handleClickBanner = (item) => {
    if (item.type === 1) {
      dispatch(action.setCurSongId(item.encodeId))
    }

  }

  return (
    <div className='flex gap-[30px] w-full overflow-hidden mt-8'>
      {banner?.map((item, index) => (
        <img
          src={item.banner}
          alt='banner'
          key={item.encodeId}
          onClick={() => handleClickBanner(item)}
          className={`slider-item flex-1 object-contain w-[calc((100%-60px)/3)] rounded-lg ${index <= 2 ? 'block' : 'hidden'}`} />
      ))}
    </div>
  )
}

export default Slider