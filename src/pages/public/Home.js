import { useSelector } from 'react-redux';

import { HomeBanner, HomeChart, HomeCommonSlider, HomeNewRelease, HomeNewReleaseChart, HomeRadioSlider } from '../../components/home';

function Home() {

  const { homeData } = useSelector(state => state.app)
  console.log(homeData)

  return (
    <div className='mx-[59px]'>
      {homeData?.map((item, index) => {
        switch (item.sectionType) {
          case "banner":
            return (
              <HomeBanner
                key={index}
                banners={item?.items}
              />
            )
          case "livestream":
            return (
              <HomeRadioSlider
                key={index}
                radios={item?.items}
                title={item?.title}
              />
            )
          case "newReleaseChart":
            return (
              <HomeNewReleaseChart
                key={index}
                newReleaseCharts={item?.items}
                title={item?.title}
              />
            )
          case "new-release":
            return (
              <HomeNewRelease
                key={index}
                newRelease={item?.items}
                title={item?.title}
              />
            )
          case "playlist":
            return (
              <HomeCommonSlider
                key={index}
                sliders={item}
              />
            )
          case "RTChart":
            return (
              <HomeChart
                key={index}
                chart={item?.chart}
                songs={item?.items}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default Home;