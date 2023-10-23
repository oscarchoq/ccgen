import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useGen } from "../Hooks/useGen"

function HomePage() {

  const { register, handleSubmit, setValue } = useForm()
  const { format_bin, generateCC } = useGen()

  const [card, setCard] = useState('')

  const onSubmit = handleSubmit(values => {
    const data = { ...values, bin: format_bin(values.bin) }
    setValue('bin', data.bin)
    const resul = generateCC(data)
    setCard(resul)
  })

  useEffect(() => {
    setValue('isDate', true)
    setValue('isCVV', true)
    setValue('cantidad', 10)
  }, [])

  return (
    <main className="pb-10 pt-32 text-gray-600 min-h-screen">
      <div className="container w-full mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-700 ">Random Test Credit Card Generator</h1>
        </div>
        {/* a0aec0s */}
        <div className="flex flex-wrap mx-2 mt-5 text-gray-700 ">
          <div className="w-full md:w-1/2 px-2">
            <form onSubmit={onSubmit}>
              <div>
                <label className="block cursor-pointer relative">
                  <span className="text-gray-600 font-medium text-xs absolute bg-white px-3 pt-1 ml-2 -mt-3  ">BIN</span>
                  <input type="text" className="form-input block w-full" placeholder="453588xxxxxxxxxx" {...register('bin', { required: true, maxLength: 16 })} />
                </label>
              </div>
              <div className="flex -mx-2 items-center">
                <div className="px-2 mt-6">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="cursor-pointer" {...register('isDate')} />
                    <span className="ml-2 text-xs font-medium">FECHA</span>
                  </label>
                </div>
                <div className="mt-6 w-full sm:w-1/2 px-2">
                  <label className="block cursor-pointer relative">
                    <span className="text-gray-600 font-medium text-xs absolute bg-white px-3 pt-1 ml-2 -mt-3  ">MES</span>
                    <select className="form-select block w-full" {...register('month')} >
                      <option value="">Random</option>
                      <option value="01">Enero</option>
                      <option value="02">Febrero</option>
                      <option value="03">Marzo</option>
                      <option value="04">Abril</option>
                      <option value="05">Mayo</option>
                      <option value="06">Junio</option>
                      <option value="07">Julio</option>
                      <option value="08">Agosto</option>
                      <option value="09">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                  </label>
                </div>
                <div className="mt-6 w-full sm:w-1/2 px-2">
                  <label className="block cursor-pointer relative">
                    <span className="text-gray-600 font-medium text-xs absolute bg-white px-3 pt-1 ml-2 -mt-3">AÑO</span>
                    <select className="form-select block w-full" {...register('year')} >
                      <option value="">Random</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="flex -mx-2 items-center">
                <div className="px-2 mt-6">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="cursor-pointer" {...register('isCVV')} />
                    <span className="ml-2 text-xs font-medium">CVV&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </label>
                </div>
                <div className="mt-6 w-full sm:w-1/2 px-2">
                  <label className="cursor-pointer block relative">
                    <span className="text-gray-600 font-medium text-xs absolute bg-white px-3 pt-1 ml-2 -mt-3">CVV</span>
                    <input type="text" className="form-input block w-full" placeholder="Random" {...register('cvv', { min: 0 })} />
                  </label>
                </div>
                <div className="mt-6 w-full sm:w-1/2 px-2">
                  <label className="cursor-pointer block relative">
                    <span className="text-gray-600 font-medium text-xs absolute bg-white px-3 pt-1 ml-2 -mt-3  ">CANTIDAD</span>
                    <input type="text" className="form-input block w-full" {...register('cantidad', { required: true, min: 1 })} />
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="flex items-center justify-center shadow-md bg-cyan-600 text-white font-medium w-full rounded py-3 hover:bg-cyan-500 focus:bg-cyan-700 focus:outline-none">Generar</button>
              </div>

            </form>
          </div>

          <div className="w-full md:w-1/2 px-2">
            <div className="bg-red-50 md:h-full mt-6 md:mt-0">
              <label className="block cursor-pointer relative h-full">
                <span className="text-gray-600 font-medium text-xs absolute bg-white px-3 pt-1 ml-2 -mt-3  ">RESULTADO</span>
                <textarea id="result" rows="5" placeholder="xxxxxxxxxxxxxxxx" readOnly="readonly" className="form-textarea block w-full h-full resize-none font-mono font-bold tracking-wide" value={card}></textarea>

                <button type="button" className="bg-gray-400 px-2 py-1 absolute bottom-0 right-0 mb-px mr-px focus:outline-none focus:bg-gray-600 text-white text-xs font-medium"
                  onClick={() => {
                    navigator.clipboard.writeText(card)
                  }}
                >Copiar</button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage