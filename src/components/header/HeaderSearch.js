import React, { useState, useEffect, useRef } from 'react'
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import icons from '../../ultis/icons'
import * as apis from '../../apis'
import * as actions from '../../store/actions'
import { Wrapper as PopperWrapper } from '../Popper';
import { useDebounce } from '../../hooks';
import SearchItem from './SearchItem';
import path from '../../ultis/path'

const { FiSearch, VscClose } = icons

const HeaderSearch = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResuls] = useState(true)

  const debounced = useDebounce(searchValue, 800)

  const inputRef = useRef()
  const searchRef = useRef()

  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined })
  const [searchResultsWidth, setSearchResultsWidth] = useState(440)

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
      setSearchResultsWidth(searchRef.current.offsetWidth)
    }
    window.addEventListener('resize', handleSize)
    handleSize()
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResults([])
      return
    }

    const fetchSearchResults = async () => {
      const response = await apis.apiSearch(debounced)
      if (response?.data?.err === 0) {
        setSearchResults([response?.data?.data?.artists[0], response?.data?.data?.playlists[0], ...response?.data?.data?.songs.slice(0, 4)])
      }
    }
    fetchSearchResults()
    // console.log(searchResults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const handleClear = () => {
    setSearchValue('')
    setSearchResults([])
    inputRef.current.focus()
  }

  const handleHideResults = () => {
    setShowResuls(false)
  }

  const handleNavigate = () => {
    dispatch(actions.setSearchData(debounced))
    navigate(`/${path.SEARCH}/${path.SEARCH_ALL}`)
  }

  const handleSearch = async e => {
    if (e.keyCode === 13) {
      dispatch(actions.setSearchData(debounced))
      navigate(`/${path.SEARCH}/${path.SEARCH_ALL}`)
    }
  }

  return (
    <Tippy
      visible={showResults && !!searchValue}
      interactive={true}
      onClickOutside={handleHideResults}
      render={attrs => (
        <div className={` mt-[-10px] overflow-hidden`} style={{ width: `${searchResultsWidth}px` }}>
          <PopperWrapper>
            <div
              onClick={handleNavigate}
              className='flex p-[10px] items-center justify-start text-sm text-white rounded hover:bg-black-#ffffff1a cursor-pointer'>
              <FiSearch size={18} className='mr-2 text-[#757575]' />
              <span className='mr-1 font-extralight'>Tìm kiếm</span>
              <span className='font-bold'>{`"${searchValue}"`}</span>
            </div>
            <div className='flex flex-col mt-[10px] border-t border-t-black-#ffffff1a w-full h-full'>
              <div className='px-[10px] py-2 font-bold text-sm text-white'>Gợi ý kết quả</div>
              {searchResults.map((item, index) => (
                <SearchItem key={item.encodeId || item.id} item={item} />
              ))}
            </div>
          </PopperWrapper>
        </div>
      )}
    >
      <div ref={searchRef} className={`flex items-center bg-black-#ffffff1a h-10 max-w-[440px] flex-auto text-[#757575] ${!!searchValue && showResults ? 'rounded-t-[20px]' : 'rounded-[20px]'}`}>
        <div className='ml-[8px] mr-2'>
          <FiSearch size={22} />
        </div>
        <input
          ref={inputRef}
          className='flex-auto mr-2 outline-none text-[14px] bg-[transparent] text-white placeholder:text-[#757575] placeholder:font-normal font-extralight'
          placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onFocus={() => setShowResuls(true)}
          onKeyUp={handleSearch}
        />
        {!!searchValue &&
          <div className='mr-[12px] font-light flex items-center' onClick={handleClear}>
            <VscClose size={20} />
          </div>}
      </div>
    </Tippy>
  )
}

export default HeaderSearch