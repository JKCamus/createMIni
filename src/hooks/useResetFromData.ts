import { reactive } from 'vue'

function useResetFromData<T extends Record<string, any>>(initialState: T) {
  const formData = reactive({ ...initialState })

  const resetForm = () => {
    for (let key in initialState) {
	  (formData as T)[key] = initialState[key]
    }
  }

  return [formData,resetForm]
}


export default useResetFromData;