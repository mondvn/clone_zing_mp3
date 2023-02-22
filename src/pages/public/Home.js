import { useSelector } from 'react-redux';
import { HomeBanner, HomeCommonSlider, HomeSlider } from '../../components';

function Home() {

  const { homeData } = useSelector(state => state.app)
  // console.log(homeData)

  return (
    <div className='mx-[59px]'>
      {/* <div className="pt-[30px] h-full">
        <HomeSlider />
      </div> */}
      {homeData?.map((item, index) => {
        if (item?.viewType === "slider" && item?.sectionType !== "banner") {
          return (
            <HomeCommonSlider
              key={index}
              slider={item}
            />
          )
        }
        else if (item?.sectionType === "banner") {
          return (
            <HomeBanner
              key={index}
              banner={item.items}
            />
          )
        }
      })}
    </div>
  )
}

export default Home;