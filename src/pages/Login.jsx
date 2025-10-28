export default function Login() {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow w-96">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <input className="w-full border p-2 rounded mb-3" placeholder="Email" />
          <input className="w-full border p-2 rounded mb-4" placeholder="Senha" type="password" />
          <button className="w-full bg-blue-600 text-white py-2 rounded-xl">Entrar</button>
        </div>
      </div>
    );
  }
  