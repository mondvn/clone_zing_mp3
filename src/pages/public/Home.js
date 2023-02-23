import { useSelector } from 'react-redux';

import { HomeBanner, HomeCommonSlider, HomeNewRelease, HomeNewReleaseChart, HomeRadioSlider, HomeSlider } from '../../components';

function Home() {

  const { homeData } = useSelector(state => state.app)
  console.log(homeData)

  return (
    <div className='mx-[59px]'>
      {homeData?.map((item, index) => {
        if (item?.sectionType === "banner") {
          return (
            <HomeBanner
              key={index}
              banners={item?.items}
            />
          )
        }
        else if (item?.sectionType === "livestream") {
          return (
            <HomeRadioSlider
              key={index}
              radios={item?.items}
              title={item?.title}
            />
          )
        } else if (item?.sectionType === "newReleaseChart") {
          return (
            <HomeNewReleaseChart
              key={index}
              newReleaseCharts={item?.items}
              title={item?.title}
            />
          )
        } else if (item?.sectionType === "new-release") {
          return (
            <HomeNewRelease
              key={index}
              newRelease={item?.items}
              title={item?.title}
            />
          )
        } else if (item?.sectionType === "playlist") {
          return (
            <HomeCommonSlider
              key={index}
              sliders={item}
            />
          )
        }
        // else if (item?.viewType === "slider" && item?.sectionType !== "banner" && item?.sectionType !== "livestream") {
        //   return (
        //     <HomeCommonSlider
        //       key={index}
        //       sliders={item}
        //     />
        //   )
        // }
      })}
    </div>
  )
}

export default Home;