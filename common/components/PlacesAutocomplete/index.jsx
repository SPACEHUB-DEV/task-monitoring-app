import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useEffect, useRef } from 'react'
import { Input } from 'antd'
import s from './style.module.scss'
import useGoogleQueries from '@common/modules/hooks/useGoogleQueries'
import { debounce } from 'lodash'

export const PlacesAutocomplete = ({
  isLoaded,
  setAddress,
  error,
  addressObj,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 1000,
  })
  const { getAddress, address } = useGoogleQueries()
  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false)
      clearSuggestions()
      //console.log('📍 Adr: ', description)
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0])
        //console.log('📍 Coordinates: ', { lat, lng })
        setAddress({ name: description, geoCode: { lat, lng } })
      })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <div
          className={s.subListItem}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      )
    })

  useEffect(() => {
    if (isLoaded) {
      init()
    }
  }, [isLoaded, init])

  useEffect(() => {
    if (addressObj?.geoCode) {
      getAddress(addressObj?.geoCode)
      setValue(address.name)
    }
  }, [address, addressObj?.geoCode])

  return (
    <div ref={ref}>
      <Input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Куди поїде майстер?"
        className={error ? s.error : ''}
      />
      {status === 'OK' && (
        <div className={s.subList}>{renderSuggestions()}</div>
      )}
    </div>
  )
}
