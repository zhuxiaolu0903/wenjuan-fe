import { useAppSelector } from '../redux/hooks'

const useGetLoginInfo = () => {
  return useAppSelector((state) => state.user)
}

export default useGetLoginInfo
