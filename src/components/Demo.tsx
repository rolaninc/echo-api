import Form from './Form'

const Demo = () => {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Form />
      </div>
      <div className="bg-blue-200">Output</div>
    </div>
  )
}

export default Demo
