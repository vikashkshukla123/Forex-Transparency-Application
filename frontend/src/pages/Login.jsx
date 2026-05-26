const Login = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <input type="email" placeholder="Email" className="w-full border p-3 mb-4 rounded"
          onChange={(e) => {
            setFormData({
              ...FormData,
              email: e.target.value
            })
          }} />

        <input type="password" placeholder="Password" className="w-full border-3 mb-4 rounded" onChange={(e) => {
          setFormData({
            ...formData,
            password: e.target.value
          })
        }} />
        <button className="w-full bg-blue-600 text-white py-3 rounded">Login

        </button>

      </form>
    </div>
  )
}