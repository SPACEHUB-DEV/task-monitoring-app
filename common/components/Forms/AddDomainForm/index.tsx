import { useJsApiLoader } from '@react-google-maps/api'
import { Form, FormInstance, Input } from 'antd'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IAddress, IGeoCode } from '../../../modules/models/Task'

interface Props {
  isFormDisabled: boolean
  form: FormInstance
  waypoints: IGeoCode[]
  setWaypoints: Dispatch<SetStateAction<IGeoCode[]>>
}

const AddDomainModal: React.FC<Props> = ({
  isFormDisabled,
  form,
  waypoints,
  setWaypoints,
}) => {
  const [address, setAddress] = useState<IAddress>(null)

  const [libraries] = useState(['places'] as any)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null)
  const listenersRef = useRef([])

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() }
        })
      setWaypoints(nextPath)
    }
  }, [setWaypoints])

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon
      const path = polygon.getPath()
      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', onEdit)
      )
    },
    [onEdit]
  )

  const check = useCallback(() => {
    if (!address && Object.keys(address).length <= 0) {
      return
    }
    setWaypoints((waypoints) => [...waypoints, address?.geoCode])
    setAddress(null)
  }, [address, setWaypoints])

  useEffect(() => {
    if (address) {
      check()
    }
  }, [address, check])

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      disabled={isFormDisabled}
    >
      <Form.Item name="name" label="Domain name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="desription" label="Description">
        <Input.TextArea maxLength={250} />
      </Form.Item>
    </Form>
  )
}

export default AddDomainModal
